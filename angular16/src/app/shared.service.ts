import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { IBank } from 'src/app/model/Bank';
import { IJobType } from 'src/app/model/JobType';
import { IJobStatus } from 'src/app/model/JobStatus';
import { IVender } from 'src/app/model/Vender';
import { ITackJobDataBPS } from 'src/app/model/TackJobDataBps';
import { ICloseJob } from 'src/app/model/closejob.model';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
// import { IBpsFilter } from 'src/app/model/bpsfilter.model'
// import { BehaviorSubject, catchError, distinctUntilChanged, map, NEVER, Observable, shareReplay, Subject, Subscription, switchMap, tap, withLatestFrom } from 'rxjs';
// import { API_URL } from './api.constant';

@Injectable({
  providedIn: 'root'
})

export class SharedService {
  readonly APIUrl = "http://localhost:8081/api";
  // readonly PhotoUrl = "http://localhost:5000/Photos/";
  // readonly ExcelUrl = "http://localhost:5000/Excelfiles/";
  // readonly APIUrl="http://192.168.1.22:5678/api";
  readonly PhotoUrl = environment.URL + "app/images/";
  readonly ExcelUrl = environment.URL + "Excelfiles/";
  public userLogin: any = ""; // = "Admin";
  public userIP = '';
  // readonly NodeAPIUrl="http://192.168.1.46:8081/api";  
  // readonly NodeAPIUrl="http://127.0.0.1:8081/api";
  //const computerName = require('computer-name');
  //public computerName = require('computer-name');
  //computerName();
  // apiUrl = environment.API_URL;
  readonly NodeAPIUrl = environment.API_URL;

  private BarQRcode = new BehaviorSubject<any>('');         // Store of state
  BarQRcode$ = this.BarQRcode.asObservable();               // Selector
  getBarandQRcode(BarQRcode: any) {
    this.BarQRcode.next(BarQRcode);
  }
  scanFrom:any = '';
  isLodedData: boolean = false;
  BarQRresult:any = '';
 

  bpsfilter = {
    strDate: null,
    endDate: null,
    Bank: null,
    bkkupc: null,
    jobtype: null,
    jobstatus: null,
    id: null
  }
  bkkupcaray = [
    { id: 1, name: "กรุงเทพมหานคร", symbo: "BKK" },
    { id: 2, name: "ต่างจังหวัด", symbo: "UPC" }
  ]
  JobTypeBPS = [
    { id: 0, JobType: "0: No Jobtype" },
    { id: 1, JobType: "1: Install" },
    { id: 2, JobType: "2: Re-program " },
    { id: 3, JobType: "3: Join Partition" },
    { id: 4, JobType: "4: De-install" },
    { id: 5, JobType: "5: Promotion" },
    { id: 6, JobType: "6: Service" }
  ]

  isSelectTempJobNo_pageJobList: boolean = false;
  selectedJobNo: string = null || 'xxxx';
  BankList!: IBank;
  JobTypeList!: IJobType;
  JobStatusList!: IJobStatus;
  VenderList!: IVender;
  JobBPSDetail!: ITackJobDataBPS;
  CloseJobModel!: ICloseJob;

  private subs = new Subscription();

  constructor(private http: HttpClient) { }
  /*---------------------------------  NodeJS API -----------------------------------*/
/*
  getBank(): Observable<IBank> {
    return this.http.get<IBank>(this.NodeAPIUrl + '/util/Bank');
  }
  getJobType(): Observable<IJobType> {
    return this.http.get<IJobType>(this.NodeAPIUrl + '/util/JobType');
  }
  getJobStatus(): Observable<IJobStatus> {
    return this.http.get<IJobStatus>(this.NodeAPIUrl + '/util/JobStatus');
  }
  getVender(): Observable<IVender> {
    return this.http.get<IVender>(this.NodeAPIUrl + '/util/Vender');
  }

  findReference() {
    this.subs.add(this.getBank().subscribe((res: IBank) => {
      this.BankList = res;
    }) // end subs
    ) // end add
    this.subs.add(this.getJobType().subscribe((res: IJobType) => {
      this.JobTypeList = res;
    }) // end subs
    ) // end add
    this.subs.add(this.getJobStatus().subscribe((res: IJobStatus) => {
      this.JobStatusList = res;
    }) // end subs
    ) // end add
    this.subs.add(this.getVender().subscribe((res: IVender) => {
      this.VenderList = res;
    }) // end subs
    ) // end add
  }

  getDash1JobStatus(): Observable<any[]> {
    return this.http.get<any>(this.NodeAPIUrl + '/allJobstatus');
  }

  getDash2JobStatus(): Observable<any[]> {
    return this.http.get<any>(this.NodeAPIUrl + '/dashb-bps');
  }

  getBandEDC(): Observable<any[]> {
    return this.http.get<any[]>(this.NodeAPIUrl + '/bands');
  }

  getBandName(): Observable<any[]> {
    console.log(`${this.NodeAPIUrl}/bands`);
    return this.http.get<any[]>(this.NodeAPIUrl + '/bands');
    // return this.http.get<any[]>(`http://localhost:8081/api/bands`);
    // return this.http.get<any[]>(`https://eakw-sevice.tk/api/bands`);
  }

  getImportFileName(): Observable<any[]> {
    return this.http.get<any[]>(this.NodeAPIUrl + '/ImportFileName');
  }

  getJobTacking(): Observable<any[]> {
    return this.http.get<any[]>(this.NodeAPIUrl + '/bps/JobTacking');
  }
*/
findReference() {
  return 0
}
  //--------------------------------- Page Close Job -----------------------------------
  getCloseJobList(): Observable<any[]> {
    return this.http.get<any[]>(this.NodeAPIUrl + '/closejob');
  }

  getCloseJobData(id: any): Observable<any[]> {
    return this.http.get<any[]>(this.NodeAPIUrl + '/closejob/' + id);
  }

  addCloseJob(val: any) {
    // console.log(val);
    return this.http.post(this.NodeAPIUrl + '/closejob', val);
  }

  updTempCloseJob_tempJobNo(id: any, val: any) {
    // console.log(id, val);
    return this.http.put(this.NodeAPIUrl + '/closejob/' + id, val);
  }
  tranTmpJob2RealJob(val: any) { // อยูทีพาท: jobtackingbps.routes.js
    // console.log(val);
    return this.http.post(this.NodeAPIUrl + '/bps/tempjob2realjob', val);
  }
  // http://127.0.0.1:8081/api/bpscopyfile/tmp_20220426_203306_Admin_33242/Z20220426_33242
  copyTempJob2RealJob(tempjobno: any, realjobno: any) {
    // console.log(val);
    return this.http.get(`${this.NodeAPIUrl}/bps/copyfile/${tempjobno}/${realjobno}`);
  }
  uploadPhotoCloseJob(val: any) {
    return this.http.post(this.NodeAPIUrl + '/closejobimg/upload', val);
  }

  getCloseJobImage(val: any) {
    return this.http.get(this.NodeAPIUrl + '/closejobimg/files/' + val);
  }

  delCloseJob(id: any) {
    return this.http.delete(this.NodeAPIUrl + '/closejob/' + id);
  }

  // private baseUrl = 'http://localhost:8081/api/closejobimg';
  uploadImageCloseJob(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', `${this.NodeAPIUrl}/closejobimg/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }
  getFiles(): Observable<any> {
    return this.http.get(`${this.NodeAPIUrl}/closejobimg/files`);
  }
  getImageFilesName(filename: string) {
    console.log(`${this.NodeAPIUrl}/closejobimg/files/` + filename);
    return this.http.get(`${this.NodeAPIUrl}/closejobimg/files/` + filename);
    //http://127.0.0.1:8081/api/closejobimg/files/INS03439weew_TanaponApp1.png
  }

  //http://127.0.0.1:8081/api/importfilename?ImpFileName=JobTacking_0.xlsx
  checkFileBefImport(val: any) {
    console.log(this.NodeAPIUrl + '/ImportFileName?ImpFileName=' + val);
    return this.http.get(this.NodeAPIUrl + '/ImportFileName?ImpFileName=' + val);
  }

  // http://127.0.0.1:8081/api/importfilename/status/n
  getImportFileNameStatus(val: any) {
    console.log(this.NodeAPIUrl + '/ImportFileName/status/' + val);
    return this.http.get(this.NodeAPIUrl + '/ImportFileName/status/' + val);
  }

  // http://127.0.0.1:8081/api/bpsrunbackend
  runBackendProcess() {
    console.log(this.NodeAPIUrl + '/bps/runbackend');
    return this.http.get(this.NodeAPIUrl + '/bps/runbackend');
  }

  //--------------------------------- Page input form bps -----------------------------------
  insertJobImportBPS(val: any) {
    return this.http.post(`${this.NodeAPIUrl}/bps/insFromInputFormBPS`, val);
  }
  // http://127.0.0.1:8081/api/bpsupdatefrompage/16102
  updateJobImportBPSfromPage(id: any, val: any) {
    return this.http.put(`${this.NodeAPIUrl}/bps/updFromPage/${id}`, val);
  }

  deleteJobImportBPS(id: any) {
    return this.http.delete(this.NodeAPIUrl + '/bps/delJobImportBPS/' + id);
  }
  // http://127.0.0.1:8081/api/crePathImage/A1032203220
  createPathStockImage(jobno: any) {
    return this.http.get(this.NodeAPIUrl + '/bps/crePathImage/' + jobno);
  }

  //http://127.0.0.1:8081/api/closejobimg/upload/A1032100592
  uploadImageCloseJobBPS(file: File, jobno: any): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    console.log('POST', `${this.NodeAPIUrl}/closejobimg/upload/${jobno}`, formData);
    const req = new HttpRequest('POST', `${this.NodeAPIUrl}/closejobimg/upload/${jobno}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  getImageFileBPS(jobno: string): Observable<any> {
    // return this.http.get(`${this.baseUrl}/files`);
    // return this.http.get(`http://127.0.0.1:8081/api/closejobimg/files`);
    // console.log(this.NodeAPIUrl + '/closejobimg/image/' + jobno);
    return this.http.get(`${this.NodeAPIUrl}/closejobimg/image/` + jobno);
    // return this.http.get(`${this.NodeAPIUrl}/closejobimg/files/`);
  }

  // http://127.0.0.1:8081/api/closejobimg/rename/A1032100592/A1032100592_TanaponApp01.jpg
  renameImgaeFileBPS(jobno: string, imgfilename: string) {
    return this.http.get(`${this.NodeAPIUrl}/closejobimg/rename/${jobno}/${imgfilename}`);
  }

  /*---------------------------------  API Department -----------------------------------*/
  getDepList(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/Department');
  }

  addDepartment(val: any) {
    return this.http.post(this.APIUrl + '/Department', val);
  }

  updateDepartment(val: any) {
    return this.http.put(this.APIUrl + '/Department', val);
  }

  deleteDepartment(val: any) {
    return this.http.delete(this.APIUrl + '/Department/' + val);
  }

  /*---------------------------------  API Employee -----------------------------------*/
  getEmpList(): Observable<any[]> {
    return this.http.get<any>(this.NodeAPIUrl + '/Employees');
  }

  addEmployee(val: any) {
    return this.http.post(this.NodeAPIUrl + '/Employees', val);
  }

  updateEmployee(id: any, val: any) {
    return this.http.put(this.NodeAPIUrl + '/Employees/' + id, val);
  }

  deleteEmployee(id: any) {
    return this.http.delete(this.NodeAPIUrl + '/Employees/' + id);
  }


  UploadPhoto(val: any) {
    console.log(this.APIUrl + '/Employee/SaveFile', val);
    return this.http.post(this.APIUrl + '/Employee/SaveFile', val);
  }

  getAllDepartmentNames(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/Employee/GetAllDepartmentNames');
  }

  /*--------------------------------------------  API Device -----------------------------------*/
  getDeviceList(): Observable<any[]> {
    return this.http.get<any>(this.NodeAPIUrl + '/Device');
  }

  getDeviceHistory(): Observable<any[]> {
    return this.http.get<any>(this.NodeAPIUrl + '/DeviceHistory');
  }

  addDevice(val: any) {
    return this.http.post(this.NodeAPIUrl + '/Device', val);
  }

  updateDevice(val: any) {
    return this.http.put(this.NodeAPIUrl + '/Device', val);
  }

  deleteDevice(val: any) {
    return this.http.delete(this.NodeAPIUrl + '/Device/' + val);
  }

  // uploadExcelEakwInvenrotyNode(val: any) {
  //   console.log(this.NodeAPIUrl + '/device/uploadinventbps' + val);
  //   return this.http.post(this.NodeAPIUrl + '/device/uploadinventbps', val);
  //   // return this.http.post(this.APIUrl + 'device/uploadinventbps' + tmp.get('p1') + '/' + this.userLogin, val);
  // }

  // getDeviceList():Observable<any[]>{
  //   return this.http.get<any>(this.APIUrl+'/Device');
  // }

  // getDeviceHistory():Observable<any[]>{
  //   return this.http.get<any>(this.APIUrl+'/DeviceHistory');
  // }

  // private httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   })
  // };

  // getLaps(): Observable<any> {
  //   return this.http.get(this.APIUrl+'/DeviceHistory', this.httpOptions).pipe(
  //     map(this.extractData));
  // }
  // private extractData(res: Response) {
  //   return res || {}; // If 'res' is null, it returns empty object
  // }

  // addDevice(val:any){
  //   return this.http.post(this.APIUrl+'/Device',val);
  // }

  // updateDevice(val:any){
  //   return this.http.put(this.APIUrl+'/Device',val);
  // }

  // deleteDevice(val:any){
  //   return this.http.delete(this.APIUrl+'/Device/'+val);
  // }

  getAllBandName(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/Device/GetAllBandName');
  }

  getAllModelName(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/Device/GetAllModelName');
  }

  getAllDeviceType(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/Device/GetAllDeviceType');
  }

  /*--------------------------------------------  API Job -----------------------------------*/
  getJobList(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/Job');
  }

  addJob(val: any) {
    return this.http.post(this.APIUrl + '/Job', val);
  }

  updateJob(val: any) {
    return this.http.put(this.APIUrl + '/Job', val);
  }

  deleteJob(val: any) {
    return this.http.delete(this.APIUrl + '/Job/' + val);
  }

  getAllJobType(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/JobType1');
  }

  getAllJobStatus(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/JobStatus1');
  }

  /*--------------------------------------------  API Customer -----------------------------------*/
  getAllCustomer(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/Customer');
  }

  /*----------------------------------------  API Import File -----------------------------------*/
  getImportFile(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/ImportFile');
  }

  UploadExcelOpenJob(val: any) {
    console.log(this.APIUrl + '/importfile/ExcelFileReader', val);
    return this.http.post(this.APIUrl + '/importfile/ExcelFileReader', val);
  }

  /*----------------------------------------  API Device and Stock -----------------------------------*/
  UploadExcelDeviceHistory(val: any, tmp: any) {
    console.log(this.APIUrl + '/DeviceHistory/ImportDriverInStock/' + val);
    return this.http.post(this.APIUrl + '/DeviceHistory/ImportDriverInStock/' + tmp.get('p1') + '/' + this.userLogin, val);
  }

  checkFileBeforeImport(val: any) {
    console.log(this.APIUrl + '/JobTacking/CheckFileImport/' + val);
    return this.http.post(this.APIUrl + '/JobTacking/CheckFileImport/' + this.userLogin, val);
  }

  uploadFileJobTacking(val: any) {
    console.log(this.APIUrl + '/JobTacking/ImportJobTacking/' + val);
    return this.http.post(this.APIUrl + '/JobTacking/ImportJobTacking/' + this.userLogin, val);
  }
  /*
    getAllDeviceType():Observable<any[]>{
      return this.http.get<any[]>(this.APIUrl+'/Device/GetAllDeviceType');
    }
  */
}