import { Component, OnInit } from '@angular/core';
import{ SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menuItems = [
    {LinkId: 1, linkname: 'Home', linkUrl: '#'},
    {LinkId: 2, linkname: 'Guide', linkUrl: 'guide'},
    // {LinkId: 3, linkname: 'Services'},
    {LinkId: 3, linkname: 'About Us', linkUrl: 'about'}
  ]

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
