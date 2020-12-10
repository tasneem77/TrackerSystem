import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListProblemVM } from 'Models/ProblemVM';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { ProblemService } from 'Services/problem.service';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-list-problems',
  templateUrl: './list-problems.component.html',
  styleUrls: ['./list-problems.component.css']
})
export class ListProblemsComponent implements OnInit {

  dtOptions: any = {};
  dtTrigger= new Subject();
  lstProblems:ListProblemVM[];
  constructor(private problemService:ProblemService,
    private confirmationService:ConfirmationService,
    private toastr : ToastrService,
    private route : Router
    ) { }

  ngOnInit(): void {
    this. getAllProblems();

    this.dtOptions = {
        pagingType: 'numbers',
        pageLength:10,
        responsive: true,
        lengthMenu: [[10, 25, 50,100, -1], [10, 25, 50,100, "All"]]
      }; 
  }


  getAllProblems() {
    this.problemService.GetProblems().subscribe(
      data => {
        this.lstProblems = data;
        this.dtTrigger.next();
      }
    )
  }

  DeleteProblem(id: number)
  {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.problemService.DeleteProblem(id).subscribe(data=>{
         this.route.navigate(['/problems'])
          this.toastr.success("Team is Deleted Successfully","Delete");
          this.getAllProblems();
        }
      );
      },
      reject: () => {
        this.toastr.error("Error occured","Error");
      }
  });
  }

}
