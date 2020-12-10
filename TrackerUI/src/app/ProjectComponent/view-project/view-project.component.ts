import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import {
  DetailProjectVM,
  ListProjectStakeHolder,
  ListProjectTeamEmployee,
  ProjectStakeHolder,
  ProjectTeamEmployee,
} from "Models/ProjectVM";
import { ProjectService } from "Services/project.service";
import { ConfirmationService } from "primeng/api";
import { DatePipe } from "@angular/common";
import { ToastrService } from "ngx-toastr";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { ListTeamVM } from "Models/TeamVM";
import { ListProjectEmployeeVM } from "Models/EmployeeVM";
import { ListPTEPositionVM } from "Models/PTEPositionVM";
import { PTEPositionService } from "Services/ptePosition.service";
import { RequestService } from "Services/request.service";
import { ClientService } from "Services/client.service";
import { ListOrganizationVM } from "Models/RequestVM";
import { ListClientVM } from "Models/ClientVM";
@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css']
})
export class ViewProjectComponent implements OnInit {


  tmp: boolean = true;
  Id: number;
  dtStartDate: string;
  dtEndDate: string;
  ProjectObj: DetailProjectVM;
  lstProjectTeamEmployees: ListProjectTeamEmployee[];
  lstProjectStakeHolders: ListProjectStakeHolder[];
  lstPositions: ListPTEPositionVM[];
  lstTeams: ListTeamVM[];
  lstEmployees: ListProjectEmployeeVM[];
  lstProjectStakeHolderVM: ProjectStakeHolder[];
  lstProjectTeamEmployeeVM: ProjectTeamEmployee[];

  lstTableRows: any;
  teamId: number;
  positionId: number;
  teamName: String;
  positionName: String;

  constructor(
    private projectService: ProjectService,
    private toastr: ToastrService,
    private activeroute: ActivatedRoute,
    private route: Router,
    public datepipe: DatePipe
  ) { }

  ngOnInit(): void {
    let id = this.activeroute.snapshot.params["id"];
    this.Id = id;
    this.getProjectById(id);
    this.getProjecTeamEmployeetByProjectId(id);
    this.GetProjectStakeHoldersByProjectId(id);


    this.lstProjectTeamEmployeeVM = [];
    this.lstProjectStakeHolders = [];
  }
  getProjectById(id: number) {
    this.projectService.GetProjectDetailById(id).subscribe(
      (data) => {
        this.ProjectObj = data;
      },
      (error) => console.log(error)
    );
  }



  getProjecTeamEmployeetByProjectId(projectId: number) {
    this.projectService
      .GetListProjectTeamEmployeeByProjectId(projectId)
      .subscribe(
        (data) => {
          this.lstProjectTeamEmployees = data;
        },
        (error) => console.log(error)
      );
  }
  GetProjectStakeHoldersByProjectId(projectId: number) {
    this.projectService.GetProjectStakeHoldersByProjectId(projectId).subscribe(
      (data) => {
        this.lstProjectStakeHolders = data;
      },
      (error) => console.log(error)
    );
  }



  Activate(projectTeamEmployeeId: number) {
    this.projectService
      .UpdateProjectTeamEmployeeIsActive(projectTeamEmployeeId)
      .subscribe(
        (data) => {
          this.route.navigate(["/project/" + this.Id]);
          this.toastr.success("Item Saved Successfully", "Create");
        },
        (err) => {
          this.toastr.error("An Error Occured", "Error");
        }
      );
  }
}

