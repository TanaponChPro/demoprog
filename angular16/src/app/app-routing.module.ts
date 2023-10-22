import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmployeeComponent } from './employee/employee.component';
import { DepartmentComponent } from './department/department.component';
import { DeviceComponent } from './device/device.component';
import { AdminComponent } from './admin/admin.component';
import { AddEditJobComponent } from './admin/add-edit-job/add-edit-job.component';
// import { ShowJobComponent } from './admin/show-job/show-job.component';
// import { ImportFileComponent } from './admin/import-file/import-file.component';
import { MatTableFilterComponent } from './workshop/mat-table-filter/mat-table-filter.component';
import { MatPadSortFilComponent } from './workshop/mat-pad-sort-fil/mat-pad-sort-fil.component';
// import { TackjobComponent } from './tackjob/tackjob.component';
// import { HomeComponent } from './home/home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Dashboard1Component } from './dashboard/dashboard1/dashboard1.component';
import { Dashboard2Component } from './dashboard/dashboard2/dashboard2.component';
import { Dashboard3Component } from './dashboard/dashboard3/dashboard3.component';
// import { InputfromComponent } from './form/inputfrom/inputfrom.component';
// import { JoblistComponent } from './form/joblist/joblist.component';
// import { TackjobbpsComponent } from './tackjob/tackjobbps/tackjobbps.component';
// import { InputfrombpsComponent } from './form/inputfrombps/inputfrombps.component';
// import { MatDatepickerComponent } from './workshop/mat-datepicker/mat-datepicker.component';
// import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { PostsComponent } from './components/posts/posts.component';
import { AuthGuard } from './guard/auth-guard.service';
// import { TechnicGuard } from './guard/technic.guard';
import { ScanBarcodeComponent } from './workshop/scan-barcode/scan-barcode.component';
import { ZxingComponent } from './zxing/zxing.component';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {path: 'dashboard',component:DashboardComponent},
  {path: 'dashboard1',component:Dashboard1Component},
  {path: 'dashboard2',component:Dashboard2Component},
  {path: 'dashboard3',component:Dashboard3Component},
  // {path: 'home',component:HomeComponent},
  {path: 'employee',component:EmployeeComponent, canActivate:[AuthGuard, ]},
  {path: 'department',component:DepartmentComponent, canActivate:[AuthGuard, ]},
  {path: 'stock',component:DeviceComponent, canActivate:[AuthGuard, ]},
  {path: 'admin',component:AdminComponent, canActivate:[AuthGuard, ]},
  {path: 'admin/app-add-edit-job',component:AddEditJobComponent, canActivate:[AuthGuard, ]},
  {path: 'addedit-job/:postid', component:AddEditJobComponent,
    //resolve: { uid: AuthResolver } 
  },
  // {path: 'import-file',component:ImportFileComponent,canActivate:[AuthGuard, ]},
  {path: 'workshop',component:MatPadSortFilComponent},
  // {path: 'workshop-datepicker',component:MatDatepickerComponent}, 
  // {path: 'tackjob',component:TackjobComponent,canActivate:[AuthGuard, ]},
  // {path: 'tackjobbps',component:TackjobbpsComponent,canActivate:[AuthGuard, ]},
  // {path: 'inputform/:id/:jobno/:callfrom', component:InputfromComponent,canActivate:[AuthGuard, ]},
  // {path: 'inputformbps/:id/:jobno', component:InputfrombpsComponent,canActivate:[AuthGuard, ]},
  // {path: 'inputformbps', component:InputfrombpsComponent,canActivate:[AuthGuard, ]},
  // {path: 'inputformbps\:obj', component:InputfrombpsComponent,canActivate:[AuthGuard, ]},
  // {path: 'closejoblist', component:JoblistComponent,canActivate:[AuthGuard, ]},
  {path: 'posts', component:PostsComponent,canActivate:[AuthGuard, ]},
  {path: 'login', component:LoginComponent},
  {path: 'signup', component:SignupComponent},
  {path: 'scanbarcode', component:ScanBarcodeComponent},
  {path: 'zxingscanner/:id/:jobno', component:ZxingComponent},
  {path: '**', redirectTo: '/dashboard'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
