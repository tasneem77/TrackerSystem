import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateRoleVM } from 'Models/RoleVM';
import { RoleService } from 'Services/role.service';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent implements OnInit {

  constructor(private roleService: RoleService,private route : Router) { }
  roleObj: CreateRoleVM;
  ngOnInit(): void {
    this.roleObj={Name:''}
  }
  submitForm() {
    this.roleService.CreateRole(this.roleObj).subscribe(item => {
      this.route.navigate(['/roles']);
    });
  }

}
