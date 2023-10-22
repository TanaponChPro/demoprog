import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpParams, HttpEventType, HttpResponse, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ITackJobDataBPS } from 'src/app/model/TackJobDataBps';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
// import { Workbook } from 'exceljs';   // วิธีการที ๒ Export data to Excel
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { Router } from '@angular/router';

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
  selector: 'app-tackjobbps',
  templateUrl: './tackjobbps.component.html',
  styleUrls: ['./tackjobbps.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  providers: [DatePipe, { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})

export class TackjobbpsComponent implements OnInit {

  displayedColumns: string[] = [
    // `ID`,    `RowNo`,
    `JobNo`,
    `DefineInsDate`,
    // `DateOut`,
    `TID`, `MerchantID`,
    //  `MerchantName`,`LocationInstall`,
    // `DefineInsDate`,
    // `DefineInsTime`,`PromotionStrDate`,`PromotionEndDate`, `Vender`,
    `SerialNoEDC`,
    // `Model`,`ContactName`,`ContactPhone`,`ContactBranch`, `ContactBranchPhone`,
    // `TID_MULTI`,`MERID_MULTI`,`TID_DCC`,`ORG_MERID_DCC`,
    // `Line1`,`Line2`,`Line3`, `Remark`,`ReaderType`,`AssignTo`,
    // `SerialNoPinpad`,`SerialNoBase`,`LinkPOS`,`SerialNoSam`,`SerialNoHub`,`VersionEDC`,`VersionPinpad`,`NoteBPS`,
    // `BussinessGroup`,`ProjectType`,
    `JobType`, `Province`,
    // `BKK_UPC`,`SLAStatus`,
    `Bank`,
    `Ticket`,
    // `OperationDate`,`OperationTime`,`CustomerName`,`CustomerPhone`,
    // `TechnicName`,
    `JobStatus`,
    // `Remark2`,`Remark3`,`ReturnDate`,`ReturnTID`,`ReturnSIM`,`ReturnSAM`,`NoteOutsource`,
    // `AppointDate`,`AppointTime`,`PhonetoCustomerDate`,`PhonetoCustomerTime`,`AppointResult`,`AppointCount`,`AppointUser`,
    // `SLADateCount`,`SLAMeet1`,`SLAinstallEDC`,`AppointDateCount`,`SLAMeet2`,`SLAReturnDate`,`Week1`
    'edit','copy','delete'
  ];

  dataSource: MatTableDataSource<ITackJobDataBPS>;
  expandedElement1: ITackJobDataBPS | null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // dataSource1 = ELEMENT_DATA;
  // columnsToDisplay = ['name', 'weight', 'symbol', 'position'];
  // expandedElement: PeriodicElement | null;
  public product = { id: '1', name: "Angular" };

  constructor(
    private datePipe: DatePipe,
    public service: SharedService,
    private http: HttpClient,
    private router: Router
  ) { }

  private subs = new Subscription();
  private dataArray: any;
  isShown: boolean = false; // hidden by default

  ngOnInit(): void {
    // this.setFilter();
    this.reloadDataList();
    this.reloadImportFileNameStatus();
    console.log(this.dataSource);
  }

  getJobTacking(): Observable<ITackJobDataBPS> {
    // console.log(`${this.service.NodeAPIUrl}/bps/getJobImportBPS/`,this.rangefilter.value);
    return this.http.post<ITackJobDataBPS>(`${this.service.NodeAPIUrl}/bps/getJobImportBPS`, this.rangefilter.value);
  }

  reloadDataList() {
    this.subs.add(this.getJobTacking().subscribe((res: {}) => {
      // console.log(res);
      this.dataArray = res;
      this.dataSource = new MatTableDataSource<ITackJobDataBPS>(this.dataArray);
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

  deleteClick(item: any) {
    // console.log(item.ID);
    // console.log(item.JobNo);
    // console.log(item.InputDataFrom);
    if(item.InputDataFrom == 'excel') {
      alert('Job Number : ' +item.JobNo+ ' ลบไม่ได้');
      return
    }
    if (confirm('Are you sure delete JobNumber : ' + item.JobNo)) {
      this.service.deleteJobImportBPS(item.ID).subscribe(res => {
        // alert(data.toString());
        alert(JSON.stringify(res))
        this.reloadDataList();
      })
    }
  }

  UploadFileExcel(event: any) {
    var file = event.target.files[0];
    console.log(file.name);
    // this.uploadExcelTackJobBPS(file);
    const formData: FormData = new FormData();
    formData.append('uploadfile', file, file.name);

    this.uploadFileJobTacking(formData).subscribe((data: any) => {
      alert(JSON.stringify(data));
      this.reloadDataList();
    });

  }

  uploadFileJobTacking(val: any) {
    console.log(this.service.NodeAPIUrl + '/bps/uploadfilebps');
    return this.http.post(this.service.NodeAPIUrl + '/bps/uploadfilebps', val);
  }
  
  checkImportFileName(event: any) {
    var file = event.target.files[0];
    console.log(file.name);
    this.service.checkFileBefImport(file.name).subscribe(data => {
      alert(JSON.stringify(data));
    });
  }

  ExcelList: any = [];
  reloadImportFileNameStatus() {
    this.service.getImportFileNameStatus('N').subscribe(data => {
      this.ExcelList = data;
      if (this.ExcelList.length != 0) {
        // console.log(this.DataList[0].ID)
        if (this.ExcelList[0].ID != "") this.isShown = true;
      }
    });
  }

  tranData2JobimportBPS() {
    // console.log(this.ExcelList);
    if (this.ExcelList.length == 0) {
      alert('ไม่มีไฟล์ Excel ทีจะนำเข้าฐานข้อมูล');
      return;
    }
    // alert('upload ok');
    this.service.runBackendProcess().subscribe(data => {
      alert(JSON.stringify(data));
    });
    this.isShown = false;
    this.ngOnInit;
  }

  toggleShow() {
    this.isShown = !this.isShown;
  }
  //--------------------------------- Export data to Excel ----------------------------
  // วิธีการที ๑
  // const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

  // employee = [
  //   { name: 'Shyam', email: 'shyamjaiswal@gmail.com' },
  //   { name: 'Bob', email: 'bob32@gmail.com' },
  //   { name: 'Jai', email: 'jai87@gmail.com' },
  // ];

  exportToExcel() {
    // const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.employee);
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataArray);
    const workbook: XLSX.WorkBook = {
      Sheets: { Sheet1: worksheet },
      SheetNames: ['Sheet1'],
    };

    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    const data: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    const date = new Date();
    const fileName = 'example.xlsx';

    FileSaver.saveAs(data, fileName);
  }

  // วิธีการที ๒
  data2excel: ITackJobDataBPS[];
  exportExcel() {
    // console.log(this.data2excel);
    // console.log(this.dataArray);
    // console.log(this.dataSource);
    // let workbook = new Workbook();
    // let worksheet = workbook.addWorksheet('ProductData');
    // workbook.xlsx.writeBuffer().then((dataSource) => {
    //   let blob = new Blob([dataSource], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    //   FileSaver.saveAs(blob, 'ProductData.xlsx');
    // })
  }

  //--------------------------------- clicrelie filter ----------------------------
  // ModelList: any = [];
  // ModalTitle: string = "";
  // ModalActivate: boolean = false;
  // emp: any;
  // filterClick() {
  //   this.emp = {
  //     ID: 0,
  //     PID: "",
  //     EmployeeName: "",
  //     Department: "",
  //     RegistDate: "",
  //     PhotoFileName: "anonymous.png"
  //   }
  //   this.ModalTitle = "ตั้งเงือนไขการคัดกรอง";
  //   this.ModalActivate = true;

  // }
  // closeClick(){
  //   this.ModalActivate=false;
  //   // this.refreshEmpList();
  // }
  isClearFilter = true;
  selDate: any;
  rangefilter: UntypedFormGroup = new UntypedFormGroup({
    strDate: new UntypedFormControl(null),
    endDate: new UntypedFormControl(null),
    Bank: new UntypedFormControl(null),
    bkkupc: new UntypedFormControl(null),
    jobtype: new UntypedFormControl(null),
    jobstatus: new UntypedFormControl(null),
    id: new UntypedFormControl(null)
  });

  findClick() {
    // console.log(this.datePipe.transform(this.range.controls['strDate'].value, 'yyyy-MM-dd'));
    // console.log(this.datePipe.transform(this.range.controls['endDate'].value, 'yyyy-MM-dd'));
    this.isClearFilter = false;
    this.rangefilter.setValue({
      strDate: this.datePipe.transform(this.rangefilter.controls['strDate'].value, 'yyyy-MM-dd'),
      endDate: this.datePipe.transform(this.rangefilter.controls['endDate'].value, 'yyyy-MM-dd'),
      Bank: this.rangefilter.controls['Bank'].value,
      bkkupc: this.rangefilter.controls['bkkupc'].value,
      jobtype: this.rangefilter.controls['jobtype'].value,
      jobstatus: this.rangefilter.controls['jobstatus'].value,
      id: null
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
      strDate: null,
      endDate: null,
      Bank: null,
      bkkupc: null,
      jobtype: null,
      jobstatus: null,
      id: null
    });
    // this.service.bpsfilter.strdate = null;
    // this.service.bpsfilter.enddate =  null;
    // this.service.bpsfilter.bkkupc =  null;
    // this.service.bpsfilter.selbank =  null;
    // this.service.bpsfilter.jobtype =  null;
    // this.service.bpsfilter.jobstatus =  null;
    this.reloadDataList();
  }


}

