import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateMileStoneVM } from 'Models/MileStoneVM';
import { ListProjectVM } from 'Models/ProjectVM';
import { ToastrService } from 'ngx-toastr';
import { MileStoneService } from 'Services/milestone.service';
import { ProjectService } from 'Services/project.service';

@Component({
  selector: 'app-add-mile-stone',
  templateUrl: './add-mile-stone.component.html',
  styleUrls: ['./add-mile-stone.component.css']
})
export class AddMileStoneComponent implements OnInit {
  MileStoneObj: CreateMileStoneVM;
  lstProjects: ListProjectVM[];
  teamId: number;
  teamName: String;
  projectStartTime: string;
  projectStartDate: string;
  projectEndDate: string;
  projectId: any;

  constructor(private mileStoneService: MileStoneService, private projectService: ProjectService,
    private toastr: ToastrService, private router: Router,
    private activeroute: ActivatedRoute,
    public datepipe: DatePipe) {
    this.MileStoneObj = {
      Title: '', Description: '',
      StartDate: '', EndDate: '',
      StartTime: '', EndTime: '',
      ProjectId: 0
    }
  }
  ngOnInit(): void {
    this.getAllProjects();
    this.projectId = this.activeroute.snapshot.params["projectId"];
  }
  getAllProjects() {
    this.projectService.GetProjects(Number(localStorage.getItem("userId"))).subscribe(
      data => {
        this.lstProjects = data;
      }
    )
  }
  submitForm() {
    if (this.MileStoneObj.ProjectId == null || this.MileStoneObj.ProjectId.toString() == "") {
      alert("Please select project");
    }
    this.MileStoneObj.StartDate = this.datepipe.transform(this.MileStoneObj.StartDate, 'yyyy-MM-dd');
    this.MileStoneObj.EndDate = this.datepipe.transform(this.MileStoneObj.EndDate, 'yyyy-MM-dd');
    // this.MileStoneObj.ProjectId = Number(this.MileStoneObj.ProjectId);
    this.MileStoneObj.ProjectId = Number(this.projectId);

    this.mileStoneService.CreateMileStone(this.MileStoneObj).subscribe(
      (data => {
        this.router.navigate(['/milestones', this.projectId]);
        this.toastr.success("Item Added Successfully", "Create");
      }),
      (err => {
        console.log(err);
        this.toastr.error("An Error Occured", "Error");
      }))
  }
}
