import { Component, OnInit, Input } from '@angular/core';
import { SharedService, listing_service } from 'src/app/shared.service';
import { TestService } from '../test.service';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
// import { Moment } from 'moment';



@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  info: any = {
    ListingId: 1,
    ListingId__Charges: 1000,
    ListingId__Description: "string",
    ListingId__Thumbnail: "string",
    ListingId__Title: "string",
    ListingbookingID: 1,
    ListingbookingID__Date: "2021-05-10",
    Time: "9:00 am",
    TimeslotID: 1
  };

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  choose = new FormGroup({
    start: new FormControl()
    // end: new FormControl()
  });

  show: boolean = false;
  show2: boolean = false;
  isDisabled: boolean = true;

  constructor(private formBuilder: FormBuilder, private service: SharedService, private RandomUser: SharedService, private test_service: SharedService, private router: Router) { }

  @Input() buyer: any;
  // BuyerId: string = "";
  BuyerName: string = "";
  BuyerContact: string = "";
  BuyerEmail: string = "";
  BuyerAddress: string = "";


  profileForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    contact: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    address: ['', [Validators.required]],

  });

  strikeCheckout: any = null;
  Listinginfo: any = [];
  Bookinginfo: any = [];
  Thumbnail: string = "";
  ThumbnailPath: string = "";
  Path_Thumbnail: string = "assets\\Cards\\";
  email = new FormControl('', [Validators.required, Validators.email]);

  ngOnInit(): void {
    this.info = this.test_service.get_info();
    console.log(this.info);
    this.stripePaymentGateway();
    this.show2 = false;
  }

  refreshListing() {
    this.service.getListing().subscribe(data => {
      this.Listinginfo = data;
    });
  }
  accept(){
    this.isDisabled = false;
  }
  pay(amount: any) {
    const strikeCheckout = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51ImcdZBoLKyXknpZq9UIcpOC349Cx9sJmVNUYYxDQV93SWR7ZnZcZQUDI90fI6KKaXiCN1qk3BRCHsAE5NmwuuKt00r2dIncQI',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken)
        alert('Stripe token generated!');
      }
    });

    strikeCheckout.open({
      name: 'RemoteStack',
      description: 'Payment widgets',
      amount: (amount / 153) * 100
    });
  }

  booking() {
    this.service.getBooking().subscribe(data => {
      this.Bookinginfo = data;
    });
  }

  addbuyer() {
    var val = {
      // BuyerId: this.BuyerId,
      BuyerName: this.BuyerName,
      BuyerContact: this.BuyerContact,
      BuyerEmail: this.BuyerEmail,
      BuyerAddress: this.BuyerAddress
    };

    this.service.addBuyer(val).subscribe(res => {
      alert(res.toString());

      if (res.toString() == "Added Successfully!!") {
        this.show2 = true;
      }
      
      if (this.show2 == true) {
        this.router.navigate(['../Payment']);
      }
    });
  }

  uploadPhoto(event: any) {
    var file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('uploadedFile', file, file.name);

    this.service.UploadPhoto(formData).subscribe((data: any) => {
      this.Thumbnail = data.toString();
      this.ThumbnailPath = this.service.ThumbnailUrl + this.Thumbnail;
    })
  }

  send_info(test: listing_service) {
    // console.log(test)
    this.test_service.set_extra(test)
    // this.router.navigate(['../Bookslot'])
    this.show = !this.show; 
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  dateError = 'Please choose a correct date within the avaliability';
  showerr = false;
  saveForm() {
    if ((Date.parse(this.profileForm.value.date) < Date.parse(this.info.StartDate)) ||
      (Date.parse(this.profileForm.value.date) > Date.parse(this.info.EndDate))) {
      this.showerr = true;
      console.log(true);
    }
    else {
      // this.showerr = true;
      // throw Error("Please enter a correct date")
      console.log(false)
    }
    console.log('Form data is ', this.profileForm.value);
  }

  stripePaymentGateway() {
    if (!window.document.getElementById('stripe-script')) {
      const scr = window.document.createElement("script");
      scr.id = "stripe-script";
      scr.type = "text/javascript";
      scr.src = "https://checkout.stripe.com/checkout.js";

      scr.onload = () => {
        this.strikeCheckout = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51Im7cuEy802oXDM2s16FXUmRyAaIXt30Gu2AdIue8bRRtkUMtnFHiHORVgb08FptA03qFJI6pHqcNzziBCrj5OJl005k7omowz',
          locale: 'auto',
          token: function (token: any) {
            console.log(token)
            alert('Payment via stripe successfull!');
          }
        });
      }

      window.document.body.appendChild(scr);
    }
  }

}


