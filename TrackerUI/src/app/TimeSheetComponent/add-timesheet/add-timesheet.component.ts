import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ListEmployeeVM } from 'Models/EmployeeVM';
import { ListTaskVM } from 'Models/TaskVM';
import { CreateTimeSheetVM, ListStatusVM } from 'Models/TimeSheetVM';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'Services/employee.service';
import { TaskService } from 'Services/task.service';
import { TimeSheetService } from 'Services/timesheet.service';

@Component({
  selector: 'app-add-timesheet',
  templateUrl: './add-timesheet.component.html',
  styleUrls: ['./add-timesheet.component.css']
})
export class AddTimesheetComponent implements OnInit {


  editorConfig: AngularEditorConfig = {
    editable: true,
    // spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    showToolbar: true,
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    toolbarPosition: 'top',
  };
  TimeSheetObj: CreateTimeSheetVM;
  lstEmployees: ListEmployeeVM[];
  lstTasks: ListTaskVM[];
  lstStatus: ListStatusVM[];
  constructor(private timeSheetService: TimeSheetService,
    private taskService: TaskService,
    private employeeService: EmployeeService,
    private toastr: ToastrService,
    private route:Router,
    public datepipe: DatePipe) {
    this.TimeSheetObj = {
      title: '',comment: '',
      startDate: '', endDate: '',
      startTime: '', endTime: '',
      completePercent: 0, employeeId:0,statusId:0,taskId:0
    }
  }

  ngOnInit(): void {
    this.getAllTasks();
    this.getAllEmployees();
    this.  getAllStatus();
  }

  getAllTasks() {
    this.taskService.GetTasks().subscribe(data => {
      this.lstTasks = data;
    })
  }

  getAllEmployees() {
    this.employeeService.GetEmployees().subscribe(data => {
      this.lstEmployees = data;
    })
  }

  getAllStatus() {
    this.timeSheetService.GetStatus().subscribe(data => {
      this.lstStatus = data;
    })
  }


    
  submitForm() {
    this.TimeSheetObj.startDate = this.datepipe.transform(this.TimeSheetObj.startDate, 'yyyy-MM-dd');
    this.TimeSheetObj.endDate = this.datepipe.transform(this.TimeSheetObj.endDate, 'yyyy-MM-dd');
    this.TimeSheetObj.taskId = Number(this.TimeSheetObj.taskId);
    this.TimeSheetObj.employeeId = Number(this.TimeSheetObj.employeeId);
    this.TimeSheetObj.statusId = Number(this.TimeSheetObj.statusId);
    this.TimeSheetObj.startTime =  this.TimeSheetObj.startTime +":00";
    this.TimeSheetObj.endTime =  this.TimeSheetObj.endTime +":00"
    this.timeSheetService.CreateTimeSheet(this.TimeSheetObj).subscribe(
      (data => {
        this.route.navigate(['/timesheets']);
        this.toastr.success("Data is  saved successfully","Saved");
   }),
      (err => {
        console.log(err);
        this.toastr.error("An Error Occured", "Error");
      }))


  }
}
