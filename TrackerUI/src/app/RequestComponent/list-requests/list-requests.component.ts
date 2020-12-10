import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ListPeriorityVM, ListRequestCategoryVM, ListRequestTypeStatusVM, ListRequestVM, RequestDateVM } from 'Models/RequestVM';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { RequestService } from 'Services/request.service';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import { ProjectService } from 'Services/project.service';
import { ListProjectVM } from 'Models/ProjectVM';
import { DataTableDirective } from 'angular-datatables';



@Component({
  selector: 'app-list-requests',
  templateUrl: './list-requests.component.html',
  styleUrls: ['./list-requests.component.css']
})
export class ListRequestsComponent implements OnInit {

  dtOptions: any = {};
  dtTrigger = new Subject();
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  isDtInitialized: boolean = false

  startDate:string;
  endDate:string;
  lstRequests: ListRequestVM[];
  lstProjects: ListProjectVM[];
  lstPeriorities: ListPeriorityVM[];
  lstStatus: ListRequestTypeStatusVM[];
  lstCategories: ListRequestCategoryVM[];


  roleName = localStorage.getItem("roleName");
  
  userId = Number( localStorage.getItem("userId"));
  constructor(private requestService: RequestService,
    private projectService: ProjectService,
    private confirmationService: ConfirmationService,
    private toastr: ToastrService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.getAllRequests();
    this.getAllProjects();
    this.getAllPeriorities();
    this.getAllStatus();
    this.getAllCategories();
    this.dtOptions = {
      pagingType: 'numbers',
      pageLength: 10,
      responsive: true,
      lengthMenu: [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]]
    };
  }


  getAllRequests() {
    this.requestService.GetRequests(this.userId).subscribe(
      data => {
        this.lstRequests = data;
        if (this.isDtInitialized) {
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.dtTrigger.next();
          });
        } else {
          this.isDtInitialized = true
          this.dtTrigger.next();
        }
      }
    )
  }
  getAllProjects() {
    this.projectService.GetProjects(this.userId).subscribe(
      data => {
        this.lstProjects = data;
      }
    )
  }
  getAllPeriorities() {
    this.requestService.GetRequestPeriorities().subscribe(
      data => {
        this.lstPeriorities = data;
      }
    )
  }
  getAllStatus() {
    this.requestService.GetRequestTypeStatus().subscribe(
      data => {
        this.lstStatus = data;
      }
    )
  }
  getAllCategories() {
    this.requestService.GetRequestCategories().subscribe(
      data => {
        this.lstCategories = data;
      }
    )
  }

  onStartDateChange($event)
  {
    this.startDate =$event;
  }
  onEndDateChange($event)
  {
    this.endDate =$event;
  }

  searchbyDate() {
  let RequestDateObj = new RequestDateVM();
   RequestDateObj.startDate =this.startDate;
   RequestDateObj.endDate = this.endDate;
   this.requestService.GetRequestsByDate(RequestDateObj).subscribe(data => {
    this.lstRequests = data;
    if (this.isDtInitialized) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next();
      });
    } else {
      this.isDtInitialized = true
      this.dtTrigger.next();
    }
  });

  }

  onProjectChange($event) {
    this.requestService.GetRequestsByProjectId($event.value).subscribe(data => {
      this.lstRequests = data;
      if (this.isDtInitialized) {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtTrigger.next();
        });
      } else {
        this.isDtInitialized = true
        this.dtTrigger.next();
      }
    });
  }
  onPeriorityChange($event) {
    this.requestService.GetRequestsByPeriorityId($event.value).subscribe(data => {
      this.lstRequests = data;
      if (this.isDtInitialized) {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtTrigger.next();
        });
      } else {
        this.isDtInitialized = true
        this.dtTrigger.next();
      }
    });
  }
  onStatusChange($event) {
    this.requestService.GetRequestsByStatusId($event.value).subscribe(data => {
      this.lstRequests = data;
      if (this.isDtInitialized) {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtTrigger.next();
        });
      } else {
        this.isDtInitialized = true
        this.dtTrigger.next();
      }
    });
  }
  onCategoryChange($event) {
    this.requestService.GetRequestsByCategoryId($event.value).subscribe(data => {
      this.lstRequests = data;
      if (this.isDtInitialized) {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtTrigger.next();
        });
      } else {
        this.isDtInitialized = true
        this.dtTrigger.next();
      }
    });
  }



  DeleteRequest(id: number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.requestService.DeleteRequest(id).subscribe(data => {
          this.route.navigate(['/requests'])
          this.toastr.success("Team is Deleted Successfully", "Delete");
          this.getAllRequests();
        });
      },
      reject: () => {
        this.toastr.error("Error occured", "Error");
      }
    });
  }
}
