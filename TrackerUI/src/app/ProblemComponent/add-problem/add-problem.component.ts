import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Router } from '@angular/router';
import { CreateProblemVM, ListPeriorityVM, ListRequestCategoryVM, ListRequestImpactVM, ListRequestLevelVM, ListRequestModeVM, ListRequestTypeStatusVM, ListRequestTypeVM, ListUrgentVM } from 'Models/ProblemVM';
import { ToastrService } from 'ngx-toastr';
import { RequestService } from 'Services/request.service';
import { ProblemService } from 'Services/problem.service';
import { ListClientVM } from 'Models/ClientVM';
import { ClientService } from 'Services/client.service';

@Component({
  selector: 'app-add-problem',
  templateUrl: './add-problem.component.html',
  styleUrls: ['./add-problem.component.css']
})
export class AddProblemComponent implements OnInit {

  lstClients: ListClientVM[];
  lstCategories: ListRequestCategoryVM[];
  lstImpacts: ListRequestImpactVM[];
  lstLevels: ListRequestLevelVM[];
  lstModes: ListRequestModeVM[];
  lstPeriorities: ListPeriorityVM[];
  lstTypeStatus: ListRequestTypeStatusVM[];
  lstRequestTypes: ListRequestTypeVM[];
  lstUrgencies: ListUrgentVM[];


  ProblemObj: CreateProblemVM;
  constructor(private problemService: ProblemService,
    private requestService: RequestService,
    private clientService: ClientService,
    private datepipe: DatePipe, private toastr: ToastrService, private route: Router,) {
    this.ProblemObj = {
      title: '', description: '',
      dueDate:'',closedDate:'',
      clientId: 0,
      urgencyId: 0, categoryId: 0, impactId: 0, periorityId: 0, requestLevelId: 0,
      requestModeId: 0, requestStatusId: 0, requestTypeId: 0
    }
  }

  ngOnInit(): void {

    this.getAllOnLoad();
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
  onClientChange($event) {
    this.ProblemObj.clientId = $event.target.value;
  }
  submitForm() {
     this.ProblemObj.dueDate = this.datepipe.transform(this.ProblemObj.dueDate, 'yyyy-MM-dd');
     this.ProblemObj.closedDate = this.datepipe.transform(this.ProblemObj.closedDate, 'yyyy-MM-dd');
    this.ProblemObj.urgencyId = Number(this.ProblemObj.urgencyId);
    this.ProblemObj.categoryId = Number(this.ProblemObj.categoryId);
    this.ProblemObj.impactId = Number(this.ProblemObj.impactId);
    this.ProblemObj.requestLevelId = Number(this.ProblemObj.requestLevelId);
    this.ProblemObj.periorityId = Number(this.ProblemObj.periorityId);
    this.ProblemObj.requestModeId = Number(this.ProblemObj.requestModeId);
    this.ProblemObj.requestStatusId = Number(this.ProblemObj.requestStatusId);
    this.ProblemObj.requestTypeId = Number(this.ProblemObj.requestTypeId);
    this.ProblemObj.clientId = Number(this.ProblemObj.clientId);
    this.problemService.CreateProblem(this.ProblemObj).subscribe(
      (data => {
        this.route.navigate(['/problems']);
        this.toastr.success("Item Added Successfully", "Create");
      }),
      (err => {
        this.toastr.error("An Error Occured", "Error");
      }))

  }

}
