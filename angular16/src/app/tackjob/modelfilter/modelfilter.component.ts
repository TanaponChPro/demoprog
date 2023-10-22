import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import {UntypedFormGroup, UntypedFormControl} from '@angular/forms';
// import {MatDatepickerModule} from '@angular/material/datepicker';

@Component({
  selector: 'app-modelfilter',
  templateUrl: './modelfilter.component.html',
  styleUrls: ['./modelfilter.component.css']
})
export class ModelfilterComponent implements OnInit {

  constructor(private service: SharedService) { }

  @Input() emp: any;
  ID: string = "";
  EmployeeName: string = "";
  Department: string = "";
  RegistDate: string = "";
  PhotoFileName: string = "";
  PhotoFilePath: string = "";
  DepartmentsList: any = [];

  range = new UntypedFormGroup({
    start: new UntypedFormControl(),
    end: new UntypedFormControl(),
  });


  ngOnInit(): void {

    this.ID = this.emp.ID;
    this.EmployeeName = this.emp.EmployeeName;
    this.Department = this.emp.Department;
    this.RegistDate = this.emp.RegistDate;
    this.PhotoFileName = this.emp.PhotoFileName;
    this.PhotoFilePath = this.service.PhotoUrl + this.PhotoFileName;
    console.log(this.emp);

  }

  addEmployee() {
    var val = {
      ID: this.ID,
      EmployeeName: this.EmployeeName,
      Department: this.Department,
      RegistDate: this.RegistDate,
      PhotoFileName: this.PhotoFileName
    };

    this.service.addEmployee(val).subscribe(res => {
      alert(res.toString());
    });
  }

  updateEmployee() {
    var val = {
      ID: this.ID,
      EmployeeName: this.EmployeeName,
      Department: this.Department,
      RegistDate: this.RegistDate,
      PhotoFileName: this.PhotoFileName
    };

    this.service.updateEmployee(this.ID, val).subscribe(res => {
      alert(res.toString());
    });
  }

}
