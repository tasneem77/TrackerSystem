import { Component, OnInit } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { Subject } from 'rxjs';
import { ListRoleVM } from 'Models/RoleVM';
import { RoleService } from 'Services/role.service';

@Component({
  selector: 'app-list-roles',
  templateUrl: './list-roles.component.html',
  styleUrls: ['./list-roles.component.css']
})
export class ListRolesComponent implements OnInit {


  lstRoles: ListRoleVM[] = [];
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();
  isDtInitialized: boolean = false;
  dtElement: DataTableDirective;

  constructor(private roleService: RoleService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'numbers',
      pageLength: 10,
      responsive: true,
      lengthMenu: [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]]
    };
    this.getAllUserservices();
  }


  getAllUserservices() {
    this.roleService.GetRoles().subscribe(
      data => {
        this.lstRoles = data;
        if (this.isDtInitialized) {
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.dtTrigger.next();
          });
        } else {
          this.isDtInitialized = true
          this.dtTrigger.next();
        }
      })
  }


  DeleteRole(id:number) {
      this.confirmationService.confirm({
          message: 'Are you sure that you want to proceed?',
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.roleService.DeleteRole(id).subscribe(data=>{

              this.toastr.success("item is Deleted Successfully","Delete");
             this.ngOnInit();
            }
          );
          },
          reject: () => {
            this.toastr.error("Error occured","Error");
          }
      });
  }


}
