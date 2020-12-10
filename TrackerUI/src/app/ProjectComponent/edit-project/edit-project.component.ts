import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  EditProjectVM,
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
import { AngularEditorConfig } from "@kolkov/angular-editor";
import { ListPTEPositionVM } from "Models/PTEPositionVM";
import { PTEPositionService } from "Services/ptePosition.service";
import { RequestService } from "Services/request.service";
import { ClientService } from "Services/client.service";
import { ListOrganizationVM } from "Models/RequestVM";
import { ListClientVM } from "Models/ClientVM";
import { CreateMileStoneVM, ListMileStoneVM } from "Models/MileStoneVM";
import { MileStoneService } from "Services/milestone.service";
@Component({
  selector: "app-edit-project",
  templateUrl: "./edit-project.component.html",
  styleUrls: ["./edit-project.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class EditProjectComponent implements OnInit {
  editorConfig: AngularEditorConfig = {
    editable: true,
    height: "200px",
    minHeight: "0",
    maxHeight: "200px",
    width: "auto",
    minWidth: "0",
    showToolbar: true,
    fonts: [
      { class: "arial", name: "Arial" },
      { class: "times-new-roman", name: "Times New Roman" },
      { class: "calibri", name: "Calibri" },
      { class: "comic-sans-ms", name: "Comic Sans MS" },
    ],
    //uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    toolbarPosition: "top",
    toolbarHiddenButtons: [["bold", "italic"], ["fontSize"]],
  };
  tmp: boolean = true;
  Id: number;
  dtStartDate: string;
  dtEndDate: string;
  ProjectObj: EditProjectVM;
  MileStoneObj: CreateMileStoneVM;
  lstProjectTeamEmployees: ListProjectTeamEmployee[];
  lstProjectMilestones: ListMileStoneVM[];
  lstProjectStakeHolders: ListProjectStakeHolder[];
  lstPositions: ListPTEPositionVM[];
  lstTeams: ListTeamVM[];
  lstEmployees: ListProjectEmployeeVM[];
  lstProjectStakeHolderVM: ProjectStakeHolder[];
  lstProjectTeamEmployeeVM: ProjectTeamEmployee[];

  lstOrganizations: ListOrganizationVM[];
  lstClients: ListClientVM[];


  dynamicArray: Array<DynamicGrid> = [];
  newDynamic: any = {};

  dynamicSHArray: Array<DynamicSHGrid> = [];
  newSHDynamic: any = {};

  dynamicMileArray: Array<DynamicMileGrid> = [];
  newMileDynamic: any = {};

  lstTableRows: any;
  teamId: number;
  positionId: number;
  teamName: String;
  positionName: String;

  constructor(
    private projectService: ProjectService,
    private positionService: PTEPositionService,
    private requestService: RequestService,
    private clientService: ClientService,
    private mileStoneService: MileStoneService,
    private confirmationService: ConfirmationService,
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
    this.GetProjectMileStoneByProjectId(id);
    this.getAllTeams();
    this.getAllPTEPositions();

    this.getAllOrganizations();
    this.getAllClients();

    this.lstProjectTeamEmployeeVM = [];
    this.lstProjectStakeHolders = [];
  }
  getAllTeams() {
    this.projectService.GetTeams().subscribe((data) => {
      this.lstTeams = data;
    });
  }
  getAllPTEPositions() {
    this.positionService.GetPTEPosition().subscribe((data) => {
      this.lstPositions = data;
    });
  }
  getProjectById(id: number) {
    this.projectService.GetProjectById(id).subscribe(
      (data) => {
        this.ProjectObj = data;
      },
      (error) => console.log(error)
    );
  }


  getAllOrganizations() {
    this.requestService.GetOrganizations().subscribe((data) => {
      this.lstOrganizations = data;
    });
  }

  getAllClients() {
    this.clientService.GetClients().subscribe((data) => {
      this.lstClients = data;
    });
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

  GetProjectMileStoneByProjectId(projectId: number) {
    this.mileStoneService.GetListMileStonesByProjectId(projectId).subscribe(
      (data) => {
        this.lstProjectMilestones = data;
      },
      (error) => console.log(error)
    );
  }


  addStartDate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.dtStartDate = this.datepipe.transform(event.value, "yyyy-MM-dd");
  }
  addEndDate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.dtEndDate = this.datepipe.transform(event.value, "yyyy-MM-dd");
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
  onChange($event) {
    // let text = $event.target.options[$event.target.options.selectedIndex].text;
    this.teamId = $event.value;
    this.teamName = $event.source.triggerValue;
    this.lstEmployees = [];
    this.projectService
      .GetEmployeesByTeamId($event.value)
      .subscribe((data) => {
        this.lstEmployees = data;
      });
  }

  // onPositionChange($event) {
  //   let text = $event.target.options[$event.target.options.selectedIndex].text;
  //   this.positionId = $event.target.value;
  //   this.positionName = text;
  // }

  onPositionChange($event) {
    //  let text = $event.options[$event.options.index].text;// $event.options[$event.options.selectedIndex].text;
    this.positionId = $event.value;
    this.positionName = $event.source.triggerValue;
  }
  addRow() {
    for (var i = 0; i < this.lstEmployees.length; i++) {
      if (this.lstEmployees[i].checked) {
        this.newDynamic = {
          employeename: this.lstEmployees[i].name,
          teamName: this.teamName,
          positionName: this.positionName,
          teamId: this.teamId,
          ptePositionId: this.positionId,
          employeeId: this.lstEmployees[i].id,
        };
        this.dynamicArray.push(this.newDynamic);

        const countPMPosition = this.dynamicArray.filter(x => x.ptePositionId == "1").length;
        if (countPMPosition > 1) {
          this.toastr.show("Allow only one PM in a project", "PM Position Exist");
          this.dynamicArray.pop();
          return;
        }
        else {
          // this.dynamicArray.push(this.newDynamic);
        }
      }
    }
  }

  deleteRow(index) {
    if (this.dynamicArray.length == 1) {
      this.toastr.error(
        "Can't delete the row when there is only one row",
        "Warning"
      );
      return false;
    } else {
      this.dynamicArray.splice(index, 1);
      this.toastr.warning("Row deleted successfully", "Delete row");
      return true;
    }
  }

  addSHRow() {
    this.newSHDynamic = {
      Name: this.ProjectObj.StakeHolderName,
    };
    this.dynamicSHArray.push(this.newSHDynamic);
  }

  deleteSHRow(index) {
    if (this.dynamicSHArray.length == 1) {
      this.toastr.error(
        "Can't delete the row when there is only one row",
        "Warning"
      );
      return false;
    } else {
      this.dynamicSHArray.splice(index, 1);
      this.toastr.warning("Row deleted successfully", "Delete row");
      return true;
    }
  }


  addMileRow() {

    this.newMileDynamic = {
      Title: this.ProjectObj.Title,
      Description: this.ProjectObj.Description,
      MSStartDate: this.ProjectObj.MSStartDate,
      MSEndDate: this.ProjectObj.MSEndDate,
      MileStartTime: this.ProjectObj.MileStartTime,
      MSEndTime: this.ProjectObj.MSEndTime
    };
    this.dynamicMileArray.push(this.newMileDynamic);
  }



  deleteMileRow(index) {
    if (this.newMileDynamic.length == 1) {
      this.toastr.error(
        "Can't delete the row when there is only one row",
        "Warning"
      );
      return false;
    } else {
      this.newMileDynamic.splice(index, 1);
      this.toastr.warning("Row deleted successfully", "Delete row");
      return true;
    }
  }



  DeleteProjectTeamEmployee(projectTeamEmployeeId: number) {
    // this.projectService.DeleteProjectTeamEmployee(projectTeamEmployeeId).subscribe(data=>{
    //   this.toastr.success("Item is Deleted Successfully","Delete");
    // })

    this.confirmationService.confirm({
      message: "Are you sure that you want to proceed?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.projectService
          .DeleteProjectTeamEmployee(projectTeamEmployeeId)
          .subscribe((data) => {
            this.toastr.success("Item is Deleted Successfully", "Delete");
          });
      },
      reject: () => { },
    });
  }

  DeleteProjectMileStone(Id: number) {

    this.confirmationService.confirm({
      message: "Are you sure that you want to proceed?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.mileStoneService
          .DeleteMileStone(Id)
          .subscribe((data) => {
            this.toastr.success("Item is Deleted Successfully", "Delete");
          });
      },
      reject: () => { },
    });
  }



  DeleteProjectStakeHolder(id: number) {
    this.confirmationService.confirm({
      message: "Are you sure that you want to proceed?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.projectService.DeleteProjectStakeHolder(id).subscribe((data) => {
          this.toastr.success("Item is Deleted Successfully", "Delete");
          return;
        });
      },
      reject: () => {
        this.toastr.error("Error in deleting", "Delete");
      },
    });
  }
  submitTeamEmployees() {
    for (var i = 0; i < this.dynamicArray.length; i++) {
      const Obj = new ProjectTeamEmployee();
      Obj.teamId = Number(this.dynamicArray[i].teamId);
      Obj.employeeId = Number(this.dynamicArray[i].employeeId);
      Obj.ptePositionId = Number(this.dynamicArray[i].ptePositionId);
      Obj.projectId = Number(this.Id);
      Obj.isActive = false;
      this.lstProjectTeamEmployeeVM.push(Obj);
    }

    this.projectService
      .CreateProjectTeamEmployees(this.lstProjectTeamEmployeeVM)
      .subscribe(
        (data) => {
          this.ngOnInit();
          // this.route.navigateByUrl('/project/' + this.Id);
          this.toastr.success("Item Added Successfully", "Create");
        },
        (err) => {
          console.log(err);
          this.toastr.error("An Error Occured", "Error");
        }
      );

    this.lstProjectTeamEmployeeVM = [];

    this.getProjectById(this.Id);
    this.getProjecTeamEmployeetByProjectId(this.Id);
  }


  submitProjectMileStones()
  {
    for (var i = 0; i < this.dynamicMileArray.length; i++) {
      const MSObj = new CreateMileStoneVM();
      MSObj.ProjectId = Number(this.Id);
      MSObj.Title = this.dynamicMileArray[i].Title;
      MSObj.Description = this.dynamicMileArray[i].Description;
      MSObj.StartDate = this.dynamicMileArray[i].MSStartDate;
      MSObj.EndDate = this.dynamicMileArray[i].MSEndDate;
      MSObj.StartTime = this.dynamicMileArray[i].MileStartTime;
      MSObj.EndTime = this.dynamicMileArray[i].MSEndTime;
      console.log(MSObj);
      this.mileStoneService.CreateMileStone(MSObj).subscribe(result => {
      });
    }
  }



  SubmitData() {
    this.ProjectObj.startDate = this.datepipe.transform(
      this.ProjectObj.startDate,
      "yyyy-MM-dd"
    );
    this.ProjectObj.endDate = this.datepipe.transform(
      this.ProjectObj.endDate,
      "yyyy-MM-dd"
    );
    this.projectService.UpdateProject(this.ProjectObj).subscribe(
      (data) => {
        // for (var i = 0; i < this.dynamicSHArray.length; i++) {
        //   this.projectService.CreateStakeHolder(this.dynamicSHArray[i]).subscribe(result => {
        //     var Obj = new ProjectStakeHolder();
        //     Obj.projectId = this.Id;
        //     Obj.SHId = result;
        //     this.lstProjectStakeHolderVM.push(Obj);
        //     this.projectService
        //       .CreateProjectStakeHolders(this.lstProjectStakeHolderVM)
        //       .subscribe(
        //         (data) => {
        //         },
        //         (err) => {
        //         });
        //   });
        // }
        this.route.navigate(["/project", this.Id]);
        this.toastr.success("Item Saved Successfully", "Create");
      },
      (err) => {
        this.toastr.error("An Error Occured", "Error");
      }
    );

    this.getProjectById(this.Id);
    this.getProjecTeamEmployeetByProjectId(this.Id);
  }
}

export class DynamicGrid {
  teamId: string;
  employeeId: string;
  ptePositionId: string;
  employeename: string;
  teamName: string;
  positionName: string;
}
export class DynamicSHGrid {
  Name: string;
}


export class DynamicMileGrid {
  Title: string;
  Description: string;
  MSStartDate: string;
  MSEndDate: string;
  MileStartTime: any;
  MSEndTime: any;
  ProjectId: number;
}