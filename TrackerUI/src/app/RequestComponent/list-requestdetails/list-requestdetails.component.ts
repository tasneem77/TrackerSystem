import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListRequestDetailVM } from 'Models/RequestVM';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { Subject } from 'rxjs';
import { RequestService } from 'Services/request.service';

@Component({
  selector: 'app-list-requestdetails',
  templateUrl: './list-requestdetails.component.html',
  styleUrls: ['./list-requestdetails.component.css']
})
export class RequestDetailsComponent implements OnInit {

  RequestId: number;
  userId: number;
  roleName:string;
  RequestCode: string;
  dtOptions: any = {};
  dtTrigger= new Subject();
  lstRequestDetails: ListRequestDetailVM[];
  constructor(private requestService: RequestService,
    private confirmationService: ConfirmationService,
    private toastr: ToastrService,
    private route: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let id = this.activeRoute.snapshot.params["id"];
    this.RequestId = id;
    this.userId =Number(localStorage.getItem("userId"));
    this.roleName =localStorage.getItem("roleName");
    
    localStorage.setItem("requestId",id);

    this.getAllRequestDetailsByRequestId(this.RequestId);
    this.dtOptions = {
      pagingType: 'numbers',
      pageLength:10,
      responsive: true,
      lengthMenu: [[10, 25, 50,100, -1], [10, 25, 50,100, "All"]]
    }; 
  }

  getAllRequestDetailsByRequestId(requestId) {
    this.requestService.GetRequestDetailsByRequestId(requestId).subscribe(items => {
      this.lstRequestDetails = items;
      this.dtTrigger.next();
    });


    this.requestService.GetRequestById(requestId).subscribe(item => {
      console.log("projectId",item["projectId"].toString());

      localStorage.setItem("projectId",item["projectId"].toString());
    });


  }


  
  DeleteRequestDetail(id: number)
  {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.requestService.DeleteRequestDetails(id).subscribe(data=>{
          this.toastr.success("Item is Deleted Successfully","Delete");
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
