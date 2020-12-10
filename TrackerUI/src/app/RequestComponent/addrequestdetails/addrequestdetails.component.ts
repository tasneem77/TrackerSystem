import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ListEmployeeVM } from 'Models/EmployeeVM';
import { CreateRequestDetailVM, ListRequestTypeStatusVM } from 'Models/RequestVM';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'Services/employee.service';
import { RequestService } from 'Services/request.service';

@Component({
  selector: 'app-addrequestdetails',
  templateUrl: './addrequestdetails.component.html',
  styleUrls: ['./addrequestdetails.component.css']
})
export class AddrequestdetailsComponent implements OnInit {

  editorConfig: AngularEditorConfig = {
    editable: true,
    // spellcheck: true,
    height: '300px',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };
  RequestId: number;
  lstStatus: ListRequestTypeStatusVM[];
  lstEmployees: ListEmployeeVM[];
  RequestDetailObj: CreateRequestDetailVM;
  roleName: any;
  constructor(private requestService: RequestService, private employeeService: EmployeeService,
    private datepipe: DatePipe, private toastr: ToastrService, private route: Router) {

    this.RequestDetailObj = {
      requestId: 0, statusId: 0, loggedId: 0, fromEmpId: 0, toEmpId: 0,
      plannedStartDate: '',
      plannedStartTime: '',
      plannedEndDate: '',
      plannedEndTime: '',
      actualStartDate: '',
      actualStartTime: '',
      actualEndDate: '',
      actualEndTime: '',
      title: '',
      description: '',
      actualStarted: '',
      actualEnded: '',
      plannedStarted: '',
      plannedEnded: ''
    }
  }

  ngOnInit(): void {
    this.roleName = localStorage.getItem("roleName");
    this.requestService.GetRequestTypeStatus().subscribe(data => {
      this.lstStatus = data
    });

    if (this.roleName == "PM") {
      const projectId = Number(localStorage.getItem("projectId"));
      this.requestService.ListTLByProjectId(projectId).subscribe(data => {
        this.lstEmployees = data
      });
    }
    else {
      this.employeeService.GetEmployees().subscribe(data => {
        this.lstEmployees = data
      });
    }
  }


  submitForm() {
    this.RequestDetailObj.plannedStartDate = this.datepipe.transform(this.RequestDetailObj.plannedStartDate, 'yyyy-MM-dd');
    this.RequestDetailObj.plannedEndDate = this.datepipe.transform(this.RequestDetailObj.plannedEndDate, 'yyyy-MM-dd');

    this.RequestDetailObj.actualStartDate = this.datepipe.transform(this.RequestDetailObj.actualStartDate, 'yyyy-MM-dd');
    this.RequestDetailObj.actualEndDate = this.datepipe.transform(this.RequestDetailObj.actualEndDate, 'yyyy-MM-dd');

    this.RequestDetailObj.plannedStartTime = this.RequestDetailObj.plannedStartTime + ":00";
    this.RequestDetailObj.plannedEndTime = this.RequestDetailObj.plannedEndTime + ":00";

    this.RequestDetailObj.actualStartTime = this.RequestDetailObj.actualStartTime + ":00";
    this.RequestDetailObj.actualEndTime = this.RequestDetailObj.actualEndTime + ":00";

    this.RequestDetailObj.plannedStarted = this.RequestDetailObj.plannedStartDate + " " + this.RequestDetailObj.plannedStartTime;
    this.RequestDetailObj.plannedEnded = this.RequestDetailObj.plannedEndDate + " " + this.RequestDetailObj.plannedEndTime;

    this.RequestDetailObj.actualStarted = this.RequestDetailObj.actualStartDate + " " + this.RequestDetailObj.actualStartTime;
    this.RequestDetailObj.actualEnded = this.RequestDetailObj.actualEndDate + " " + this.RequestDetailObj.actualEndTime;



    this.RequestDetailObj.requestId = Number(localStorage.getItem("requestId"));
    this.RequestDetailObj.statusId = Number(this.RequestDetailObj.statusId);
    this.RequestDetailObj.loggedId = Number(localStorage.getItem("userId"));


    let roleName = localStorage.getItem("roleName");
    if (roleName == "PM" || roleName == "TL" || roleName == "User") {
      this.RequestDetailObj.fromEmpId = Number(localStorage.getItem("userId"));
    }
    else {
      this.RequestDetailObj.fromEmpId = Number(this.RequestDetailObj.fromEmpId);
    }

    this.RequestDetailObj.toEmpId = Number(this.RequestDetailObj.toEmpId);

    this.requestService.CreateRequestDetail(this.RequestDetailObj).subscribe(
      (data => {
        this.route.navigate(['/requests']);
        this.toastr.success("Item Added Successfully", "Create");
      }),
      (err => {
        console.log(err);
        this.toastr.error("An Error Occured", "Error");
      }))

  }
}
