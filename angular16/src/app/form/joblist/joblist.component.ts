import { Component, OnInit, ViewChild } from '@angular/core';
import { ImportFileDetailComponent } from 'src/app/admin/import-file-detail/import-file-detail.component';
import { SharedService } from 'src/app/shared.service';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';

export interface JobModel {
  ID: string;
  JobNo: string;
  TID: string;
  // MID: string;
  // InstallDate: string;
  JobType: string;
  JobStatus: string;
  actions1: string;
  actions2: string;
}

@Component({
  selector: 'app-joblist',
  templateUrl: './joblist.component.html',
  styleUrls: ['./joblist.component.css']
})
export class JoblistComponent implements OnInit {

  constructor(public service: SharedService, private http: HttpClient) { }

  CloseJob: any;
  CloseJobList: any = [];
  AddEditFlag: boolean = false;
  ModalTitle: string = "";
  displayedColumns: string[] = [
    // 'ID',
    'JobNo',
    'TID', 
    // 'MID',
    // 'InstallDate',
    'JobType',
    'JobStatus',
    'actions1',
    'actions2'
  ];
  dataSource: MatTableDataSource<JobModel>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  private subs = new Subscription();
  private dataArray: any;

  ngOnInit(): void {
    if (this.service.isSelectTempJobNo_pageJobList) {
      this.loadTempJobList();
    } else {
      this.loadRealJobList();
    }  
  }

  // refreshTempJobList() {
  //   this.service.getCloseJobList().subscribe(data => {
  //     this.CloseJobList = data;
  //   });
  // }

  findRealJobClick() {
    this.loadRealJobList();
    this.service.isSelectTempJobNo_pageJobList = false;
  }
  findTempJobClick() {
    this.loadTempJobList();
    this.service.isSelectTempJobNo_pageJobList = true;
  }

  getTempJobs(): Observable<JobModel> {
    return this.http.get<JobModel>(this.service.NodeAPIUrl + '/closejob');
  }

  loadTempJobList() {
    this.subs.add(this.getTempJobs().subscribe((res:JobModel) => {
      // console.log(res);
      this.dataArray = res;
      this.dataSource = new MatTableDataSource<JobModel>(this.dataArray);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }) // end subs
    ) // end add
  }

  getRealJobs():  Observable<JobModel> {
    // return this.http.post<JobModel>(this.service.NodeAPIUrl + '/bps/getJobImportBPS', this.service.bpsfilter);
    return this.http.post<JobModel>(`${this.service.NodeAPIUrl}/bps/getJobImportBPS`, this.rangefilter.value);
  }

  loadRealJobList() {
    // this.findClick()
    this.subs.add(this.getRealJobs().subscribe((res: {}) => {
      // console.log(res);
      this.dataArray = res;
      this.dataSource = new MatTableDataSource<JobModel>(this.dataArray);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }) // end subs
    ) // end add
  }

  deleteClick(item: any) {
    if (confirm('Are you sure delete JobNumber : ' + item.JobNo)) {
      this.service.delCloseJob(item.ID).subscribe(res => {
        // alert(data.toString());
        alert(JSON.stringify(res))
        this.loadTempJobList();
      })
    }
  }

  //------------------------------------------------ Filter Section -------------------------------
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
    this.isClearFilter = false;
    this.rangefilter.setValue({
      strDate: null,
      endDate: null,
      Bank: null,
      bkkupc: null,
      jobtype: null,
      jobstatus: null,
      id: null
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
