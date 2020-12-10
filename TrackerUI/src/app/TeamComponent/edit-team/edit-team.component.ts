import { Component, OnInit } from '@angular/core';
import { ActivatedRoute ,Router} from '@angular/router';
import { EditTeamVM } from 'Models/TeamVM';
import { ToastrService } from 'ngx-toastr';
import { TeamService } from 'Services/team.service';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.css']
})
export class EditTeamComponent implements OnInit {

  
  Id:number;
  TeamObj : EditTeamVM;
  constructor(private teamService : TeamService,  private toastr: ToastrService,
    private activeRoute : ActivatedRoute,private route : Router) { }

  ngOnInit(): void {
    let id = this.activeRoute.snapshot.params["id"];
    this.teamService.GetTeamById(id).subscribe(
      (data => {
        this.TeamObj = data;
      this.Id =  this.TeamObj.Id;
      }),
      (error => console.log(error))
    );  
  }

  
  submitData()
  {
  
    this.teamService.UpdateTeam(this.TeamObj).subscribe(
    (data => 
      
      {this.route.navigate(['/teams']);
     this.toastr.success("Item Added Successfully" , "Update");
      }),
    (err => { 
      this.toastr.error("An Error Occured" , "Error");
    })
    )
   

  }
}
