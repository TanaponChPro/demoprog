import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { DatePipe } from '@angular/common';
import { AuthService } from "src/app/services/auth.service";
import { Tokens } from "src/app/model/tokens"; 
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [DatePipe]
})
export class HeaderComponent implements OnInit {

  myDate: Date = new Date();
  myDateDisplay: any;
  UserLogin: any;
  today: number;
  tokens!: Observable<Tokens>;

  constructor(private datePipe: DatePipe, private service: SharedService, private authService: AuthService) { 
    this.myDateDisplay = this.datePipe.transform(this.myDate, 'dd/MM/yyyy');
    this.UserLogin = localStorage.getItem('USER_ROLE');
    this.today = Date.now();
  }

  ngOnInit(): void {
  }


}
