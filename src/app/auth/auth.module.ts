import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{ FormsModule } from '@angular/forms'
import {HttpClientModule} from '@angular/common/http'
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [LoginComponent,DashboardComponent],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    HttpClientModule
  ],
  providers: [AuthService,AuthGuard]
})
export class AuthModule { }
