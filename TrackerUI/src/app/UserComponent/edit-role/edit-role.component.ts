import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditRoleVM } from 'Models/RoleVM';
import { ToastrService } from 'ngx-toastr';
import { RoleService } from 'Services/role.service';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.css']
})
export class EditRoleComponent implements OnInit {

  constructor(private roleService: RoleService, private toastr: ToastrService,
    private activeRoute : ActivatedRoute,private route : Router) { }
  roleObj: EditRoleVM;
  ngOnInit(): void {
    let id = this.activeRoute.snapshot.params["id"];
    this.roleService.GetRoleById(id).subscribe(
      (data => {
        this.roleObj = data;

      }),
      (error => console.log(error))
    );  
  }

  submitForm() {
    this.roleService.UpdateRole(this.roleObj).subscribe(item => {
      this.route.navigate(['/roles']);
    });
  }
}
