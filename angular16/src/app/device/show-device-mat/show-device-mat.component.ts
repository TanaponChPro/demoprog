import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SharedService } from 'src/app/shared.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
// import { IBank } from 'src/app/model/Bank';

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

export interface DeviceData {
  SerialNo: string;
  Band: string;
  Model: string;
  DeviceType: string;
  // RegisterDate: string;
  // ExpriedDate: string;
  UseStatus: string;
  Lot: string;
  StockName: string;
  WhereIsLast: string;
}

@Component({
  selector: 'app-show-device-mat',
  templateUrl: './show-device-mat.component.html',
  styleUrls: ['./show-device-mat.component.css'],
  providers: [DatePipe, { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }]
})

export class ShowDeviceMatComponent implements OnInit {

  displayedColumns: string[] = [
    'SerialNo', 
    // 'Band', 
    'Model', 'DeviceType',
    // 'RegisterDate','ExpriedDate',
    'UseStatus', 
    // 'Lot',
    'StockName',
    'WhereIsLast'
  ];
  dataSource: MatTableDataSource<DeviceData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public service: SharedService, private http: HttpClient, private datePipe: DatePipe) { }

  private subs = new Subscription();
  private dataArray: any;

  ngOnInit() {
    this.refreshDeviceList();
    // this.loadDeviceList();
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;

    // this.subs.add(this.getLaps().subscribe((res) => {
    //   console.log(res);
    //   this.dataArray = res;
    //   this.dataSource = new MatTableDataSource<DeviceData>(this.dataArray);
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
    // },
    //   (err: HttpErrorResponse) => {
    //     console.log(err);
    //   }));
  }


  getLaps(): Observable<DeviceData> {
    return this.http.get<DeviceData>(this.service.NodeAPIUrl + '/device/vender/BPS');
  }

  refreshDeviceList() {
    this.subs.add(this.getLaps().subscribe((res: {}) => {
      //console.log(res);
      this.dataArray = res;
      this.dataSource = new MatTableDataSource<DeviceData>(this.dataArray);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }) // end subs
    ) // end add
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  // getLaps() {
  //   this.service.getDeviceHistory().subscribe((data: {}) => {
  //     console.log(data);
  //     console.log('Laps');
  //     //this.dataSource.data = data; // on data receive populate dataSource.data array
  //     return data;
  //   });
  // }

  // getRandomUsers(): Observable<IRandomUsers> {
  //   const URL = `${this.baseURL}/api/users/random_user?size=10`;
  //   return this.http.get<IRandomUsers>(URL);
  // }

  DeviceHistoryList: any;
  refreshDeviceHisrory() {
    this.service.getDeviceHistory().subscribe(data => {
      console.log(data.toString());
      this.DeviceHistoryList = data;
    });
  }

  loadDeviceList() {
    this.getDevices().subscribe(res => {
      console.log(res.toString());
      this.DeviceHistoryList = res;
    });
  }

  getDevices(): Observable<any[]> {
    return this.http.get<any>(this.service.NodeAPIUrl + '/device/vender/bps');
  }

  ExcelFileName: string = "";
  ExcelFilePath: string = "";
  favoriteSeason: string = "1";
  tmp: string = "";


  uploadFile(event: any) {
    // var file = event.target.files[0];
    // const formData: FormData = new FormData();
    // formData.append('uploadFile', file, file.name);

    // const params = new HttpParams()
    //   .set('p1', this.favoriteSeason)
    //   .set('p2', this.service.userLogin);
    // this.service.uploadExcelEakwInvenrotyNode(formData).subscribe((data: any) => {
    //   this.ExcelFileName = data.toString();
    //   this.ExcelFilePath = this.service.ExcelUrl + this.ExcelFileName;

    //   this.tmp = data.status;
    //   alert(data.message);
    //   if (this.tmp == "1") this.refreshDeviceHisrory();
    //   this.tmp = "";
    // });
  } // end procedure

  uploadFileExcel(event: any) {
    var file = event.target.files[0];
    // console.log(file.name);

    const formData: FormData = new FormData();
    formData.append('uploadfile', file, file.name);

    this.uploadFileEakwNodeStock(formData).subscribe((data: any) => {
      alert(JSON.stringify(data));
      this.tmp = data.status;
      if (this.tmp == "1") this.refreshDeviceHisrory();
      this.tmp = "";
    });
  }

  uploadFileEakwNodeStock(val: any) {
    console.log(this.service.NodeAPIUrl + '/device/uploadinventbps');
    return this.http.post(this.service.NodeAPIUrl + '/device/uploadinventbps', val);
    // return this.http.post(this.NodeAPIUrl + '/device/uploadinventbps', val);
  }

//------------------------------------------------ Filter Section -------------------------------
  isClearFilter = true;
  selDate: any;
  rangefilter: UntypedFormGroup = new UntypedFormGroup({
    strDate: new UntypedFormControl(null),
    endDate: new UntypedFormControl(null),
    Bank: new UntypedFormControl(null),
    vender: new UntypedFormControl(null),
    usestatus: new UntypedFormControl(null),
    stockname: new UntypedFormControl(null)
  });

  // UseStatus = [
  //   { id: 1, name: "Chang/Return"},
  //   { id: 2, name: "In Stock"},
  //   { id: 3, name: "Used"},
  // ]

  StockName = [
    { id: 1, name: "Eak&W-BKK"},
    { id: 2, name: "Eak&W-Nonthaburi"},
    { id: 3, name: "Eak&W-Chonburi"},
    { id: 4, name: "Eak&W-Pathumthani"},
    { id: 5, name: "Eak&W-Khon Kaen"},
  ]


  findClick() {
    this.isClearFilter = false;
    this.rangefilter.setValue({
      strDate: this.datePipe.transform(this.rangefilter.controls['strDate'].value, 'yyyy-MM-dd'),
      endDate: this.datePipe.transform(this.rangefilter.controls['endDate'].value, 'yyyy-MM-dd'),
      Bank:  this.rangefilter.controls['Bank'].value,
      vender: this.rangefilter.controls['vender'].value,
      usestatus: this.rangefilter.controls['usestatus'].value,
      stockname: this.rangefilter.controls['stockname'].value
    });

    // if (this.rangefilter.controls['strDate'].value !== null) {
    //   this.service.bpsfilter.strdate = this.rangefilter.controls['strDate'].value
    //   this.service.bpsfilter.enddate = this.rangefilter.controls['endDate'].value
    //   this.service.bpsfilter.bkkupc = this.rangefilter.controls['bkkupc'].value
    //   this.service.bpsfilter.selbank = this.rangefilter.controls['Bank'].value
    //   this.service.bpsfilter.jobtype = this.rangefilter.controls['jobtype'].value
    //   this.service.bpsfilter.jobstatus = this.rangefilter.controls['jobstatus'].value
    // }

    console.log(this.rangefilter.value);
    // console.log(this.service.bpsfilter);
    // this.selDate = this.rangefilter.controls['strDate'].value + ' AND ' + this.rangefilter.controls['endDate'].value
    this.reloadDataList();
  }

  clearFilterClick() {
    this.isClearFilter = true;
    this.rangefilter.setValue({
      strDate:  null,
      endDate: null,
      Bank:  null,
      vender: null,
      usestatus: null,
      stockname: null
    });
    // this.service.bpsfilter.strdate = null;
    // this.service.bpsfilter.enddate =  null;
    // this.service.bpsfilter.bkkupc =  null;
    // this.service.bpsfilter.selbank =  null;
    // this.service.bpsfilter.jobtype =  null;
    // this.service.bpsfilter.jobstatus =  null;

  }

  // setFilter():void {
  //   if (this.service.bpsfilter !== null) {
  //     this.rangefilter.setValue({
  //       strDate: this.service.bpsfilter.strdate,
  //       endDate: this.service.bpsfilter.enddate,
  //       Bank:  this.service.bpsfilter.selbank,
  //       bkkupc: this.service.bpsfilter.bkkupc,
  //       jobtype: this.service.bpsfilter.jobtype,
  //       jobstatus:this.service.bpsfilter.jobstatus
  //     });
  //   }
  // }

  reloadDataList() {
    this.subs.add(this.selectDevice().subscribe((res: {}) => {
      // console.log(res);
      this.dataArray = res;
      this.dataSource = new MatTableDataSource<any>(this.dataArray);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }) // end subs
    ) // end add
  }
  // http://127.0.0.1:8081/api/device/strainer
  selectDevice(): Observable<any> {
    return this.http.post<any>(`${this.service.NodeAPIUrl}/device/strainer`,this.rangefilter.value);
  }

} // end module

