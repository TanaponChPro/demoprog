import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-dep',
  templateUrl: './add-edit-dep.component.html',
  styleUrls: ['./add-edit-dep.component.css']
})
export class AddEditDepComponent implements OnInit {

  constructor(private service:SharedService) { }

  @Input() dep:any;
  DepartmentID:number=0;
  DepartmentName:string="";

  ngOnInit(): void {
    this.DepartmentID=this.dep.DepartmentId;
    this.DepartmentName=this.dep.DepartmentName;
    console.log(this.dep['DepartmentID']);
  }

  addDepartment(){
    var val = {DepartmentId:this.DepartmentID,
                DepartmentName:this.DepartmentName};
    this.service.addDepartment(val).subscribe(res=>{
      alert(res.toString());
    });
  }

  updateDepartment(){
    var val = {DepartmentId:this.DepartmentID,
                DepartmentName:this.DepartmentName};
    this.service.updateDepartment(val).subscribe(res=>{
      alert(res.toString());
    });
  }
}
