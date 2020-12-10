import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AngularEditorConfig } from "@kolkov/angular-editor";
import { ListClientVM } from "Models/ClientVM";
import { ListProjectEmployeeVM } from "Models/EmployeeVM";
import { CreateMileStoneVM } from "Models/MileStoneVM";
import { CreateProjectVM, ListProjectMileStones, ProjectStakeHolder, ProjectTeamEmployee } from "Models/ProjectVM";
import { ListPTEPositionVM } from "Models/PTEPositionVM";
import { ListOrganizationVM } from "Models/RequestVM";
import { ListTeamVM } from "Models/TeamVM";
import { ToastrService } from "ngx-toastr";
import { ClientService } from "Services/client.service";
import { MileStoneService } from "Services/milestone.service";
import { ProjectService } from "Services/project.service";
import { PTEPositionService } from "Services/ptePosition.service";
import { RequestService } from "Services/request.service";

@Component({
  selector: "app-add-project",
  templateUrl: "./add-project.component.html",
  styleUrls: ["./add-project.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class AddProjectComponent implements OnInit {
  editorConfig: AngularEditorConfig = {
    editable: true,
    // spellcheck: true,
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

  disableTab: boolean = false;
  disableTab2: boolean = false;

  ProjectObj: CreateProjectVM;
  MileStoneObj: CreateMileStoneVM;
  lstTeams: ListTeamVM[];
  lstEmployees: ListProjectEmployeeVM[];
  lstPositions: ListPTEPositionVM[];
  lstOrganizations: ListOrganizationVM[];
  lstClients: ListClientVM[];

  lstProjectTeamEmployeeVM: ProjectTeamEmployee[];
  lstProjectStakeHolderVM: ProjectStakeHolder[];
  lstProjectMileStoneVM: ListProjectMileStones[];




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
  projectStartTime: string;
  projectStartDate: string;
  projectEndDate: string;

  constructor(
    private projectService: ProjectService,
    private requestService: RequestService,
    private clientService: ClientService,
    private mileStoneService: MileStoneService,
    private positionService: PTEPositionService,
    //   private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    public datepipe: DatePipe
  ) {
    this.ProjectObj = {
      Name: "",
      StartDate: "",
      EndDate: "",
      // StartTime: "",
      // EndTime: "",
      Discription: "", StakeHolderName: '',
      ClientId: 0, OrganizationId: 0,

      MSEndDate: '', MSEndTime: '', MSStartDate: '', MileStartTime: '', Description: '', Title: '', ProjectId: 0
    };
  }
  ngOnInit(): void {
    this.getAllTeams();
    this.getAllPTEPositions();
    this.getAllOrganizations();
    this.getAllClients();
    this.lstProjectTeamEmployeeVM = [];
    this.lstProjectStakeHolderVM = [];
    this.lstProjectMileStoneVM = [];
    //localStorage.clear();
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




  onChange($event) {
    let text = $event.target.options[$event.target.options.selectedIndex].text;
    this.teamId = $event.target.value;
    this.teamName = text;
    this.lstEmployees = [];
    this.projectService
      .GetEmployeesByTeamId($event.target.value)
      .subscribe((data) => {
        this.lstEmployees = data;
      });
  }

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
          employeeId: this.lstEmployees[i].id,
          ptePositionId: this.positionId,
        };
        this.dynamicArray.push(this.newDynamic);
        const countPMPosition = this.dynamicArray.filter(x => x.ptePositionId == "1").length;
        console.log(countPMPosition);
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
      Name: this.ProjectObj.StakeHolderName
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
  SaveMileStones() {

  }

  submitForm() {
    this.ProjectObj.StartDate = this.datepipe.transform(
      this.ProjectObj.StartDate,
      "yyyy-MM-dd"
    );
    this.ProjectObj.EndDate = this.datepipe.transform(
      this.ProjectObj.EndDate,
      "yyyy-MM-dd"
    );
    this.projectService.CreateProject(this.ProjectObj).subscribe(
      (data) => {
        localStorage.setItem("projectId", data.toString());
        for (var i = 0; i < this.dynamicSHArray.length; i++) {
          this.projectService.CreateStakeHolder(this.dynamicSHArray[i]).subscribe(result => {
            var Obj = new ProjectStakeHolder();
            Obj.projectId = Number(localStorage.getItem("projectId"));
            Obj.SHId = result;
            this.lstProjectStakeHolderVM.push(Obj);
            this.projectService
              .CreateProjectStakeHolders(this.lstProjectStakeHolderVM)
              .subscribe(
                (data) => {
                },
                (err) => {
                });
          });
        }

        for (var i = 0; i < this.dynamicMileArray.length; i++) {
          const MSObj = new CreateMileStoneVM();
         MSObj.ProjectId = Number(localStorage.getItem("projectId"));
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
          for (var i = 0; i < this.dynamicArray.length; i++) {
            const Obj = new ProjectTeamEmployee();
            Obj.teamId = Number(this.dynamicArray[i].teamId);
            Obj.employeeId = Number(this.dynamicArray[i].employeeId);
            Obj.projectId = Number(localStorage.getItem("projectId"));
            Obj.ptePositionId = Number(this.dynamicArray[i].ptePositionId)
            Obj.isActive = false;
            this.lstProjectTeamEmployeeVM.push(Obj);
          }
          this.projectService
            .CreateProjectTeamEmployees(this.lstProjectTeamEmployeeVM)
            .subscribe(
              (data) => {
                this.router.navigate(["/projects"]);
                this.toastr.success("Item Added Successfully", "Create");
              },
              (err) => {
                console.log(err);
                this.toastr.error("An Error Occured", "Error");
              });
        },
        (err) => {
          console.log(err);
          this.toastr.error("An Error Occured", "Error");
        });
  }

  SecondStep() {
    if ((this.ProjectObj.Name != "" || this.ProjectObj.Name != null)
      && (this.ProjectObj.StartDate != "" || this.ProjectObj.StartDate != null)
      && (this.ProjectObj.EndDate != "" || this.ProjectObj.EndDate != null)) {
      this.disableTab = false;
      this.disableTab2 = true;
    }
  }

  ThirdStep() {
    if (this.ProjectObj.Name != "" || this.ProjectObj.Name != null) {
      this.disableTab = false;
      this.disableTab2 = false;
    }
  }

  Finish() {

    this.disableTab = false;
    this.disableTab2 = false;
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

