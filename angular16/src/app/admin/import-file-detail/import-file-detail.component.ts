import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
// import { DatePipe } from '@angular/common';
import { timer } from 'rxjs';

@Component({
  selector: 'app-import-file-detail',
  templateUrl: './import-file-detail.component.html',
  styleUrls: ['./import-file-detail.component.css']
})
export class ImportFileDetailComponent implements OnInit {

  constructor(private service:SharedService) { 
    
  }

  jid: number=0;
  sub:any;
  myDate:any =  new Date();
  OpenDateTime:any;

  @Input() impFile:any;
  JobID:string="";
  JobNo:string="";
  //JobList:any=[];
  OrderNo:string="";
  //OrderNoList:any=[];
  AdminOpenJob:string="";
  TID:string="";
  //TIDList:any=[];
  SerialNo:string="";
  //SerialNoList:any=[];
  MerchianNo:string="";
  MerchianName:string="";
  //MerchianNoList:any=[];
  CustomerNo:string="";
  CustomerNo1:string="";
  CustomerName:string="";
  //CustomerNoList:any=[];
  JobType:string="";
  //JobTypeList:any=[];
  JobStatus:string="";
  //JobStatusList:any=[];
  JobFlag:string="";
  OpenJobRemark:string="";

  ngOnInit(): void {
    timer(0,1000).subscribe(() => { this.OpenDateTime = new Date() });
    this.jid=this.impFile.id;
    this.JobNo=this.impFile.G;
    this.AdminOpenJob=this.impFile.F;
    this.MerchianNo=this.impFile.H;
    this.MerchianName=this.impFile.I;
  }

}
