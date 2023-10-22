import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';

export interface TackJobData {
  ID: string;
  JobNumber: string;
  TID: string;
  Bank: string;
  Contact: string;
  PhoneNo: string;
  SerialNoEDC: string;
  SerialNoBase: string;
  SerialNoPinpad: string;
  SerialNoScanner: string;
  SerialNoHub: string;
  SerialNoSim: string;
  ReturnNoEDC: string;
  ReturnNoBase: string;
  ReturnNoPinpad: string;
  ReturnNoScanner: string;
  ReturnNoHub: string;
  ReturnNoSim: string;
  Accessory: string;
  Remark: string;
  RecordDateTime: string;
  TackDate: string;
  TackTime: string;
  LastStatus: string;
  AdminName: string;
  TechnicName: string;
  ImpFileName: string;
  Comment: string;
}

@Component({
  selector: 'app-tackjob',
  templateUrl: './tackjob.component.html',
  styleUrls: ['./tackjob.component.css']
})
export class TackjobComponent implements OnInit {

  displayedColumns: string[] = [
    'JobNumber', 'TID', // 'Bank', 'Contact', 'PhoneNo',
    'SerialNoEDC', 'SerialNoBase', //'SerialNoPinpad',// 'SerialNoScanner', 'SerialNoHub', 'SerialNoSim',
    'ReturnNoEDC', // 'ReturnNoBase', //'ReturnNoPinpad',// 'ReturnNoScanner', 'ReturnNoHub', 'ReturnNoSim',
    // 'TackDate', 'AdminName', 
    'TechnicName', 'LastStatus',
    'actions'
  ];
  dataSource: MatTableDataSource<TackJobData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: SharedService, private http: HttpClient) { }

  private subs = new Subscription();
  private dataArray: any;

  ngOnInit(): void {
    console.log(this.service.NodeAPIUrl);
    this.refreshDeviceList();
  }

  getJobTacking(): Observable<TackJobData> {
    return this.http.get<TackJobData>(this.service.NodeAPIUrl + '/JobTacking');
  }

  refreshDeviceList() {
    this.subs.add(this.getJobTacking().subscribe((res: {}) => {
      //console.log(res);
      this.dataArray = res;
      this.dataSource = new MatTableDataSource<TackJobData>(this.dataArray);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    ) // end subs
    ) // end add
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //---------------------------------- ASP.NET Core API ----------------------------------------
  tmp: string = "";
  uploadFile(event: any) {
    var file = event.target.files[0];
    console.log(file.name);

    const formData: FormData = new FormData();
    formData.append('uploadedFile', file, file.name);

    this.service.checkFileBeforeImport(formData).subscribe(data => {
      //alert(data.toString());
      if (data.toString().substring(0, 1) == "Y") {
        if (confirm('พบไฟล์ ' + data.toString() + ' ต้องการบันทึกข้อมูลซ้ำหรือไม่??')) {
          this.tmp = "YES"; //alert("Yes");  
        } else {
          this.tmp = "NO"; //alert("No");
        }
      } else if (data.toString().substring(0, 1) == "N") {
        this.tmp = "YES"; // alert("Do not duplicate file");
      } else {
        alert(data.toString());
      }

      //alert("tmp = " + this.tmp);
      if (this.tmp == "YES") {
        this.service.uploadFileJobTacking(formData).subscribe((data: any) => {
          // alert(data.toString());
          this.tmp = data.toString();
          alert(data.toString());

          console.log(this.tmp.substring(1, 2));
          if (this.tmp.substring(1, 2) == "Y") this.refreshDeviceList();
          this.tmp = "";
        });
      }
    })

    // const params = new HttpParams()
    //   .set('p1', this.favoriteSeason)
    //   .set('p2', this.service.userLogin);

    // this.service.UploadExcelDeviceHistory(formData, params).subscribe((data: any) => {
    //   this.ExcelFileName = data.toString();
    //   this.ExcelFilePath = this.service.ExcelUrl + this.ExcelFileName;

    //   this.tmp = data.toString();
    //   alert(data.toString());
    //   if (this.tmp.substring(0, 1) == "I") this.refreshDeviceHisrory();
    //   this.tmp = "";
    // });

  } // end procedure

  //---------------------------------- NodeJS API ----------------------------------------
  UploadFileExcel(event: any) {
    var file = event.target.files[0];
    console.log(file.name);

    const formData: FormData = new FormData();
    formData.append('uploadfile', file, file.name);

    this.uploadFileJobTacking(formData).subscribe((data: any) => {
      alert(JSON.stringify(data));
      this.refreshDeviceList();
    });

  }

  uploadFileJobTacking(val: any) {
    console.log(this.service.NodeAPIUrl + '/uploadjobtacking');
    return this.http.post(this.service.NodeAPIUrl + '/uploadjobtacking', val);
  }

  checkImportFileName(event: any) {
    var file = event.target.files[0];
    console.log(file.name);
    this.service.checkFileBefImport(file.name).subscribe(data => {
      alert(JSON.stringify(data));
    });
  }
}
