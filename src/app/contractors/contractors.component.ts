import { Component, OnInit } from '@angular/core';
import{ SharedService, listing_service } from 'src/app/shared.service';
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'app-contractors',
  templateUrl: './contractors.component.html',
  styleUrls: ['./contractors.component.css']
})
export class ContractorsComponent implements OnInit {

  totalRecords: string = "";
  page:number=1

  Listinginfo:any = [];
  Listinginfo_i:any = [];
  Path_Thumbnail:string="assets\\Cards\\";

  constructor (private service:SharedService, private RandomUser:SharedService , private test_service: SharedService, private router: Router){}

  ngOnInit(): void {
    this.refreshListing();
  }

  refreshListing(){
    this.service.getListing().subscribe(data => {
      this.Listinginfo=data;
    
    for (let i = 0; i < this.Listinginfo.length; i++)
    {
      console.log(this.Listinginfo[i].Category);
      if(this.Listinginfo[i].Category == "Contractors")
      {
        this.Listinginfo_i.push(this.Listinginfo[i]);
        // console.log(this.Listinginfo_i);
      }

    }

  });
  }

  send_info(test: listing_service) {
    // console.log(test)
    this.test_service.set_extra(test)
    this.router.navigate(['../display'])
  }

}
