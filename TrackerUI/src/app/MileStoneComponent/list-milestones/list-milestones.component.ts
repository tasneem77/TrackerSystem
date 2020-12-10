import { Component, OnInit,OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListMileStoneVM } from 'Models/MileStoneVM';
import { ListProjectVM } from 'Models/ProjectVM';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { MileStoneService } from 'Services/milestone.service';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import { DataTableDirective } from 'angular-datatables';
import { ProjectService } from 'Services/project.service';
@Component({
  selector: 'app-list-milestones',
  templateUrl: './list-milestones.component.html',
  styleUrls: ['./list-milestones.component.css']
})
export class ListMilestonesComponent implements OnInit,OnDestroy {

  lstProjects: ListProjectVM[];
  lstMileStones: ListMileStoneVM[];
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();
  isDtInitialized: boolean = false;
  dtElement: DataTableDirective;

  projectId:any;
  constructor(
    private milestoneService: MileStoneService,
    private projectService: ProjectService,
    private confirmationService: ConfirmationService,
    private toastr: ToastrService,
    private activeroute: ActivatedRoute,
    private route: Router) { }

  ngOnInit(): void {
    this.projectId = this.activeroute.snapshot.params["projectId"];
    this.getAllProjects();
    this.getAllMileStones();

    this.dtOptions = {
        pagingType: 'numbers',
        pageLength:10,
        responsive: true,
        lengthMenu: [[10, 25, 50,100, -1], [10, 25, 50,100, "All"]]
      }; 
  }

  getAllProjects() {
    this.projectService.GetProjects(Number(localStorage.getItem("userId"))).subscribe(
      data => {
        this.lstProjects = data;
      }
    )
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  getAllMileStones() {
    this.milestoneService.GetListMileStonesByProjectId(this.projectId).subscribe(
      data => {
        this.lstMileStones = data;
             
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
  onChange($event) {
    if ($event.target.value == "" || $event.target.value == null) {
      this.getAllMileStones();
    }
    else {
      this.milestoneService.GetListMileStonesByProjectId($event.target.value).subscribe(
        data => {
          this.lstMileStones = data;
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
  }
  DeleteMileStone(id: number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.milestoneService.DeleteMileStone(id).subscribe(data => {
          this.route.navigate(['/milestones'])
          this.toastr.success("Team is Deleted Successfully", "Delete");
          this.getAllMileStones();
        }
        );
      },
      reject: () => {
        this.toastr.error("Error occured", "Error");
      }
    });
  }
}
