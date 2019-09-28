import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators, Form,FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { DataserviceService } from '../dataservice.service';
import { Users } from './user.model';



@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  public firstName:string="";
  public lastName:string="";  
  public empId:string="";
  form: FormGroup;
  public usersList:any[];
  public userById:Users;
  public presentEmpIdentity:bigint;
  public showValidation:boolean=false;
  public isUpdate:boolean=false;
  public sortBy:string="FirstName";
  public searchText:string="";
  constructor(private fb: FormBuilder,private service:DataserviceService) { }

  ngOnInit() {
    this.form =this.fb.group({
      Fname:['',Validators.required],
      Lname:['',Validators.required],
      empId:['',Validators.required]
    })
    this.GetUsers();
    console.log(this.form.get('Fname'));
   
    
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
  // AddUser(firstName,lastName,empId)
  // {
  //  console.log("First Name is:" +firstName);
  //  console.log("First Name is:" +lastName);
  //  console.log("First Name is:" +empId);
   
  // }
  // AddUser(f)
  // {
  //  console.log(f.firstName.value);
 
   
  // }

  onAdd():void
  {
    if(this.form.get('Fname').errors||this.form.get('Lname').errors||this.form.get('empId').errors)
        this.showValidation=true;
        else{
    this.service.Adduser(this.form.get('Fname').value,this.form.get('Lname').value,this.form.get('empId').value).subscribe(x=>{ this.GetUsers();});
 
    this.form.reset();
    
    // console.log(this.form.value);
    // console.log(this.form.get('Fname').errors);
    // console.log(this.form.get('Fname').value);
  }
}

  OnResetFields()
  {
    console.log('here');
    this.form.reset();

  }
  Delete(identity:bigint)
  {
    
    this.service.DeleteUser(this.presentEmpIdentity).subscribe(x=>{
      this.GetUsers()
    });
    
  }

  Edit(identity:bigint)
  {
    this.isUpdate=true;
    this.presentEmpIdentity=identity;
    this.service.GetUserById(this.presentEmpIdentity).subscribe(x=>{
      console.log('FirstName '+x.FirstName);
      this.firstName=x.FirstName;
      this.lastName=x.Lastname;
      this.empId=x.Employee_ID;
    
    });
    
  }
  OnUpdate(){
    this.isUpdate=false;
    this.service.UpdateUserById(this.presentEmpIdentity,this.firstName,this.lastName,this.empId).subscribe(x=>{this.GetUsers()});
    this.form.reset();
  }
  
  SortByFirstName()
  {
    this.sortBy="FirstName";
  }
   
  SortByLastName()
  {
    this.sortBy="Lastname";
  }
   
  SortByEmpId()
  {
    this.sortBy="Employee_ID";
  }

  SearchByText(inputVal:string)
  {
     if(inputVal.trim()!="")
       this.usersList=this.usersList.filter(x=>x.FirstName==inputVal||x.Lastname==inputVal||x.Employee_ID==inputVal);
      else
      this.GetUsers();
    //this.usersList=this.usersList.forEach(x=>x.FirstName==inputVal||x.Lastname==inputVal||x.Employee_ID==inputVal);
  }
}
