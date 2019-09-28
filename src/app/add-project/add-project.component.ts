import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataserviceService } from '../dataservice.service';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
 
  form: FormGroup;
  public projectName:string="";
  public setDate:boolean;
  public startDate:any;
  public endDate:any;
  public projList:any[];
  public showValidation:boolean=false;
  public dateValidation:boolean=false;
  public isUpdate:boolean=false;
  public sortBy:string="StartDate";
  public searchText:string="";
  public managerName:string="";
  public projectPriority=0;
  public presentProjIdentity:number;
  constructor(private fb: FormBuilder,private service:DataserviceService,private datePipe: DatePipe ) { }

  ngOnInit() {
    this.form =this.fb.group({
      projectName:['',Validators.required],
      managerName:['',Validators.required],
      setDate:[],
      startDate:[],
      endDate:[],
      projectPriority:[]
    })
  
   this.AssignDate();
   this.GetProjects();
  }

  AssignDate()
  {
    console.log('called');
    this.startDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate()+1);
    this.endDate=this.datePipe.transform(tomorrow, 'yyyy-MM-dd');
    this.form.get('startDate').disable();
    this.form.get('endDate').disable();
    console.log("Check box value- "+this.form.value);
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
    //||this.form.get('managerName').errors
    if(this.form.get('projectName').errors||this.dateValidation)
    {
        this.showValidation=true;
       
    }
        else{   
          //this.form.get('managerName').value
          this.service.Addproject(this.form.get('projectName').value,null,this.form.get('startDate').value,this.form.get('endDate').value,this.projectPriority).subscribe(x=>{this.GetProjects();});
          this.OnResetFields();
         
          console.log(this.form.value);
        }
    // console.log(this.form.get('Fname').errors);
    // console.log(this.form.get('Fname').value);
  }

  OnResetFields()
  {
    this.form.get('projectName').reset();
    this.form.get('managerName').reset();
    this.form.get('projectPriority').reset();
    this.form.get('setDate').reset();
    this.projectPriority=0;
    this.form.get('startDate').disable();
    this.form.get('endDate').disable();
    this.showValidation=false;   
    this.dateValidation=false;

  }

  OnChange(input:number)
  {
    this.projectPriority=input;
  }
  checkValue(checkValue:number)
  {
    if(checkValue==1)
    {
      this.form.get('startDate').enable();
      this.form.get('endDate').enable();     
    
    }

    else
    {
      this.form.get('startDate').disable();
      this.form.get('endDate').disable();
    }
  }
  OnDateChange()
  {
    console.log('calling');
    if(this.startDate>this.endDate)
       this.dateValidation=true;
       else
       this.dateValidation=false;
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
  Delete(Project_ID:number)
  {
    
    this.service.DeleteProject(Project_ID).subscribe(x=>{
      this.GetProjects();
    });
    
  }

  Edit(Project_ID:number)
  {
    this.isUpdate=true;
    this.presentProjIdentity=Project_ID;
    this.service.GetProjById(this.presentProjIdentity).subscribe(x=>{
      
      this.projectName=x.ProjectName;
      this.projectPriority=x.priority;
      this.startDate = this.datePipe.transform(x.StartDate, 'yyyy-MM-dd');
      this.endDate=this.datePipe.transform(x.EndDate, 'yyyy-MM-dd');
    
    });
    
  }

  OnUpdate(){
    this.isUpdate=false;
    this.service.UpdateProjById(this.presentProjIdentity,this.projectName,this.projectPriority,this.startDate,this.endDate).subscribe(x=>{this.GetProjects()});
    this.OnResetFields();
  }

  SearchByText(inputVal:string)
  {
     if(inputVal.trim()!="")
       this.projList=this.projList.filter(x=>x.ProjectName==inputVal||x.priority==inputVal||x.StartDate==inputVal||x.EndDate==inputVal);
      else
      this.GetProjects();
    //this.usersList=this.usersList.forEach(x=>x.FirstName==inputVal||x.Lastname==inputVal||x.Employee_ID==inputVal);
  }
}


