import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreateTeamVM } from 'Models/TeamVM';
import { TeamService } from 'Services/team.service';


@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {

  TeamObj: CreateTeamVM;
  constructor(private teamService: TeamService, private toastr: ToastrService, private router: Router) {
    this.TeamObj = { Name: '' }
  }

  ngOnInit(): void {
  }

  submitForm() {
    this.teamService.CreateTeam(this.TeamObj).subscribe(
      (data => {
        this.router.navigate(['/teams']);
        this.toastr.success("Item Added Successfully", "Create");
      }),
      (err => {
        this.toastr.error("An Error Occured", "Error");
      }))
  }

}
