import { Component, OnInit } from '@angular/core';
import { UserService } from 'Services/user.service';
import { RegisterUserVM } from 'Models/UserVM';
import { ToastrService } from 'ngx-toastr';
import { RoleService } from 'Services/role.service';
import { ListRoleVM } from 'Models/RoleVM';
import { TeamService } from 'Services/team.service';
import { ListTeamVM } from 'Models/TeamVM';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private userService: UserService,private roleService: RoleService,
    private teamService: TeamService,
    private toastr: ToastrService,private route:Router) { }

  userObj: RegisterUserVM;
  lstRoles:ListRoleVM[];
  lstTeams :ListTeamVM[];
  ngOnInit(): void {
    this.userObj={
      email:'',password:'',username:'',teamId:0
    }
    this. getAllRoles();
    this.getAllTeams();
  }
  getAllRoles()
  {
      this.roleService.GetRoles().subscribe(items => {
        this.lstRoles=items;
    });
  }
  getAllTeams()
  {
      this.teamService.GetTeams().subscribe(items => {
        this.lstTeams=items;
    });
  }
  submitForm() {
    this.userService.RegisterUser(this.userObj).subscribe(item => {
      this.route.navigate(['/userroles']);
      this.toastr.show("User Created", "Add new user");
    });
  }
}
