import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { TaskService } from 'Services/task.service';
import { EditTaskVM } from 'Models/TaskVM';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ListMileStoneVM, ListTaskMileStoneEmployees, TaskMileStoneEmployee } from 'Models/MileStoneVM';
import { MileStoneService } from 'Services/milestone.service';
import { ProjectService } from 'Services/project.service';
import { ListTeamVM } from 'Models/TeamVM';
import { ListProjectEmployeeVM } from 'Models/EmployeeVM';
import { ListProjectVM } from 'Models/ProjectVM';


@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {



  editorConfig: AngularEditorConfig = {
    editable: true,
    // spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    //  translate: 'yes',
    // enableToolbar: true,
    showToolbar: true,
    // placeholder: 'Enter text here...',
    // defaultParagraphSeparator: '',
    // defaultFontName: '',
    // defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    // customClasses: [
    // {
    //   name: 'quote',
    //   class: 'quote',
    // },
    // {
    //   name: 'redText',
    //   class: 'redText'
    // },
    // {
    //   name: 'titleText',
    //   class: 'titleText',
    //   tag: 'h1',
    // },
    //],
    //uploadUrl: 'v1/image',
    // uploadWithCredentials: false,
    //sanitize: true,
    toolbarPosition: 'top',
    // toolbarHiddenButtons: [
    //   ['bold', 'italic'],
    //   ['fontSize']
    // ]
  };
  constructor(private taskService: TaskService,
    private confirmationService: ConfirmationService,
    private projectService: ProjectService,
    private toastr: ToastrService,
    private activeroute: ActivatedRoute,
    private route: Router,
    public datepipe: DatePipe) { }

  Id: number; dtStartDate: string; dtEndDate: string;
  TaskObj: EditTaskVM;
  lstMileStones: ListMileStoneVM[];
  lstTeams: ListTeamVM[];
  lstEmployees: ListProjectEmployeeVM[];
  lstProjects: ListProjectVM[];
  lstTaskMileStoneEmployeeVM: TaskMileStoneEmployee[];


  ListTaskMileStoneEmployees: ListTaskMileStoneEmployees[];


  dynamicArray: Array<DynamicGrid2> = [];
  newDynamic: any = {};
  lstTableRows: any;
  teamId: number;
  teamName: String;

  milestoneId: number;
  projectId: number;
  ngOnInit(): void {
    //this.milestoneId = 0;
    let id = this.activeroute.snapshot.params["id"];
    this.Id = id;
    this.getTaskById(this.Id);
    //   this.getAllProjects(this.milestoneId);
    this.getAllMileStones();
    this.getAllTeams();
    this.getTaskMileStoneEmployeeByTaskId(this.Id);
    this.lstTaskMileStoneEmployeeVM = [];
  }
  // getAllProjects(milestoneId:number) {
  //   milestoneId = this.milestoneId;
  //   console.log( "mile",milestoneId);
  //   this.taskService.GetProjectsByMileStoneId(milestoneId).subscribe(data => {
  //     this.lstProjects = data;
  //   })
  // }
  getTaskById(id: number) {
    this.taskService.GetTaskById(id).subscribe(
      (data => {
        this.TaskObj = data;
        this.milestoneId = this.TaskObj.mileStoneId;
        this.taskService.GetProjectsByMileStoneId(this.milestoneId).subscribe(data => {
          this.lstProjects = data;
          this.TaskObj.projectId = data[0]["id"];
        })
      }),
      (error => console.log(error))
    )
  }
  getAllMileStones() {
    this.taskService.GetListMileStones().subscribe(data => {
      this.lstMileStones = data;
    })
  }
  getAllTeams() {
    this.projectService.GetTeams().subscribe(data => {
      this.lstTeams = data;
    })
  }
  getTaskMileStoneEmployeeByTaskId(taskId: number) {
    this.taskService.GetListTaskMileStoneEmployeeByTaskId(taskId).subscribe(
      (data => {
        this.ListTaskMileStoneEmployees = data;
      }),
      (error => console.log(error))
    )
  }

  onTeamChange($event) {
    let text = $event.target.options[$event.target.options.selectedIndex].text;
    this.teamId = $event.target.value;
    this.teamName = text;
    this.lstEmployees = [];
    this.projectService.GetEmployeesByTeamId($event.target.value).subscribe(data => {
      this.lstEmployees = data;
    })
  }
  addRow() {
    for (var i = 0; i < this.lstEmployees.length; i++) {
      if (this.lstEmployees[i].checked) {
        this.newDynamic = {
          employeename: this.lstEmployees[i].name,
          teamName: this.teamName,
          teamId: this.teamId,
          employeeId: this.lstEmployees[i].id
        };
        this.dynamicArray.push(this.newDynamic);
      }
    }
  }

  deleteRow(index) {
    if (this.dynamicArray.length == 1) {
      this.toastr.error("Can't delete the row when there is only one row", 'Warning');
      return false;
    } else {
      this.dynamicArray.splice(index, 1);
      this.toastr.warning('Row deleted successfully', 'Delete row');
      return true;
    }
  }

  addStartDate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.dtStartDate = this.datepipe.transform(event.value, 'yyyy-MM-dd');
  }
  addEndDate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.dtEndDate = this.datepipe.transform(event.value, 'yyyy-MM-dd');
  }
  submitTeamEmployees() {
    for (var i = 0; i < this.dynamicArray.length; i++) {
      const Obj = new TaskMileStoneEmployee();
      Obj.milestoneId = Number(this.TaskObj.mileStoneId);
      Obj.employeeId = Number(this.dynamicArray[i].employeeId);
      Obj.taskId = Number(this.Id);
      this.lstTaskMileStoneEmployeeVM.push(Obj);
    }

    this.taskService.CreateTaskMileStoneEmployees(this.lstTaskMileStoneEmployeeVM).subscribe(
      (data => {

        this.toastr.success("Item Added Successfully", "Create");
      }),
      (err => {
        console.log(err);
        this.toastr.error("An Error Occured", "Error");
      }));

    this.lstTaskMileStoneEmployeeVM = [];


    this.getTaskById(this.Id);
    this.getTaskMileStoneEmployeeByTaskId(this.Id);
  }


  DeleteTaskMileStoneEmployee(taskMileStoneEmployeeId: number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.taskService.DeleteTaskMileStoneEmployee(taskMileStoneEmployeeId).subscribe(data => {
          this.toastr.success("Item is Deleted Successfully", "Delete");
        }
        );
      },
      reject: () => {
      }
    });
  }

  SubmitData() {
    this.TaskObj.startDate = this.datepipe.transform(this.TaskObj.startDate, 'yyyy-MM-dd');
    this.TaskObj.endDate = this.datepipe.transform(this.TaskObj.endDate, 'yyyy-MM-dd');
    this.taskService.CreateTask(this.TaskObj).subscribe(
      (data => {
        //this.route.navigate(['/tasks']);

        this.toastr.success("Item Saved Successfully", "Create");
      }),
      (err => {
        this.toastr.error("An Error Occured", "Error");
      }));

    this.getTaskById(this.Id);
    this.getTaskMileStoneEmployeeByTaskId(this.Id);

  }
}
export class DynamicGrid2 {
  employeename: string;
  employeeId: string;
  teamName: string;
}