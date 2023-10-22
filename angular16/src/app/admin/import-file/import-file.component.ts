import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-import-file',
  templateUrl: './import-file.component.html',
  styleUrls: ['./import-file.component.css']
})

export class ImportFileComponent implements OnInit{
 
  constructor(private service:SharedService) { }

  ImpotJobList:any=[];
  ExcelFileName:string="";
  ExcelFilePath:string="";
  ModalTitle:string="";
  ActivateAddEditEmpComp:boolean=false;
  impFile:any;

  ngOnInit(): void {
    this.refreshImportJobList();
    //console.log("xxxxxxx");
  }

  refreshImportJobList(){
    this.service.getImportFile().subscribe(data => {
      this.ImpotJobList=data;
    });

    // this.service.getEmpList().subscribe(data=>{
    //   this.ImpotJobList=data;
    // });
  }

  tmp: string = "";
  uploadFile(event:any){
    var file=event.target.files[0];
    const formData:FormData=new FormData();
    formData.append('uploadedFile',file,file.name);

    // console.log(file);
    // console.log(formData);

    this.service.UploadExcelOpenJob(formData).subscribe((data:any)=>{
      this.ExcelFileName=data.toString();
      this.ExcelFilePath=this.service.ExcelUrl+this.ExcelFileName;
      
      this.tmp = data.toString();
      alert(data.toString());
      if (this.tmp.substring(0,1) == "I") this.refreshImportJobList();  
      this.tmp = "";
    })
  }

  ShowDetailClick(item:any){
    console.log(item);
    this.impFile=item;
    this.ModalTitle="Import Job Detail";
    this.ActivateAddEditEmpComp=true;
  }

  ApprovClick(item:any){
    // if(confirm('Are you sure??')){
    //   this.service.deleteEmployee(item.EmployeeID).subscribe(data=>{
    //     alert(data.toString());
    //     this.refreshImportJobList();
    //   })
    // }
  }

  closeClick(){
    this.ActivateAddEditEmpComp=false;
    // this.refreshEmpList();
  }

  checkAllCheckBox(ev: any) { // Angular 13
		this.ImpotJobList.forEach((x:any) => x.checked = ev.target.checked)
	}

	isAllCheckBoxChecked() {
		return this.ImpotJobList.every((p:any) => p.checked);
	}

}

/* ---------------------------- Import File type 1
import { Component, ViewChild } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-import-file',
  templateUrl: './import-file.component.html',
  styleUrls: ['./import-file.component.css']
})

export class ImportFileComponent {
  @ViewChild('fileInput')
  fileInput:any;

  file: File | null = null;

  constructor(private service:SharedService) { }

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
*/
