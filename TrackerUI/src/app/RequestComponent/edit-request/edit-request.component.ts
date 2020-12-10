import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ListClientVM } from 'Models/ClientVM';
import { ListProjectVM } from 'Models/ProjectVM';
import { EditRequestVM, ListOrganizationVM, ListPeriorityVM, ListRequestCategoryVM, ListRequestImpactVM, ListRequestLevelVM, ListRequestModeVM, ListRequestSubCategoryVM, ListRequestTypeStatusVM, ListRequestTypeVM, ListUrgentVM } from 'Models/RequestVM';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from 'Services/client.service';
import { ProjectService } from 'Services/project.service';
import { RequestService } from 'Services/request.service';

@Component({
  selector: 'app-edit-request',
  templateUrl: './edit-request.component.html',
  styleUrls: ['./edit-request.component.css']
})
export class EditRequestComponent implements OnInit {

  
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
     uploadWithCredentials: false,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };
  
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
UserId:any;
  RequestObj: EditRequestVM;
  constructor(private requestService: RequestService,
    private clientService: ClientService,
    private projectService: ProjectService, private toastr: ToastrService,
    private activeRoute: ActivatedRoute, private route: Router, public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.UserId= Number(localStorage.getItem("userId"));
    
    let id = this.activeRoute.snapshot.params["id"];
    this.getAllOnLoad();
    this.requestService.GetRequestById(id).subscribe(
      (data => {
       // console.log("categoryId",data["categoryId"]);

        this.requestService.ListRequestSubCategoriesByCategoryId(data["categoryId"]).subscribe(items =>
          {
            this.lstSubCategories = items;
          });
        this.RequestObj = data;
      }),
      (error => console.log(error))
    );
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
    // this.requestService.GetRequestUrgencies().subscribe(data => {
    //   this.lstUrgencies = data
    // });

    
    this.requestService.GetOrganizations().subscribe(data => {
      this.lstOrganizations = data
    });
    this.clientService.GetClients().subscribe(data => {
      this.lstClients = data
    });
    this.projectService.GetProjects( this.UserId).subscribe(data => {
      this.lstProjects = data
    });
  }
  onSubCategoryChange($event) {
    this.RequestObj.subCategoryId = $event.target.value;
  }

  onImpactChange($event) {
    this.RequestObj.impactId = $event.target.value;
  }
  // onUrgentChange($event) {
  //   this.RequestObj.urgencyId = $event.target.value;
  // }
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
    this.RequestObj.requestTypeId = $event.target.value;
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
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.RequestObj.createdDate = this.datepipe.transform(event.value, 'yyyy-MM-dd');
  }

  onClientChange($event) {
    this.RequestObj.clientId = $event.target.value;
  }

  onProjectChange($event) {
    this.RequestObj.projectId = $event.target.value;
  }

  submitForm() {
    this.RequestObj.createdDate = this.datepipe.transform(this.RequestObj.createdDate, 'yyyy-MM-dd');
    this.RequestObj.createdTime = this.RequestObj.createdTime;
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


    this.requestService.UpdateRequest(this.RequestObj).subscribe(
      (data => {

        this.route.navigate(['/requests']);
        this.toastr.success("Item Updated Successfully", "Update");
      }),
      (err => {
        this.toastr.error("An Error Occured", "Error");
      }))


  }
}
