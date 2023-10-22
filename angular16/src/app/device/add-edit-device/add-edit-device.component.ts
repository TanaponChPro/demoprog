import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-device',
  templateUrl: './add-edit-device.component.html',
  styleUrls: ['./add-edit-device.component.css']
})
export class AddEditDeviceComponent implements OnInit {

  constructor(private service:SharedService) { }

  @Input() dev:any;
  DeviceID:string="";
  SerialNo:string="";
  Band:string="";
  BandList:any=[];
  Model:string="";
  ModelList:any=[];
  DeviceType:string="";
  DeviceTypeList:any=[];
  RegisterDate:string="";

  ngOnInit(): void {
    this.DeviceID=this.dev.DeviceID;
    this.SerialNo=this.dev.SerialNo;
    this.loadBandList();
    this.loadModelList();
    this.loadDeviceTypeList();
    this.RegisterDate=this.dev.RegisterDate;
  }

  loadBandList(){
    this.service.getAllBandName().subscribe((data:any)=>{
      this.BandList=data;
      this.Band=this.dev.Band;
    });
  }

  loadModelList(){
    this.service.getAllModelName().subscribe((data:any)=>{
      this.ModelList=data;
      this.Model=this.dev.Model;
    });
  }
  
  loadDeviceTypeList(){
    this.service.getAllDeviceType().subscribe((data:any)=>{
      this.DeviceTypeList=data;
      this.DeviceType=this.dev.DeviceType
    });
  }

  addDevice(){
    var val = {
        DeviceID:this.DeviceID, 
        SerialNo:this.SerialNo,
        Band:this.Band,
        Model:this.Model,
        DeviceType:this.DeviceType,
        RegisterDate:this.RegisterDate
    };

    this.service.addDevice(val).subscribe(res=>{
      alert(res.toString());
    });
  }

  updateDevice(){
    var val = {
        DeviceID:this.DeviceID, 
        //SerialNo:this.SerialNo,
        Band:this.Band,
        Model:this.Model,
        DeviceType:this.DeviceType,
        RegisterDate:this.RegisterDate
    };

    this.service.updateDevice(val).subscribe(res=>{
      alert(res.toString());
    });
  }

}
