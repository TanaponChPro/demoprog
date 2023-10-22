import { Component, OnInit, Input, OnDestroy  } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { ActivatedRoute } from "@angular/router";
import { DatePipe } from '@angular/common';
import { observable, timer } from 'rxjs';

@Component({
  selector: 'app-add-edit-job',
  templateUrl: './add-edit-job.component.html',
  styleUrls: ['./add-edit-job.component.css'],
  providers: [DatePipe]
})
export class AddEditJobComponent implements OnInit, OnDestroy {

  jid: number=0;
  sub:any;
  myDate:any =  new Date();
  OpenDateTime:any;

  constructor(private service:SharedService, private actRoute: ActivatedRoute, private datePipe: DatePipe) { 
    //this.product_id = this.actRoute.snapshot.params.id;
    this.myDate = this.datePipe.transform(this.myDate, 'yyMMdd-hhmmss');
  }

  @Input() tmp:any;
  JobID:string="";
  JobNo:string="";
  JobList:any=[];
  OrderNo:string="";
  OrderNoList:any=[];
  AdminOpenJob:string="";
  TID:string="";
  TIDList:any=[];
  SerialNo:string="";
  SerialNoList:any=[];
  MerchianNo:string="";
  MerchianName:string="";
  MerchianNoList:any=[];
  CustomerNo:string="";
  CustomerNo1:string="";
  CustomerName:string="";
  CustomerNoList:any=[];
  //OpenDateTime:string="";
  JobType:string="";
  JobTypeList:any=[];
  JobStatus:string="";
  JobStatusList:any=[];
  JobFlag:string="";
  OpenJobRemark:string="";

  ngOnInit(): void {
    this.sub = this.actRoute.params.subscribe(params => {
      this.jid = +params['postid']; // (+) converts string 'id' to a number
    });

    timer(0,1000).subscribe(() => { this.OpenDateTime = new Date() });

    if (this.JobNo == "") {
      this.OrderNo = this.myDate + '-order-01';
      this.JobNo = this.myDate;
      this.AdminOpenJob = "Mr.Test Testor";
      this.JobFlag = "Y";
    }

    this.loadCustomerList()
    this.loadJobTypeList();
    this.loadJobStatusList();
    this.loadDeviceList();

    /* โคตชุดนีสำคันมาก การส่งผ่านพารามิเตอร์ โดยการใช้ RouteLink
        this.Jid += this.actRoute.snapshot.paramMap.get('postid');
        this.actRoute.paramMap.subscribe(res => {
          let postid
          postid = res.get('postid');
          console.log(postid);
        });   
        let postid = this.actRoute.snapshot.params.postid;
        console.log(postid);
        this.route.paramMap.subscribe(params => {
          this.JobList = params.get('id');
        });
        this.actRoute.params.subscribe(params => {
          let id = params.id;
        });
    */
  }

  // myFunction(){
  //   let latest_date =this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
  //  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  addJob(){
    var val = {
      //JobID:this.JobID,
      JobNo:this.JobNo,
      OrderNo:this.OrderNo,
      TID:this.TID,
      MerchianNo:this.MerchianNo,
      SerialNo:this.SerialNo,
      CustomerNo:this.CustomerNo = this.CustomerNo1,
      CustomerName:this.CustomerName,
      AdminOpenJob:this.AdminOpenJob,
      //AdminUpdateJob:this.AdminUpdateJob,
      //OpenDateTime:this.OpenDateTime,
      OpenDateTime:this.datePipe.transform(this.OpenDateTime, 'yyyy-MM-dd hh:mm:ss'),
      //UpdateDateTime:this.UpdateDateTime,
      JobType:this.JobType,
      JobStatus:this.JobStatus = this.selectJobStatus,
      JobFlag:this.JobFlag,
      OpenJobRemark:this.OpenJobRemark
      // TechnicName:this.TechnicName,
      // AdminCloseJob:this.AdminCloseJob,
      // CloseDateTime:this.CloseDateTime,
      // CloseJobStatus:this.CloseJobStatus,
      // CloseJobRemark:this.CloseJobRemark,
      // CustomerReciveName:this.CustomerReciveName,
      // JobNoRef:this.JobNoRef
    };

    console.log(val);
    this.service.addJob(val).subscribe(res=>{
      alert(res.toString());
    });
  }

  updateJob(){

  }

  loadCustomerList(){
    this.service.getAllCustomer().subscribe((data:any)=>{
      this.CustomerNoList=data;
    });
  }

  loadJobTypeList(){
    this.service.getAllJobType().subscribe((data:any)=>{
      this.JobTypeList=data;
      // this.JobType=this.dev.DeviceType
    });
  }

  loadJobStatusList(){
    this.service.getAllJobStatus().subscribe((data:any)=>{
      this.JobStatusList=data;
      console.log(this.JobStatusList);
    });
  }

  loadDeviceList(){
    this.service.getDeviceList().subscribe((data:any)=>{
      this.SerialNoList=data;
    });
  }

  selectJobStatus:string="";
  selectJobStatusRemark:string="";
  //event handler for the select element's change event
  mySelectHandler (event: any) {
    //update the ui
    this.selectJobStatus = event['JobStatus'];
    this.selectJobStatusRemark = event['Remark'];
  }

  SelectCustomer(event: any){
    this.CustomerNo1 = event['CustomerNo'];
    this.CustomerName = event['CustomerName'];
  }
}
