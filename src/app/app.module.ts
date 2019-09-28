import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule,ReactiveFormsModule,FormGroup,Validators} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import {HttpClientModule} from '@angular/common/http';
import { OrderModule } from 'ngx-order-pipe';
import { DatePipe } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

 

@NgModule({
  declarations: [
    AppComponent,
    AddProjectComponent,
    AddTaskComponent,
    AddUserComponent,
    ViewTaskComponent
    
 
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule  ,
    ReactiveFormsModule,
    HttpClientModule,
    OrderModule,
    NgbModule
    
    
  ],

  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
