import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateClientVM } from 'Models/ClientVM';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from 'Services/client.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  ClientObj: CreateClientVM;

  constructor(private clientService: ClientService,
    private toastr: ToastrService, private route: Router) {
    this.ClientObj = { name: "",  mobile: '', email: "",contactPerson:''}
  }

  ngOnInit(): void {

  }
  submitForm() {
    this.clientService.CreateClient(this.ClientObj).subscribe(
      (data => {
        this.route.navigate(['/clients']);
        this.toastr.success("Item Saved Successfully", "Create");
      }),
      (err => {
        console.log(err)
        this.toastr.error("An Error Occured", "Error");
      })
    )
  }


  

}
