import { Component, OnInit } from '@angular/core';
import {SharedService} from 'src/app/shared.service';
import { EmployeeClass } from 'src/app/model/employee-class.model';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit {

  constructor(private service:SharedService) { }

  EmployeeList:any=[];

  ModalTitle:string="";
  ActivateAddEditEmpComp:boolean=false;
  emp:any;

  ngOnInit(): void {
    this.refreshEmpList();
  }

  addClick(){
    this.emp={
      ID:0,
      PID:"",
      EmployeeName:"",
      Department:"",
      RegistDate:"",
      PhotoFileName:"anonymous.png"           
    }
    this.ModalTitle="Add Employee";
    this.ActivateAddEditEmpComp=true;

  }

  editClick(item:any){
    console.log(item);
    this.emp=item;
    this.ModalTitle="Edit Employee";
    this.ActivateAddEditEmpComp=true;
  }

  deleteClick(item:any){
    if(confirm('Are you sure??')){
      this.service.deleteEmployee(item.ID).subscribe(data=>{
        alert(data.toString());
        this.refreshEmpList();
      })
    }
  }

  closeClick(){
    this.ActivateAddEditEmpComp=false;
    this.refreshEmpList();
  }


  refreshEmpList(){
    this.service.getEmpList().subscribe(data=>{
      this.EmployeeList=data;
    });
  }

  employees: EmployeeClass[] = [
    new EmployeeClass(1, "john", "sedwik", 5000),
    new EmployeeClass(2, "Ram", "Kumar", 6000),
    new EmployeeClass(3, "Fran", "andrew", 10000)
  ];
}
