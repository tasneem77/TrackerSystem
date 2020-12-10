import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListTaskVM } from 'Models/TaskVM';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { TaskService } from 'Services/task.service';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.css']
})
export class ListTasksComponent implements OnInit {

  lstTasks: ListTaskVM[]
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();
  isDtInitialized: boolean = false;
  dtElement: DataTableDirective;

  constructor(
    private taskService: TaskService,
    private confirmationService: ConfirmationService,
    private toastr: ToastrService,
    private route: Router) { }

  ngOnInit(): void {
    this.getAllTasks();

    this.dtOptions = {
      pagingType: 'numbers',
      pageLength: 10,
      responsive: true,
      lengthMenu: [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]]
    };
  }


  getAllTasks() {
    this.taskService.GetTasks().subscribe(
      data => {
        this.lstTasks = data;
        if (this.isDtInitialized) {
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.dtTrigger.next();
          });
        } else {
          this.isDtInitialized = true
          this.dtTrigger.next();
        }
      }
    )
  }
  DeleteTask(id: number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.taskService.DeleteTask(id).subscribe(data => {
          if (data == 0) { 
            this.toastr.show("You cannot delete this item", "Delete");
          }
          else {
            this.route.navigate(['/tasks'])
            this.toastr.success("Team is Deleted Successfully", "Delete");
          }
          this.getAllTasks();

        }
        );
      },
      reject: () => {
        this.toastr.error("Error occured", "Error");
      }
    });
  }
}
