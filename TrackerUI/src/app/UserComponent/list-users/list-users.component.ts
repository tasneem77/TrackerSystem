import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { ListUseRoleVM } from 'Models/UserVM';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { Subject } from 'rxjs';
import { UserService } from 'Services/user.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {


  lstUserRoles: ListUseRoleVM[] = [];
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();
  isDtInitialized: boolean = false;
  dtElement: DataTableDirective;
  constructor(private userService: UserService,
    private toastr: ToastrService,
    private route: Router,
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
    this.userService.ListUserRoles().subscribe(
      data => {
        this.lstUserRoles = data;
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


  // ngOnDestroy(): void {
  //   this.dtTrigger.unsubscribe();
  // }


  DeleteUserRole(id:number) {
      this.confirmationService.confirm({
          message: 'Are you sure that you want to proceed?',
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.userService.DeleteUserRole(id).subscribe(data=>{

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
