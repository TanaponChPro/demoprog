import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DepartmentComponent } from './department/department.component';
import { ShowDepComponent } from './department/show-dep/show-dep.component';
import { AddEditDepComponent } from './department/add-edit-dep/add-edit-dep.component';
import { EmployeeComponent } from './employee/employee.component';
import { ShowEmpComponent } from './employee/show-emp/show-emp.component';
import { AddEditEmpComponent } from './employee/add-edit-emp/add-edit-emp.component';
import { SharedService } from './shared.service';

import { HashLocationStrategy } from '@angular/common';
import { LocationStrategy } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DeviceComponent } from './device/device.component';
import { ShowDeviceComponent } from './device/show-device/show-device.component';
import { AddEditDeviceComponent } from './device/add-edit-device/add-edit-device.component';
import { AdminComponent } from './admin/admin.component';
import { ShowJobComponent } from './admin/show-job/show-job.component';
import { AddEditJobComponent } from './admin/add-edit-job/add-edit-job.component';
import { ImportFileComponent } from './admin/import-file/import-file.component';
import { ImportFileDetailComponent } from './admin/import-file-detail/import-file-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSliderModule } from '@angular/material/slider';
import { MatRadioModule } from '@angular/material/radio';
// import { MatTableFilterModule } from 'mat-table-filter';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MomentDateModule } from '@angular/material-moment-adapter';

import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
// import { NgxMaskModule, IConfig } from 'ngx-mask';

// import { ZXingScannerModule } from 'src/app/public_api';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

/* ------------------------- Component Object -----------------------------------------------------------------*/
import { MatTableFilterComponent } from './workshop/mat-table-filter/mat-table-filter.component';
import { MatPadSortFilComponent } from './workshop/mat-pad-sort-fil/mat-pad-sort-fil.component';
// import { ShowDeviceMatComponent } from './device/show-device-mat/show-device-mat.component';
import { TackjobComponent } from './tackjob/tackjob.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { MenuComponent } from './layout/menu/menu.component';
import { HomeComponent } from './home/home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Dashboard1Component } from './dashboard/dashboard1/dashboard1.component';
import { Dashboard2Component } from './dashboard/dashboard2/dashboard2.component';
import { Dashboard3Component } from './dashboard/dashboard3/dashboard3.component';
import { InputfromComponent } from './form/inputfrom/inputfrom.component';
import { JoblistComponent } from './form/joblist/joblist.component';
// import { TackjobbpsComponent } from './tackjob/tackjobbps/tackjobbps.component';
// import { InputfrombpsComponent } from './form/inputfrombps/inputfrombps.component';
import { MatDatepickerComponent } from './workshop/mat-datepicker/mat-datepicker.component';
import { ModelfilterComponent } from './tackjob/modelfilter/modelfilter.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
// import { PostsComponent } from './components/posts/posts.component';
// import { CreatePostComponent } from './components/create-post/create-post.component';
import { AuthInterceptorService } from "./services/auth-interceptor.service";
import { ScanBarcodeComponent } from './workshop/scan-barcode/scan-barcode.component';
import { ZXingScannerComponent } from './zxing/zxing-scanner/zxing-scanner.component';
import { ZxingComponent } from './zxing/zxing.component';
import { AppInfoDialogComponent } from './zxing/zxing-info-dialog/app-info-dialog.component';
import { AppInfoComponent } from './zxing/zxing-info/app-info.component';
import { FormatsDialogComponent } from './zxing/formats-dialog/formats-dialog.component';
import * as PlotlyJS from 'plotly.js/dist/plotly.js';
import { PlotlyModule } from 'angular-plotly.js';

// We have to supply the plotly.js module to the Angular
// library.
PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [
    AppComponent,
    DepartmentComponent,
    ShowDepComponent,
    AddEditDepComponent,
    EmployeeComponent,
    ShowEmpComponent,
    AddEditEmpComponent,
    DeviceComponent,
    ShowDeviceComponent,
    AddEditDeviceComponent,
    AdminComponent,
    ShowJobComponent,
    AddEditJobComponent,
    ImportFileComponent,
    ImportFileDetailComponent,
    MatTableFilterComponent,
    MatPadSortFilComponent,
    // ShowDeviceMatComponent,
    TackjobComponent,
    FooterComponent,
    HeaderComponent,
    MenuComponent,
    HomeComponent,
    DashboardComponent,
    Dashboard1Component,
    Dashboard2Component,
    Dashboard3Component,
    InputfromComponent,
    JoblistComponent,
    // TackjobbpsComponent,
    // InputfrombpsComponent,
    MatDatepickerComponent,
    ModelfilterComponent,
    NavigationComponent,
    SignupComponent,
    LoginComponent,
    // PostsComponent,
    // CreatePostComponent,
    ScanBarcodeComponent,
    ZXingScannerComponent,
    ZxingComponent,
    AppInfoDialogComponent,
    AppInfoComponent,
    FormatsDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CommonModule,

    // Material
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    MatSliderModule,
    MatRadioModule,
    MatTableModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MomentDateModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatListModule,
    MatMenuModule,
    MatTooltipModule,
    PlotlyModule,
    ZXingScannerModule, // This application depends upon a library published using Angular version 14.0.2, which requires Angular version 14.0.0 or newer to work correctly.
    // NgxMaskModule    // will born ERROR Error: Uncaught (in promise): NullInjectorError: R3InjectorError(AppModule)[InjectionToken config -> InjectionToken config -> InjectionToken config]:
    // NgxMaskModule.forRoot()
  ],
  providers: [
    SharedService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy }  //ทำให้กดปุม Reface and <- on browser ได้ ไม่ error 404
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
