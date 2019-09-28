import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../dataservice.service';
import { DatePipe } from '@angular/common';
import { NgbModal ,ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  public taskList:any;
  public projList:any;
  public parentTaskList:any;
  public sortBy:string="StartDate";
  public mdprojectName:string;
  public projectName:string="";
  public filterprojList:any;
  constructor(private service:DataserviceService,private datePipe: DatePipe,private modalService: NgbModal) { }

  ngOnInit() {
   
    this.GetProjects();
    this.GetParentTasks();
  }
  GetProjects()
  {
    this.service.GetProjects().subscribe(projList=>
      {
      
      this.projList=JSON.parse(JSON.stringify(projList))
      console.log('writing here -'+this.projList.forEach(x=>{console.log(x)})); 
      }
      );
  }
  GetParentTasks()
  {
    this.service.GetParentTasks().subscribe(parentTaskList=>
      {
      
      this.parentTaskList=JSON.parse(JSON.stringify(parentTaskList))
      console.log('writing here -'+this.parentTaskList.forEach(x=>{console.log(x)})); 
      }
      );
  }

  GetTasks()
  {
    this.service.GetTasks().subscribe(taskList=>
    {
    
    this.taskList=JSON.parse(JSON.stringify(taskList))
    console.log('writing here -'+this.taskList.forEach(x=>{console.log(x)})); 
    }
    );

  }
  GetTasksById(taskid:number)
  {
    this.service.GetTasksById(taskid).subscribe(taskList=>
      {
      
      this.taskList=JSON.parse(JSON.stringify(taskList))
      console.log('writing here -'+this.taskList.forEach(x=>{console.log(x)})); 
      }
      );
  }
  SortByStartDate()
  {
    this.sortBy="StartDate";
  }
  SortByEndDate()
  {
    this.sortBy="EndDate";
  }
  SortByPriority()
  {
    this.sortBy="priority";
  }

  EndStatus(taskId:number)
  {
    this.service.UpdateStatusOfTask(taskId).subscribe(); 
    this.GetTasks();
  

  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.projectName=this.mdprojectName;
      this.filterprojList= this.projList.filter(x=>x.ProjectName==this.projectName);
      this.GetTasksById(this.filterprojList[0].Project_ID);
    }, (reason) => {
      
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
