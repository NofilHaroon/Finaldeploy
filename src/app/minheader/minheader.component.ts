import { Component, OnInit } from '@angular/core';
import{ SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-minheader',
  templateUrl: './minheader.component.html',
  styleUrls: ['./minheader.component.css']
})
export class MinheaderComponent implements OnInit {

  constructor(private service:SharedService) { }

  ServiceList:any = [];

  ngOnInit(): void {
    this.refreshSerList();
  }

  refreshSerList(){
    this.service.getServiceList().subscribe(data => {
      this.ServiceList=data;
    });
  }

}
