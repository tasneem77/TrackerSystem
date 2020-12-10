import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListEmployeeVM } from 'Models/EmployeeVM';
import { ListTeamVM } from 'Models/TeamVM';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { EmployeeService } from 'Services/employee.service';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {

  lstTeams: ListTeamVM[];
  lstEmployees: ListEmployeeVM[];
  dtOptions: any = {};
  dtTrigger= new Subject();

  constructor(private employeeService: EmployeeService,
    private  confirmationService: ConfirmationService,
    private toastr : ToastrService,
    private route : Router) { }

  ngOnInit(): void {
   // this.getAllTeams();
    this.getAllEmployees();

      
    this.dtOptions = {
        pagingType: 'numbers',
        pageLength:10,
        responsive: true,
        lengthMenu: [[10, 25, 50,100], [10, 25, 50,100]]
      }; 
  }

  getAllTeams() {
    this.employeeService.GetTeams().subscribe(
      data => {
        this.lstTeams = data["results"];
        this.dtTrigger.next();
      }
    )
  }

  getAllEmployees() {
    this.employeeService.GetEmployees().subscribe(
      data => {
        this.lstEmployees = data;
      }
    )
  }
  DeleteEmployee(id:number) {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.employeeService.DeleteEmployee(id).subscribe(data=>{
           this.route.navigate(['/employees'])
            this.toastr.success("Team is Deleted Successfully","Delete");
            this.getAllEmployees();
          }
        );
        },
        reject: () => {
          this.toastr.error("Error occured","Error");
        }
    });
}


}
