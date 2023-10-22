import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-dashboard1',
  templateUrl: './dashboard1.component.html',
  styleUrls: ['./dashboard1.component.css']
})
export class Dashboard1Component implements OnInit {

  constructor(private service: SharedService) { }

  DataList:any=[];
  JobTotal:number = 0;
  JobComplete: number = 0;
  JobNoComplete: number = 0;
  JobOnsite: number = 0;
  JobNoStatus: number = 0;
  JobType = {
    Install: 0 ,
    Deinstall: 0,
    Service: 0,
    Reload: 0,
    Replace: 0,
  }
  ngOnInit(): void {
    this.refreshDeviceList();
  }

  refreshDeviceList() {

  }

}
