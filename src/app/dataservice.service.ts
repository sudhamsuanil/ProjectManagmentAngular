import { Injectable } from '@angular/core';
import {HttpClient,HttpRequest,HttpResponse,HttpParams, HttpHeaders} from '@angular/common/http';
import {Users} from './add-user/user.model';
import {Project} from './add-project/project.model';
import { Observable } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';
import { ParentTask } from './add-task/parentTask.model';
import { Task } from './add-task/task.model';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  protected apiServer="http://localhost:50188/";
  public usr:Users=new Users();
  public proj:Project=new Project();
  public pTask:ParentTask=new ParentTask();

  public task:Task=new Task();
  constructor(private http:HttpClient) { 
    console.log('trying to connect to the host:'+this.apiServer);
  }

  Addproject(projectName:string,managerName:string,startDate:Date,endDate:Date,priority:number)
  {

    this.proj.ProjectName=projectName;
    this.proj.StartDate=startDate;
    this.proj.EndDate=endDate;
    this.proj.priority=priority;
    try{
      console.log('Trying to post to:' +(this.apiServer+"api/ProjectManagment/AddProject"));
      return this.http.post<Project>((this.apiServer+"api/ProjectManagment/AddProject"),this.proj,{headers:new HttpHeaders({'Content-Type':'application/json'})});
    }
    catch(error)
    {
      console.log('I am here');
      console.log(error);
      return error;
    } 
  }
   Adduser(FirstName:string,Lastname:string,Employee_ID:string):Observable<Users>
  {
    
    this.usr.FirstName=FirstName;
    this.usr.LastName=Lastname;
    this.usr.Employee_ID=Employee_ID;

    try{
      console.log('Trying to post to:' +(this.apiServer+"api/ProjectManagment/AddUser"));
      return this.http.post<Users>((this.apiServer+"api/ProjectManagment/AddUser"),this.usr,{headers:new HttpHeaders({'Content-Type':'application/json'})});
    }
    catch(error)
    {
      console.log('I am here');
      console.log(error);
      return error;
    } 

    

  }
  AddTask(ProjectId:number,taskname:string,priority:number,parentId:number,startDate:Date,endDate:Date)
  {
    console.log('ProjectId'+ProjectId);
    console.log('parentId'+parentId);
    this.task.project_ID=ProjectId;
    this.task.parent_id=parentId;
    this.task.priority=priority;
    this.task.TaskName=taskname;
    this.task.Start_Date=startDate;
    this.task.End_Date=endDate;
    try{
      console.log('Trying to post to:' +(this.apiServer+"api/ProjectManagment/AddTask"));
      return this.http.post<Task>((this.apiServer+"api/ProjectManagment/AddTask"),this.task,{headers:new HttpHeaders({'Content-Type':'application/json'})});
    }
    catch(error)
    {
      console.log('I am here');
      console.log(error);
      return error;
    } 
  }
  UpdateUserById(Identity:bigint,FirstName:string,Lastname:string,Employee_ID:string):Observable<Users>
  {
    this.usr.FirstName=FirstName;
    this.usr.LastName=Lastname;
    this.usr.Employee_ID=Employee_ID;
    this.usr.user_id=Identity;

    try{
      console.log('Trying to post to:' +(this.apiServer+"api/ProjectManagment/UpdateUser"));
      return this.http.post<Users>((this.apiServer+"api/ProjectManagment/UpdateUser"),this.usr,{headers:new HttpHeaders({'Content-Type':'application/json'})});
    }
    catch(error)
    {
      console.log('I am here');
      console.log(error);
      return error;
    } 
  }

  UpdateProjById(projId:number,projectName:string,priority:number,startDate:Date,endDate:Date)
  {
    this.proj.Project_ID=projId;
    this.proj.ProjectName=projectName;
    this.proj.StartDate=startDate;
    this.proj.EndDate=endDate;
    this.proj.priority=priority;

    try{
      console.log('Trying to post to:' +(this.apiServer+"api/ProjectManagment/UpdateProject"));
      return this.http.post<Users>((this.apiServer+"api/ProjectManagment/UpdateProject"),this.proj,{headers:new HttpHeaders({'Content-Type':'application/json'})});
    }
    catch(error)
    {
      console.log('I am here');
      console.log(error);
      return error;
    } 
  }
  AddParentTask(projId:number,taskName:string)
  {
    this.pTask.parent_id=projId;
    this.pTask.parent_task=taskName;
    try{
      console.log('Trying to post to:' +(this.apiServer+"api/ProjectManagment/AddParentTask"));
      return this.http.post<ParentTask>((this.apiServer+"api/ProjectManagment/AddParentTask"),this.pTask,{headers:new HttpHeaders({'Content-Type':'application/json'})});
    }
    catch(error)
    {
      
      console.log(error);
      return error;
    } 

  }
  GetProjects():Observable<Project[]>
    {
      try{
        console.log('Trying to Get to:' +(this.apiServer+"api/ProjectManagment/GetProjects"));
        return this.http.get<Project[]>(this.apiServer+"api/ProjectManagment/GetProjects");
      }
      catch(error)
      {
        console.log('I am here');
        console.log(error);
        return error;
      } 
    }
    GetTasks():Observable<Task[]>
    {
      try{
        console.log('Trying to Get to:' +(this.apiServer+"api/ProjectManagment/GetTasks"));
        return this.http.get<Task[]>(this.apiServer+"api/ProjectManagment/GetTasks");
      }
      catch(error)
      {
        console.log('I am here');
        console.log(error);
        return error;
      } 
    }
    GetTasksById(taskid:number):Observable<Task[]>
    {  try{
      console.log('Trying to Get to:' +(this.apiServer+"api/ProjectManagment/GetTaskById/"+taskid));
      return this.http.get<Task[]>(this.apiServer+"api/ProjectManagment/GetTaskById/"+taskid);
    }
    catch(error)
    {
      console.log('I am here');
      console.log(error);
      return error;
    } 

    }
    GetParentTasks():Observable<ParentTask[]>
    {
      try{
        console.log('Trying to Get to:' +(this.apiServer+"api/ProjectManagment/GetParentTasks"));
        return this.http.get<ParentTask[]>(this.apiServer+"api/ProjectManagment/GetParentTasks");
      }
      catch(error)
      {
        console.log('I am here');
        console.log(error);
        return error;
      } 
    }
  GetUsers():Observable<Users[]>
    {
      try{
        console.log('Trying to Get to:' +(this.apiServer+"api/ProjectManagment/GetUsers"));
        return this.http.get<Users[]>(this.apiServer+"api/ProjectManagment/GetUsers");
      }
      catch(error)
      {
        console.log('I am here');
        console.log(error);
        return error;
      } 
    }

    
    DeleteProject(projectIdentity:number)
    {
      try{
        console.log('Trying to Delete :' +(this.apiServer+"api/ProjectManagment/DeleteProject/"+projectIdentity));
        return this.http.delete(this.apiServer+"api/ProjectManagment/DeleteProject/"+projectIdentity);
      }
      catch(error)
      {
        console.log('I am here');
        console.log(error);
        return error;
      } 
    }
    DeleteUser(employeeIdentity:bigint)
    {
      try{
        console.log('Trying to Delete :' +(this.apiServer+"api/ProjectManagment/DeleteUser/"+employeeIdentity));
        return this.http.delete(this.apiServer+"api/ProjectManagment/DeleteUser/"+employeeIdentity);
      }
      catch(error)
      {
        console.log('I am here');
        console.log(error);
        return error;
      } 

    }
    UpdateStatusOfTask(taskId:number)
    {
      try{
        console.log('Trying to Update status :' +(this.apiServer+"api/ProjectManagment/UpdateStatusOfTask/"+taskId));
        return this.http.post(this.apiServer+"api/ProjectManagment/UpdateStatusOfTask/"+taskId,{headers:new HttpHeaders({'Content-Type':'application/json'})});
      }
      catch(error)
      {
        console.log('I am here');
        console.log(error);
        return error;
      } 

    }
    GetUserById(employeeIdentity:bigint)
    {
      try{
        console.log('Trying to Get user bu Id :' +(this.apiServer+"api/ProjectManagment/GetUserById/"+employeeIdentity));
        return this.http.get<Users>(this.apiServer+"api/ProjectManagment/GetUserById/"+employeeIdentity);
      }
      catch(error)
      {
        console.log('I am here');
        console.log(error);
        return error;
      } 

    }

    GetProjById(Identity:number)
    {
      try{
        console.log('Trying to Get user bu Id :' +(this.apiServer+"api/ProjectManagment/GetProjById/"+Identity));
        return this.http.get<Project>(this.apiServer+"api/ProjectManagment/GetProjById/"+Identity);
      }
      catch(error)
      {
        console.log('I am here');
        console.log(error);
        return error;
      } 
    }
}
