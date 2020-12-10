import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditClientVM } from 'Models/ClientVM';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from 'Services/client.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {


  Id: number;
  ClientObj: EditClientVM;
  constructor(private clientService: ClientService, private toastr: ToastrService,
    private activeRoute: ActivatedRoute, private route: Router) { }

  ngOnInit(): void {
    let id = this.activeRoute.snapshot.params["id"];
    this.clientService.GetClientById(id).subscribe(
      (data => {
        this.ClientObj = data;
      }),
      (error => console.log(error))
    );
  }
  submitForm() {
    this.clientService.UpdateClient(this.ClientObj).subscribe(
      (data => {
        this.route.navigate(['/clients']);
        this.toastr.success("Item Updated Successfully", "Update");
      }),
      (err => {
        this.toastr.error("An Error Occured", "Error");
      }))


  }

}
