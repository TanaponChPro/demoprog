import { Component, OnInit, ViewChild } from '@angular/core';
import {SharedService} from 'src/app/shared.service';

@Component({
  selector: 'app-show-job',
  templateUrl: './show-job.component.html',
  styleUrls: ['./show-job.component.css']
})
export class ShowJobComponent implements OnInit {

  constructor(private service:SharedService) { }

  JobList:any=[];

  ModalTitle:string="";
  ActivateAddEdit:boolean=false;
  tmp:any; //for show dialog

  JobIDFilter:string="";
  JobNameFilter:string="";
  JobListWithoutFilter:any=[];

  ngOnInit(): void {
    this.refreshDepList();
  }

  deleteClick(item:any){
    if(confirm('Are you sure??')){
      this.service.deleteJob(item.JobID).subscribe(data=>{
        alert(data.toString());
        this.refreshDepList();
      })
    }
  }

  addClick(){

  }

  closeClick(){

  }

  importClick(){

  }
  
  refreshDepList(){
    this.service.getJobList().subscribe(data=>{
      this.JobList=data;
      this.JobListWithoutFilter=data;
    });
  }

  @ViewChild('fileInput')
  fileInput:any;

  file: File | null = null;

  onClickFileInputButton(): void {
    this.fileInput.nativeElement.click();
  }

  onChangeFileInput(): void {
    const files: { [key: string]: File } = this.fileInput.nativeElement.files;
    this.file = files[0];
    console.log(this.file.name);

    // this.service.addEmployee(val).subscribe(res=>{
    //   alert(res.toString());
    // });

  }

}
