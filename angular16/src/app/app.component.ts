import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'E & W Co.,Ltd.';

  constructor(public service: SharedService){}
  ngOnInit(): void {
    this.service.findReference();
  }
}
