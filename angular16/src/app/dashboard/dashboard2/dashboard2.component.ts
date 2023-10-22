import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { HttpClient } from '@angular/common/http';

export interface BPSJobStatus {
    "JobType": string,
    "JobStatus": string,
    "CountJobStatus": number
}

@Component({
  selector: 'app-dashboard2',
  templateUrl: './dashboard2.component.html',
  styleUrls: ['./dashboard2.component.css']
})
export class Dashboard2Component implements OnInit {

  constructor(private service: SharedService, private http: HttpClient) { }

  DataList:BPSJobStatus[]=[];
  JobStatus = {
    Complete: 0,
    Incomplete: 0,
    Onsite: 0,
    Hold: 0,
    Other: 0
  }
  JobTotal:number = 0;
  JobType = {
    Install: 0 ,
    Deinstall: 0,
    Service: 0,
    Reprogram: 0,
    Replace: 0,
    JoinPartition: 0,
    Standby: 0,
    Other:0
  }

  ngOnInit(): void {
    this.refreshDashboardList();
    // this.http.get<BPSJobStatus[]>(this.service.NodeAPIUrl + '/dashb-bps')
    // .subscribe(response => {
    //   // console.log('response',response)
    //   this.DataList = response;
    // })
  }

  refreshDashboardList() {
   
  }
}
