import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RequestService } from 'Services/request.service';
import { ProblemService } from 'Services/problem.service';
import { ListClientVM } from 'Models/ClientVM';
import { ClientService } from 'Services/client.service';
import {  EditProblemVM, ListPeriorityVM, ListRequestCategoryVM, ListRequestImpactVM, ListRequestLevelVM, ListRequestModeVM, ListRequestTypeStatusVM, ListRequestTypeVM, ListUrgentVM } from 'Models/ProblemVM';
@Component({
  selector: 'app-edit-problem',
  templateUrl: './edit-problem.component.html',
  styleUrls: ['./edit-problem.component.css']
})
export class EditProblemComponent implements OnInit {

  lstClients: ListClientVM[];
  lstCategories: ListRequestCategoryVM[];
  lstImpacts: ListRequestImpactVM[];
  lstLevels: ListRequestLevelVM[];
  lstModes: ListRequestModeVM[];
  lstPeriorities: ListPeriorityVM[];
  lstTypeStatus: ListRequestTypeStatusVM[];
  lstRequestTypes: ListRequestTypeVM[];
  lstUrgencies: ListUrgentVM[];


  ProblemObj: EditProblemVM;
  constructor(
    private problemService: ProblemService,
    private requestService: RequestService,
    private clientService: ClientService,
    private toastr: ToastrService,
    private activeRoute: ActivatedRoute,  private route: Router, public datepipe: DatePipe) { }

  ngOnInit(): void {

    let id = this.activeRoute.snapshot.params["id"];
this.getAllOnLoad();
    this.problemService.GetProblemById(id).subscribe(
      (data => {
        this.ProblemObj = data;

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

    this.clientService.GetClients().subscribe(data => {
      this.lstClients = data
    });


  }

  onImpactChange($event) {
    this.ProblemObj.impactId = $event.target.value;
  }
  onUrgentChange($event) {
    this.ProblemObj.urgencyId = $event.target.value;
  }
  onLevelChange($event) {
    this.ProblemObj.requestLevelId = $event.target.value;
  }
  onModeChange($event) {
    this.ProblemObj.requestModeId = $event.target.value;
  }
  onStatusChange($event) {
    this.ProblemObj.requestStatusId = $event.target.value;
  }

  onTypeChange($event) {
    this.ProblemObj.requestTypeId = $event.target.value;
  }

  onPeriorityChange($event) {
    this.ProblemObj.periorityId = $event.target.value;
  }
  onCategoryChange($event) {
    this.ProblemObj.categoryId = $event.target.value;
  }
  // addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
  //   this.ProblemObj.createdDate = this.datepipe.transform(event.value, 'yyyy-MM-dd');
  // }
  
  submitForm() {
    this.ProblemObj.dueDate = this.datepipe.transform(this.ProblemObj.dueDate, 'yyyy-MM-dd');
    this.ProblemObj.closedDate = this.datepipe.transform(this.ProblemObj.closedDate, 'yyyy-MM-dd');
    // this.ProblemObj.createdTime = this.ProblemObj.createdTime;// + ":00";
    // this.ProblemObj.respondTime = this.ProblemObj.respondTime;// + ":00";
    // this.ProblemObj.started = this.ProblemObj.createdDate + "T" + this.ProblemObj.createdTime;
    // this.ProblemObj.ended = this.ProblemObj.respondDate + "T" + this.ProblemObj.respondTime;

    this.ProblemObj.urgencyId = Number(this.ProblemObj.urgencyId);
    this.ProblemObj.categoryId = Number(this.ProblemObj.categoryId);
    this.ProblemObj.impactId = Number(this.ProblemObj.impactId);
    this.ProblemObj.requestLevelId = Number(this.ProblemObj.requestLevelId);
    this.ProblemObj.periorityId = Number(this.ProblemObj.periorityId);
    this.ProblemObj.requestModeId = Number(this.ProblemObj.requestModeId);
    this.ProblemObj.requestStatusId = Number(this.ProblemObj.requestStatusId);
    this.ProblemObj.requestTypeId = Number(this.ProblemObj.requestTypeId);
 


    this.problemService.UpdateProblem(this.ProblemObj).subscribe(
      (data => {

        this.route.navigate(['/problems']);
        this.toastr.success("Item Added Successfully", "Update");
      }),
      (err => {
        this.toastr.error("An Error Occured", "Error");
      }))


  }
}
