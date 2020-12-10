import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ListProjectVM } from 'Models/ProjectVM';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { ProjectService } from 'Services/project.service';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-list-projects',
  templateUrl: './list-projects.component.html',
  styleUrls: ['./list-projects.component.css']
})
export class ListProjectsComponent implements OnInit, OnDestroy {

  lstProjects: ListProjectVM[] = [];
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();
  isDtInitialized: boolean = false;
  dtElement: DataTableDirective;
  errorMessage: '';
  userId:any;
  userRole:any;
  constructor(private projectService: ProjectService, private route: Router,
    private confirmationService: ConfirmationService,
    private toastr: ToastrService) {
  }
  ngOnInit(): void {
    this.getAllProjects();


    this.dtOptions = {
      //  pagingType: 'full_numbers',
      pagingType: 'numbers',
      pageLength: 10,
      responsive: true,
      lengthMenu: [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]]
      // dom: 'Blfrtip',
      // buttons: [
      //   // 'columnsToggle',
      //   // 'colvis',
      //    'copy',
      //   'print',
      //   // 'excel'
      // ],
  
    };
  }
  getAllProjects() {
    this.userId = Number(localStorage.getItem("userId"));
    this.userRole =localStorage.getItem("roleName");
    this.projectService.GetProjects( this.userId).subscribe(
      data => {
        this.lstProjects = data;
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

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  DeleteProject(id: number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.projectService.DeleteProject(id).subscribe(data => {
          this.dtTrigger.unsubscribe();
          this.ngOnInit();
          this.toastr.success("Item is Deleted Successfully", "Delete");
        }, (error) => {
          //alert("You can't delete this item");

          this.toastr.error("You can't delete this item");

        })
      },
      reject: () => { }
    });
  }
}
