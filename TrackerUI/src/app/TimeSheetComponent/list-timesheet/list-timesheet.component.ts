import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListTimeSheetVM } from 'Models/TimeSheetVM';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { TimeSheetService } from 'Services/timesheet.service';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-list-timesheet',
  templateUrl: './list-timesheet.component.html',
  styleUrls: ['./list-timesheet.component.css']
})
export class ListTimesheetComponent implements OnInit {


  lstTimeSheets: ListTimeSheetVM[];
  
  dtOptions: any = {};
  dtTrigger= new Subject();


  constructor(private timeSheetService: TimeSheetService,
    private  confirmationService: ConfirmationService,
  public datepipe: DatePipe,
    private toastr : ToastrService,
    private route : Router) { }

  ngOnInit(): void {
    this.getAllTImeSheets();

      
    this.dtOptions = {
        pagingType: 'numbers',
        pageLength:10,
        responsive: true,
        lengthMenu: [[10, 25, 50,100, -1], [10, 25, 50,100, "All"]]
      }; 
  }



  getAllTImeSheets() {
    this.timeSheetService.GetTimeSheets().subscribe(
      data => {
      //  this.datepipe.transform(data["startDate"], 'yyyy-MM-dd');
        this.lstTimeSheets = data;
        this.dtTrigger.next();
      }
    )
  }
  DeleteTimeSheet(id:number) {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.timeSheetService.DeleteTimeSheet(id).subscribe(data=>{
           this.route.navigate(['/employees'])
            this.toastr.success("Team is Deleted Successfully","Delete");
            this.getAllTImeSheets();
          }
        );
        },
        reject: () => {
          this.toastr.error("Error occured","Error");
        }
    });
}

}
