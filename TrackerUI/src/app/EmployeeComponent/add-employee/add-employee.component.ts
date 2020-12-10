import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateEmployeeVM } from 'Models/EmployeeVM';
import { ListTeamVM } from 'Models/TeamVM';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'Services/employee.service';
import { TeamService } from 'Services/team.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  Id: number;
  EmployeeObj: CreateEmployeeVM;
  lstTeams: ListTeamVM[];
  TeamObj: any;
  constructor(private employeeService: EmployeeService,
    private toastr: ToastrService, private route: Router) {
    this.EmployeeObj = { TeamId: 0, Name: "", WhatsApp: '', Phone: '', Email: "", Address: "", Dob: new Date(), EmpImg: "" }
  }

  ngOnInit(): void {
    this.getAllTeams();

  }

  getAllTeams() {
    this.employeeService.GetTeams().subscribe(data => {
      this.lstTeams = data;
    })
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

  submitData() {
    this.EmployeeObj.TeamId = Number(this.EmployeeObj.TeamId);
    this.employeeService.CreateEmployee(this.EmployeeObj).subscribe(
      (data => {
        if (data == 0) {
          this.toastr.show("This user already Exist!!!","Exist User");
        }

        if (data == -1) {
          this.toastr.show("Please Add this employee first as user","Add User first");
        }
        else {
           this.route.navigate(['/employees']);
           this.toastr.success("Item Saved Successfully", "Create");
        }
      }),
      (err => {
        console.log(err)
        this.toastr.error("An Error Occured", "Error");
      })
    )


  }

  employeeImg: File;
  onFileSelected(files: FileList) {
    if (files.item.length > 0) {
      this.employeeImg = files.item(0);
      const filename = this.employeeImg.name;
      Object.defineProperty(this.employeeImg, 'name', {
        writable: true,
        value: filename
      });
      this.EmployeeObj.EmpImg = this.employeeImg.name;
      this.uploadFileToActivity();
    }
    else {
      this.EmployeeObj.EmpImg = this.EmployeeObj.EmpImg;
    }
  }
  uploadFileToActivity() {
    this.employeeService.postFile(this.employeeImg).subscribe(data => {
    }, error => {
      console.log(error);
    });
  }
}
