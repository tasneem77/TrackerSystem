import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListClientVM } from 'Models/ClientVM';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { ClientService } from 'Services/client.service';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import { DataTableDirective } from 'angular-datatables';
@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.css']
})
export class ListClientsComponent implements OnInit {


  lstClients: ListClientVM[];
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();
  isDtInitialized: boolean = false;
  dtElement: DataTableDirective;

  constructor(private clientService: ClientService,
    private confirmationService: ConfirmationService,
    private toastr: ToastrService,
    private route: Router) { }

  ngOnInit(): void {
    this.getAllClients();
    this.dtOptions = {
      pagingType: 'numbers',
      pageLength: 10,
      responsive: true,
      lengthMenu: [[10, 25, 50,100], [10, 25, 50,100]]
    }
  }

  getAllClients() {
    this.clientService.GetClients().subscribe(
      data => {
        this.lstClients = data;
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
  DeleteClient(id: number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.clientService.DeleteClient(id).subscribe(data => {
          this.route.navigate(['/employees'])
          this.toastr.success("Item is Deleted Successfully", "Delete");
          this.clientService.GetClients().subscribe(
            data => {
              this.lstClients = data;
            }
          )
        }
        );
      },
      reject: () => {
        this.toastr.error("Error occured", "Error");
      }
    });
  }
}
