import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-show-device',
  templateUrl: './show-device.component.html',
  styleUrls: ['./show-device.component.css']
})
export class ShowDeviceComponent implements OnInit {

  constructor(private service: SharedService, private http: HttpClient) { }

  DeviceList: any = [];
  DeviceHistoryList: any = [];
  ModalTitle: string = "";
  ActivateAddEditDepComp: boolean = false;
  ActivateAddEditEmpComp: boolean = false;
  dev: any;
  impFile: any;

  DeviceIDFilter: string = "";
  SerialNoFilter: string = "";
  BandFilter: string = "";
  ModelFilter: string = "";
  DeviTypeFilter: string = "";
  DeviceListWithoutFilter: any = [];
  ImpotJobList: any = [];
  ExcelFileName: string = "";
  ExcelFilePath: string = "";

  favoriteSeason: string = "";
  seasons: string[] = ['In to Stock', 'Out Stock'];

  // const params1:HttpParams = new HttpParams()
  //  .set('p1', 'one!')
  //  .set('para2', "two");

  ngOnInit(): void {
    // this.refreshDeviceList();
    this.refreshDeviceHisrory();
  }



  addClick() {
    this.dev = {
      DeviceID: 0,
      SerialNo: ""
    }
    this.ModalTitle = "Add Device";
    this.ActivateAddEditDepComp = true;
  }

  editClick(item: any) {
    console.log(item);
    this.dev = item;
    this.ModalTitle = "Edit Device";
    this.ActivateAddEditDepComp = true;
  }

  deleteClick(item: any) {
    if (confirm('Are you sure??')) {
      this.service.deleteDevice(item.DeviceID).subscribe(data => {
        alert(data.toString());
        this.refreshDeviceList();
      })
    }
  }

  closeClick() {
    this.ActivateAddEditDepComp = false;
    this.refreshDeviceList();
  }

  refreshDeviceList() {
    this.service.getDeviceList().subscribe(data => {
      this.DeviceList = data;
      this.DeviceListWithoutFilter = data;
    });
  }

  refreshDeviceHisrory() {
    this.service.getDeviceHistory().subscribe(data => {
      this.DeviceHistoryList = data;
    });
  }

  FilterFn() {
    var DeviceIDFilter = this.DeviceIDFilter;
    var SerialNoFilter = this.SerialNoFilter;
    var BandFilter = this.BandFilter;
    var ModelFilter = this.ModelFilter;
    var DeviTypeFilter = this.DeviTypeFilter;

    this.DeviceList = this.DeviceListWithoutFilter.filter(function (el: any) {
      return el.DeviceID.toString().toLowerCase().includes(
        DeviceIDFilter.toString().trim().toLowerCase()
      ) &&
        el.SerialNo.toString().toLowerCase().includes(
          SerialNoFilter.toString().trim().toLowerCase()
        ) &&
        el.Band.toString().toLowerCase().includes(
          BandFilter.toString().trim().toLowerCase()
        ) &&
        el.Model.toString().toLowerCase().includes(
          ModelFilter.toString().trim().toLowerCase()
        ) &&
        el.DeviceType.toString().toLowerCase().includes(
          DeviTypeFilter.toString().trim().toLowerCase()
        )
    });
  }

  sortResult(prop: any, asc: any) {
    this.DeviceList = this.DeviceListWithoutFilter.sort(function (a: any, b: any) {
      if (asc) {
        return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
      } else {
        return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
      }
    })
  }

  tmp: string = "";
  uploadFile(event: any) {
    var file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('uploadedFile', file, file.name);

    const params = new HttpParams()
      .set('p1', this.favoriteSeason)
      .set('p2', this.service.userLogin);

    // console.log(file);
    // console.log(formData);
    // console.log(params);
    // console.log(params.toString());
    // console.log(params.get('p1'));
    // console.log(params.getAll('page'));
    //     params = new HttpParams()
    //     .set('sort', 'name');

    // if (!params.has('page')) {
    //     params = params.set('page', PageNo)
    // }
    // https://www.tektutorialshub.com/angular/angular-pass-url-parameters-query-strings/

    // เขียนแบบนีก้อได้ แต่ต้อง import { HttpClient, HttpParams } from '@angular/common/http';
    // return this.http.post(this.service.APIUrl + '/DeviceHistory/ImportDriverInStock/' + this.favoriteSeason + '/' + this.service.userLogin, formData).subscribe((data: any) => {
    //   alert(data.toString());
    //   this.tmp = data.toString();
    //   console.log(this.tmp.substring(0, 1));
    //   if (this.tmp.substring(0, 1) == "I") this.refreshDeviceHisrory();
    //   this.tmp = "";

    // });

    // หรือเขียนแบบนีก้อได้ ถ้าสง params เป็น string ก้อไม่ต้อง import { HttpParams } from '@angular/common/http';
    // this.service.UploadExcelDeviceHistory(formData, params).subscribe((data:any)=>{
    //   this.ExcelFileName=data.toString();
    //   this.ExcelFilePath=this.service.ExcelUrl+this.ExcelFileName;

    //   this.tmp = data.toString();
    //   alert(data.toString());
    //   if (this.tmp.substring(0,1) == "I") this.refreshDeviceHisrory();  
    //   this.tmp = "";
    // });
  }

}
