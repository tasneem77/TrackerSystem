import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { EditMileStoneVM } from 'Models/MileStoneVM';
import { ListProjectVM } from 'Models/ProjectVM';
import { ToastrService } from 'ngx-toastr';
import { MileStoneService } from 'Services/milestone.service';
import { ProjectService } from 'Services/project.service';

@Component({
  selector: 'app-edit-mile-stone',
  templateUrl: './edit-mile-stone.component.html',
  styleUrls: ['./edit-mile-stone.component.css']
})
export class EditMileStoneComponent implements OnInit {


  Id: number; dtStartDate: string; dtEndDate: string;
  MileStoneObj: EditMileStoneVM;
  lstProjects: ListProjectVM[];
  projectId: any;

  constructor(private mileStoneService: MileStoneService,
    private projectService: ProjectService,
    private toastr: ToastrService,
    private activeroute: ActivatedRoute,
    private router: Router,
    public datepipe: DatePipe) { }

  ngOnInit(): void {
    let id = this.activeroute.snapshot.params["id"];
    this.Id = id;
    this.getAllProjects();
    this.getMileStoneById(id);
  }
  getAllProjects() {
    this.projectService.GetProjects(Number(localStorage.getItem("userId"))).subscribe(
      data => {
        this.lstProjects = data;
      }
    )
  }
  getMileStoneById(id: number) {
    this.mileStoneService.GetMileStoneById(id).subscribe(
      (data => {
        this.MileStoneObj = data;
        this.MileStoneObj.startDate = this.datepipe.transform(data["startDate"], 'yyyy-MM-dd');
        this.MileStoneObj.endDate = this.datepipe.transform(data["endDate"], 'yyyy-MM-dd');
        this.projectId=data["projectId"]
      }),
      (error => console.log(error))
    )
  }
  addStartDate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.dtStartDate = this.datepipe.transform(event.value, 'yyyy-MM-dd');
  }
  addEndDate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.dtEndDate = this.datepipe.transform(event.value, 'yyyy-MM-dd');
  }
  SubmitData() {

    this.MileStoneObj.startDate = this.datepipe.transform(this.dtStartDate, 'yyyy-MM-dd');
    this.MileStoneObj.endDate = this.datepipe.transform(this.dtEndDate, 'yyyy-MM-dd');
    this.MileStoneObj.projectId = Number(this.MileStoneObj.projectId);
    
    this.mileStoneService.UpdateMileStone(this.MileStoneObj).subscribe(
      (data => {
        this.router.navigate(['/milestones', this.projectId]);
        this.toastr.success("Item Saved Successfully", "Edit");
      }),
      (err => {
        this.toastr.error("An Error Occured", "Error");
      }));
  }
}
