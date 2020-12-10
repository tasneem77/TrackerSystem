import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditEmployeeVM } from 'Models/EmployeeVM';
import { ListTeamVM } from 'Models/TeamVM';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'Services/employee.service';
import { DatePipe } from '@angular/common'
import { TeamService } from 'Services/team.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {


  Id: number;
  EmployeeObj: EditEmployeeVM;
  lstTeams: ListTeamVM[] = [];
  constructor(private employeeService: EmployeeService, private toastr: ToastrService,
    private activeRoute: ActivatedRoute, private route: Router, public datepipe: DatePipe) { }

  ngOnInit(): void {
    let id = this.activeRoute.snapshot.params["id"];
    this.getAllTeams();
    this.employeeService.GetEmployeeById(id).subscribe(
      (data => {
        this.EmployeeObj = data;

      }),
      (error => console.log(error))
    );
  }


  getAllTeams() {
    this.employeeService.GetTeams().subscribe(data => { this.lstTeams = data; })
  }


  keyPressNumbers(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
  birth: string
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.birth = this.datepipe.transform(event.value, 'yyyy-MM-dd');
  }


  employeeImg: File;
  onFileSelected(files: FileList) {

    this.employeeImg = files.item(0);
    const filename = this.employeeImg.name;
    Object.defineProperty(this.employeeImg, 'name', {
      writable: true,
      value: filename
    });
    this.EmployeeObj.EmpImg = this.employeeImg.name;
    this.uploadFileToActivity();
  }
  uploadFileToActivity() {
    this.employeeService.postFile(this.employeeImg).subscribe(data => {
    }, error => {
      console.log(error);
    });
  }



  submitData() {
    this.EmployeeObj.dob = this.birth;
 


    this.employeeService.UpdateEmployee(this.EmployeeObj).subscribe(
      (data => {

        this.route.navigate(['/employees']);
        this.toastr.success("Item Added Successfully", "Update");
      }),
      (err => {
        this.toastr.error("An Error Occured", "Error");
      }))


  }
}
