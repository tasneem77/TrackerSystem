import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ListClientVM } from 'Models/ClientVM';
import { ListEmployeeVM } from 'Models/EmployeeVM';
import { ListProjectVM } from 'Models/ProjectVM';
import { CreateRequestVM, ListOrganizationVM, ListPeriorityVM, ListRequestCategoryVM, ListRequestImpactVM, ListRequestLevelVM, ListRequestModeVM, ListRequestSubCategoryVM, ListRequestTypeStatusVM, ListRequestTypeVM, ListUrgentVM, RadioButtonListItems } from 'Models/RequestVM';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from 'Services/client.service';
import { EmployeeService } from 'Services/employee.service';
import { ProjectService } from 'Services/project.service';
import { RequestService } from 'Services/request.service';

@Component({
  selector: 'app-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.css']
})
export class AddRequestComponent implements OnInit {

 

  editorConfig: AngularEditorConfig = {
    editable: true,
    // spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    showToolbar: true,
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    //uploadUrl: 'v1/image',
     uploadWithCredentials: false,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };
  lstrblistItems: RadioButtonListItems[];
  lstCategories: ListRequestCategoryVM[];
  lstSubCategories: ListRequestSubCategoryVM[];
    lstOrganizations: ListOrganizationVM[];
  lstImpacts: ListRequestImpactVM[];
  lstLevels: ListRequestLevelVM[];
  lstModes: ListRequestModeVM[];
  lstPeriorities: ListPeriorityVM[];
  lstTypeStatus: ListRequestTypeStatusVM[];
  lstRequestTypes: ListRequestTypeVM[];
  lstUrgencies: ListUrgentVM[];
  lstClients: ListClientVM[];
  lstProjects: ListProjectVM[];
  lstEmployees: ListEmployeeVM[];


  categoryList: {};
  selectedCategory = { id: 1, name: "Client" };

  RequestObj: CreateRequestVM;
  constructor(private requestService: RequestService,
    private clientService: ClientService,
    private projectService: ProjectService,
    private employeeService: EmployeeService,
    private datepipe: DatePipe, private toastr: ToastrService, private route: Router) {

    this.lstrblistItems = [];
    this.lstrblistItems.push({ id: "1", Name: "Client" }, { id: "2", Name: "Employee" })
    this.RequestObj = {
      subject: '', note: '', description: '',started: '', ended: '',
      createdDate: '', createdTime: '', organizationId:0, subCategoryId: 0,
     categoryId: 0, impactId: 0, periorityId: 0, requestLevelId: 0,
      requestModeId: 0, requestStatusId: 0, requestTypeId: 0, clientId: 0, projectId: 0
    }

    this.categoryList = [
      { id: 1, name: 'Clients' },
      { id: 2, name: 'Employees' }
    ]
  }

  ngOnInit(): void {
    this.selectedCategory.id = 1;

    this.getAllOnLoad();
  }
  getSelection($event) {
   // this.selected = $event.value;
  }
  getAllOnLoad() {

    this.requestService.GetRequestCategories().subscribe(data => {
      this.lstCategories = data
    });


    this.requestService.GetRequestImpacts().subscribe(data => {
      this.lstImpacts = data
    });

    this.requestService.GetRequestLevels().subscribe(data => {
      this.lstLevels = data
    });

    this.requestService.GetRequestModes().subscribe(data => {
      this.lstModes = data
    });


    this.requestService.GetRequestPeriorities().subscribe(data => {
      this.lstPeriorities = data
    });

    this.requestService.GetRequestTypeStatus().subscribe(data => {
      this.lstTypeStatus = data
    });

    this.requestService.GetRequestTypes().subscribe(data => {
      this.lstRequestTypes = data
    });

    this.requestService.GetOrganizations().subscribe(data => {
      this.lstOrganizations = data
    });

    
    // this.requestService.GetRequestUrgencies().subscribe(data => {
    //   this.lstUrgencies = data
    // });


    this.clientService.GetClients().subscribe(data => {
      this.lstClients = data
    });

    this.projectService.GetAllProjects().subscribe(data => {
      this.lstProjects = data
    });

    this.employeeService.GetEmployees().subscribe(data => {
      this.lstEmployees = data
    });
  }
  getCategoryRadio(catId: number) {
    if (catId === 1) {

    }
    if (catId === 2) {

    }
  }
  onImpactChange($event) {
    this.RequestObj.impactId = $event.target.value;
  }
  onLevelChange($event) {
    this.RequestObj.requestLevelId = $event.target.value;
  }
  onModeChange($event) {
    this.RequestObj.requestModeId = $event.target.value;
  }
  onStatusChange($event) {
    this.RequestObj.requestStatusId = $event.target.value;
  }

  onTypeChange($event) {
    this.RequestObj.requestTypeId = $event.value;
  }

  onPeriorityChange($event) {
    this.RequestObj.periorityId = $event.target.value;
  }
  onCategoryChange($event) {
    this.RequestObj.categoryId = $event.value;
    this.requestService.ListRequestSubCategoriesByCategoryId($event.value).subscribe(items =>
      {
        this.lstSubCategories = items;
      });
  }

  onSubCategoryChange($event) {
    this.RequestObj.categoryId = $event.value;
  }

  onOrgChange($event) {
    this.RequestObj.organizationId = $event.value;
  }

  
  onClientChange($event) {
    this.RequestObj.clientId = $event.target.value;
  }

  onProjectChange($event) {
    this.RequestObj.projectId = $event.value;
  }

  submitForm() {
    this.RequestObj.createdDate = this.datepipe.transform(this.RequestObj.createdDate, 'yyyy-MM-dd');
    this.RequestObj.createdTime = this.RequestObj.createdTime + ":00";
    this.RequestObj.started = this.RequestObj.createdDate + " " + this.RequestObj.createdTime;
    this.RequestObj.ended = this.RequestObj.createdDate + " " + this.RequestObj.createdTime;
    this.RequestObj.categoryId = Number(this.RequestObj.categoryId);
    this.RequestObj.impactId = Number(this.RequestObj.impactId);
    this.RequestObj.requestLevelId = Number(this.RequestObj.requestLevelId);
    this.RequestObj.periorityId = Number(this.RequestObj.periorityId);
    this.RequestObj.requestModeId = Number(this.RequestObj.requestModeId);
    this.RequestObj.requestStatusId = Number(this.RequestObj.requestStatusId);
    this.RequestObj.requestTypeId = Number(this.RequestObj.requestTypeId);
    this.RequestObj.clientId = Number(this.RequestObj.clientId);
    this.RequestObj.projectId = Number(this.RequestObj.projectId);
    this.RequestObj.subCategoryId = Number(this.RequestObj.subCategoryId);
    this.RequestObj.organizationId = Number(this.RequestObj.organizationId);
    this.requestService.CreateRequest(this.RequestObj).subscribe(
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
