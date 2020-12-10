import { Component, OnInit ,OnDestroy } from '@angular/core';
import { ListTeamVM } from 'Models/TeamVM';
import { TeamService } from 'Services/team.service';
import { ToastrService } from 'ngx-toastr';
import {  Router } from '@angular/router';
import {  ConfirmationService } from 'primeng/api';
import { Subject } from 'rxjs';
// import pdfMake from "pdfmake/build/pdfmake";
// import pdfFonts from "pdfmake/build/vfs_fonts";
// pdfMake.vfs = pdfFonts.pdfMake.vfs;
 
// import * as JSZip from "jszip";
// window.JSZip = JSZip;
 
import "datatables.net-buttons";
import "datatables.net-buttons/js/buttons.html5.js";
import  "datatables.net-buttons/js/buttons.print.js";
import { DataTableDirective } from 'angular-datatables';



@Component({
  selector: 'app-list-teams',
  templateUrl: './list-teams.component.html',
  styleUrls: ['./list-teams.component.css']
})
export class ListTeamsComponent implements OnInit,OnDestroy {

  lstTeams : ListTeamVM[] = [];

  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();
  isDtInitialized: boolean = false;
  dtElement: DataTableDirective;


  constructor(private teamService : TeamService,
     private toastr : ToastrService,
     private route : Router,
     private  confirmationService: ConfirmationService) { }

  ngOnInit(): void {
       this.dtOptions= {
        pagingType: 'numbers',
        pageLength:10,
        responsive: true,
        lengthMenu: [[10, 25, 50,100, -1], [10, 25, 50,100, "All"]],
        // 'dom': "<'row'<'col-sm-4'l> <'col-sm-8'p>>" + 'Bfrtip',
        // dom: 'Bfrtip',
        // buttons: [
        //   'columnsToggle',
        //   'colvis',
        //   'copy',
        //   'print',
        //   'excel',
        //   {
        //     text: 'Some button',
        //     key: '1',
        //     action: function (e, dt, node, config) {
        //       alert('Button activated');
        //     }
        //   }
      //  ]
      }; 
      this.getAllTeams();   
  }
  getAllTeams()
  {
    this.teamService.GetTeams().subscribe(
      data=>{
      this.lstTeams = data;
      if (this.isDtInitialized) {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtTrigger.next();
        });
      } else {
        this.isDtInitialized = true
        this.dtTrigger.next();
      }
    })
    
  }

  
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  

    DeleteTeam(id:number) {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.teamService.DeleteTeam(id).subscribe(data=>{
            if(data == 0)
            {
              this.toastr.show("this Team is related to project","Invalid Delete"); 
            }
            else
            {
           this.route.navigate(['/teams'])
            this.toastr.success("Team is Deleted Successfully","Delete");
            }
            this.getAllTeams();
          }
        );
        },
        reject: () => {
          this.toastr.error("Error occured","Error");
        }
    });
}
}
