import { Component, OnInit,Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { FormGroup, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MAT_DATE_FORMATS } from '@angular/material/core';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

@Component({
  selector: 'app-add-edit-emp',
  templateUrl: './add-edit-emp.component.html',
  styleUrls: ['./add-edit-emp.component.css'],
  providers: [DatePipe, { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class AddEditEmpComponent implements OnInit {

  constructor(private service:SharedService, private datePipe: DatePipe) { }

  @Input() emp:any;
  ID:string="";
  EmployeeName:string="";
  Department:string="";
  RegistDate:string="";
  PhotoFileName:string="";
  PhotoFilePath:string="";
  DepartmentsList:any=[];

  ngOnInit(): void {
    // this.loadDepartmentList();

    this.ID=this.emp.ID;
    this.EmployeeName=this.emp.EmployeeName;
    this.Department=this.emp.Department;
    this.RegistDate=this.emp.RegistDate;
    this.PhotoFileName=this.emp.PhotoFileName;
    this.PhotoFilePath=this.service.PhotoUrl+this.PhotoFileName;
    console.log(this.emp);
  }

  loadDepartmentList(){
    this.service.getAllDepartmentNames().subscribe((data:any)=>{
      this.DepartmentsList=data;
    });
  }

  addEmployee(){
    var val = {
          ID:this.ID,
          EmployeeName:this.EmployeeName,
          Department:this.Department,
          RegistDate:this.RegistDate,
          PhotoFileName:this.PhotoFileName
    };

    this.service.addEmployee(val).subscribe(res=>{
      alert(res.toString());
    });
  }

  updateEmployee(){
    var val = {
            ID:this.ID,
            EmployeeName:this.EmployeeName,
            Department:this.Department,
            RegistDate:this.RegistDate,
            PhotoFileName:this.PhotoFileName
    };

    this.service.updateEmployee(this.ID,val).subscribe(res=>{
    alert(res.toString());
    });
  }


  uploadPhoto(event:any){
    var file=event.target.files[0];
    const formData:FormData=new FormData();
    formData.append('uploadedFile',file,file.name);

    this.service.UploadPhoto(formData).subscribe((data:any)=>{
      this.PhotoFileName=data.toString();
      this.PhotoFilePath=this.service.PhotoUrl+this.PhotoFileName;
    })
  }

  // selDate: any;
  // range = new FormGroup({
  //   strDate: new FormControl(null),
  //   endDate: new FormControl(null),
  // });
  // findClick() {
  //   // console.log(this.datePipe.transform(this.range.controls['strDate'].value, 'yyyy-MM-dd'));
  //   // console.log(this.datePipe.transform(this.range.controls['endDate'].value, 'yyyy-MM-dd'));
  //   this.range.setValue({
  //     strDate: this.datePipe.transform(this.range.controls['strDate'].value, 'yyyy-MM-dd'),
  //     endDate: this.datePipe.transform(this.range.controls['endDate'].value, 'yyyy-MM-dd')
  //   });
  //   console.log(this.range.value);
  //   // this.selDate = this.range.controls['strDate'].value + ' AND ' + this.range.controls['endDate'].value
  //   // this.reloadDataList(this.range.controls['strDate'].value, this.range.controls['endDate'].value);
  // }
}
