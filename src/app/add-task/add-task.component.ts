import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataserviceService } from '../dataservice.service';
import { DatePipe } from '@angular/common';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  form: FormGroup;
  public projectName:string="";
  public setDate:boolean;
  public startDate:any;
  public endDate:any;
  public showValidation:boolean=false;
  public dateValidation:boolean=false;
  public isParentTask:boolean=false;
  public userName:string="";
  public parentTask:string="";
  public projectPriority=0;
  public projList:any;
  public usersList:any;
  public parentTaskList:any;
  public mdprojectName:string;
  public projSelected:any;
  public parentTaskSelected:any;
  public mduserName:string;
  public mdParentTask:string;
  closeResult: string;
  
  constructor(private fb: FormBuilder,private service:DataserviceService,private datePipe: DatePipe,private modalService: NgbModal) { }

  ngOnInit() {
    this.form =this.fb.group({
      projectName:['',Validators.required],
      taskName:['',Validators.required],
      setDate:[],
      startDate:[],
      endDate:[],
      projectPriority:[],
      userName:['',Validators.required],
      isParentTask:[],
      parentTask:['',Validators.required]
    })
    this.AssignDate();
    this.GetProjects();
    this.GetUsers(); 
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

  onAdd():void
  {
    if(this.isParentTask)
    {
  
      if(this.form.get('projectName').errors||this.form.get('taskName').errors)
      {
        this.showValidation=true;
       
      }

      else
      {
      this.projSelected=this.projList.filter(x=>x.ProjectName==this.projectName)
      console.log('task name is-'+this.form.get('taskName').value)
      this.service.AddParentTask(this.projSelected.Project_ID,this.form.get('taskName').value).subscribe();
     
      //this.service.AddParentTask(this.form.get('projectName').value,null,this.form.get('taskName').value).subscribe();
      this.OnResetFields();
         
      }
    }
    else
    {
     
    //||this.form.get('managerName').errors
        if(this.form.get('projectName').errors||this.form.get('taskName').errors||this.form.get('parentTask').errors||this.form.get('userName').errors||this.dateValidation)
        {
          console.log('Came here!')
        this.showValidation=true;       
        }
        else
        {   
         
          this.projSelected=this.projList.filter(x=>x.ProjectName==this.projectName);
          this.parentTaskSelected=this.parentTaskList.filter(x=>x.parent_task==this.parentTask)
          
          this.service.AddTask(this.projSelected[0].Project_ID,this.form.get('taskName').value,this.projectPriority,this.parentTaskSelected[0].parent_id,this.form.get('startDate').value,this.form.get('endDate').value).subscribe();
         
          this.OnResetFields();
         
          //console.log(this.form.value);
        }
    }
    // console.log(this.form.get('Fname').errors);
    // console.log(this.form.get('Fname').value);
  }
  OnDateChange()
  {
    console.log('calling');
    if(this.startDate>this.endDate)
       this.dateValidation=true;
       else
       this.dateValidation=false;
  }

  OnChange(input:number)
  {
    this.projectPriority=input;
  }
  OnResetFields()
  {
    this.form.get('projectName').reset();
    this.form.get('taskName').reset();
    this.form.get('projectPriority').reset();
    this.form.get('setDate').reset();
    this.form.get('parentTask').reset();
    this.form.get('userName').reset();
    this.projectPriority=0;
    
    this.showValidation=false;   
    this.dateValidation=false;
    this.AssignDate();

  }
  checkValue(checkValue:number)
  {
    if(checkValue==1)
    {
      this.form.get('projectPriority').disable();
    
      this.form.get('startDate').disable();
      this.form.get('endDate').disable();

      this.isParentTask=true;
    }

    else
    {
      this.form.get('projectPriority').enable();
     
      this.form.get('startDate').enable();
      this.form.get('endDate').enable();
     
      this.isParentTask=false;
    }
  }

  AssignDate()
  {
    console.log('called');
    this.startDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate()+1);
    this.endDate=this.datePipe.transform(tomorrow, 'yyyy-MM-dd');
    
  }
  GetUsers()
  {
    this.service.GetUsers().subscribe(userList=>
      {
      
      this.usersList=JSON.parse(JSON.stringify(userList))
      console.log('writing here -'+this.usersList.forEach(x=>{console.log(x)})); 
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

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.projectName=this.mdprojectName;
      this.userName=this.mduserName;
      this.parentTask=this.mdParentTask;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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
