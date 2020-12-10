import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LogInVM } from 'Models/UserVM';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'Services/user.service';
import { GlobalVariables } from 'Helpers/GlobalVariables'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  //  styleUrls: ['./login.component.css'],

})
export class LoginComponent implements OnInit {

  form: FormGroup;                    // {1}
  private formSubmitAttempt: boolean; // {2}
  userObj: LogInVM;
  constructor(private fb: FormBuilder, private userService: UserService, private toastr: ToastrService, private route: Router) { }

  ngOnInit() {
    this.form = this.fb.group({     // {5}
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.userObj = {
      email: '', password: '', userId: 0
    }
  }

  // isFieldInvalid(field: string) { // {6}
  //   return (
  //     (!this.form.get(field).valid && this.form.get(field).touched) ||
  //     (this.form.get(field).untouched && this.formSubmitAttempt)
  //   );
  // }

  onSubmit() {
    this.userService.LogIn(this.userObj).subscribe(logged => {




      if (logged["username"] != null && logged["roleName"] != null && logged["email"] != null && logged["userId"] != null) {
        localStorage.setItem("userId", logged["userId"]);
        localStorage.setItem("roleName", logged["roleName"]);
        localStorage.setItem("userName", logged["username"]);


        // GlobalVariables.userName = logged["username"];
        // GlobalVariables.userId = logged["userId"];
        // GlobalVariables.roleName = logged["roleName"];

        this.route.navigate(['/dashboard']);
      }
      else {
        this.toastr.show("Invalid username or password");
      }
    });
  }

}
