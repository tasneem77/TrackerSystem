import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ListProjectEmployeeVM } from 'Models/EmployeeVM';
import { ListMileStoneVM, ListTaskMileStoneEmployees, TaskMileStoneEmployee } from 'Models/MileStoneVM';
import { ListProjectVM } from 'Models/ProjectVM';
import { CreateTaskVM } from 'Models/TaskVM';
import { ListTeamVM } from 'Models/TeamVM';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { MileStoneService } from 'Services/milestone.service';
import { ProjectService } from 'Services/project.service';
import { TaskService } from 'Services/task.service';
import { DynamicGrid2 } from '../edit-task/edit-task.component';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {



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
  TaskObj: CreateTaskVM;
  lstMileStones: ListMileStoneVM[];
  lstTeams: ListTeamVM[];
  lstProjects: ListProjectVM[];
  lstEmployees: ListProjectEmployeeVM[];
  lstTaskMileStoneEmployeeVM: TaskMileStoneEmployee[];
  ListTaskMileStoneEmployees: ListTaskMileStoneEmployees[];
  dtStartDate: string; dtEndDate: string;
  dynamicArray: Array<DynamicGrid2> = [];
  newDynamic: any = {};
  lstTableRows: any;
  teamId: number;
  teamName: String;
  projectStartTime: string
  projectStartDate: string
  projectEndDate: string
  ProjectId: number;
UserId:any;
  constructor(private taskService: TaskService,
    private confirmationService: ConfirmationService,
    private projectService: ProjectService,
    private mileStoneService: MileStoneService,
    private toastr: ToastrService,
    // private activeroute: ActivatedRoute,
    // private route: Router,
    public datepipe: DatePipe) {

    this.TaskObj = {
      title: '',
      startDate: '', endDate: '',
      startTime: '', endTime: '',
      mileStoneId: 0, brief: ''
    }
  }

  ngOnInit(): void {
    //this.getAllMileStones();
    //this.getAllTeams();
    this.UserId = Number( localStorage.getItem("userId"));
    this.getAllProjects();
    this.lstTaskMileStoneEmployeeVM = [];
   // localStorage.clear();
  }
  getTaskById(id: number) {
    this.taskService.GetTaskById(id).subscribe(
      (data => {
        this.TaskObj = data;
      }),
      (error => console.log(error))
    )
  }

  getAllProjects() {
    this.projectService.GetProjects( this.UserId).subscribe(data => {
      this.lstProjects = data;
    })
  }
  // onProjectChange($event) {
  //   this.mileStoneService.GetListMileStonesByProjectId($event.target.value).subscribe(data => {
  //     this.lstMileStones = data;
  //   })
  // }

  onProjectChange(value) {
    this.ProjectId = value;
    this.mileStoneService.GetListMileStonesByProjectId(value).subscribe(data => {
      this.lstMileStones = data;
    });

    let rbId = localStorage.getItem("rbId");
    if (localStorage.getItem("rbId") == "" || localStorage.getItem("rbId") == null) {
      localStorage.setItem("rbId", "1");
      rbId = localStorage.getItem("rbId");
    }
    else
      rbId = localStorage.getItem("rbId");

    this.lstTeams =[];
    if (rbId == "1") {
      this.taskService.ListTeamsByProjectId(value).subscribe(data2 => {
        this.lstTeams = data2;
      })
    }
    if (rbId == "2") {
      this.taskService.ListTeamsNotINProjectId(value).subscribe(data3 => {
        this.lstTeams = data3;
      })
    }


  }

  selectedLink: number
  setradio(e: number): void {
   // this.selectedLink = e;

    localStorage.setItem("rbId", e.toString())

    //this.lstTeams:ListTeamVM[] = [];
    if(e.toString()  == "1")
    {
      this.taskService.ListTeamsByProjectId(e).subscribe(data2 => {
        this.lstTeams = data2;
      });
    }
    if(e.toString()  == "2")
    {
      this.taskService.ListTeamsNotINProjectId(e).subscribe(data3 => {
        this.lstTeams = data3;
      });
    }
  }
  // getAllTeams() {
  //   this.projectService.GetTeams().subscribe(data => {
  //     this.lstTeams = data;
  //   })
  // }

  // getAllTeamsByProjectId() {
  //   this.taskService.ListTeamsByProjectId(this.ProjectId).subscribe(data => {
  //     this.lstTeams = data;
  //   })
  // }
  onTeamChange(value) {
     this.lstEmployees = [];
    this.projectService.GetEmployeesByTeamId(value).subscribe(data => {
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



  submitForm() {
    this.TaskObj.startDate = this.datepipe.transform(this.TaskObj.startDate, 'yyyy-MM-dd');
    this.TaskObj.endDate = this.datepipe.transform(this.TaskObj.endDate, 'yyyy-MM-dd');
    this.TaskObj.mileStoneId = Number(this.TaskObj.mileStoneId);
    this.taskService.CreateTask(this.TaskObj).subscribe(
      (data => {
        localStorage.setItem('taskId', data.toString());
        for (var i = 0; i < this.dynamicArray.length; i++) {
          const Obj = new TaskMileStoneEmployee();
          Obj.milestoneId = Number(this.TaskObj.mileStoneId);
          Obj.employeeId = Number(this.dynamicArray[i].employeeId);
          Obj.taskId = Number(localStorage.getItem('taskId'));
          this.lstTaskMileStoneEmployeeVM.push(Obj);
        }

        this.taskService.CreateTaskMileStoneEmployees(this.lstTaskMileStoneEmployeeVM).subscribe(
          (data => {
            this.toastr.success("Item Added Successfully", "Create");
          }),
          (err => {
            console.log(err);
            this.toastr.error("An Error Occured", "Error");
          }))
      }),
      (err => {
        console.log(err);
        this.toastr.error("An Error Occured", "Error");
      }))


  }

}
