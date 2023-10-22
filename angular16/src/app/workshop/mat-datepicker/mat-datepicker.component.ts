import { Component, OnInit } from '@angular/core';
import {UntypedFormGroup, UntypedFormControl} from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { DatePipe } from '@angular/common';

export const MY_DATE_FORMATS = {
    parse: {
      dateInput: 'DD/MM/YYYY HH:mm:ss',
    },
    display: {
      dateInput: 'DD/MM/YYYY HH:mm:ss',
      monthYearLabel: 'MMMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY'
    },
};

@Component({
  selector: 'app-mat-datepicker',
  templateUrl: './mat-datepicker.component.html',
  styleUrls: ['./mat-datepicker.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class MatDatepickerComponent implements OnInit {
  campaignOne: UntypedFormGroup;
  
  reactiveForm: UntypedFormGroup = new UntypedFormGroup({
    OperaDateTime: new UntypedFormControl({ value: [null] }),
  })

  myDate: Date = new Date();
  myDateDisplay: any;
  today:Date = new Date();
  month:number = this.today.getMonth();
  year:number = this.today.getFullYear();

  constructor(private datePipe: DatePipe) { 
    // this.campaignOne = new FormGroup({
    //   start: new FormControl(new Date(this.year, this.month, 1)),
    //   end: new FormControl(new Date(this.year, this.month, 16))
    // });
  }

  ngOnInit(): void {
    this.myDateDisplay = this.datePipe.transform(this.myDate, 'dd/MM/yyyy');
    // this.reactiveForm.setValue({
    //   OperaDateTime: this.datePipe.transform(this.myDate),
    // });
  }

  onClick(){}

  onSubmit(): void {
    console.log('xxxxx')
  }
}
