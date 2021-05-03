import { Component, OnInit } from '@angular/core';
import { SharedService, listing_service } from 'src/app/shared.service';
import { TestService } from '../test.service';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

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

  ListingId__Charges: string = "";
  ListingId__Description: string = "";
  ListingId__Thumbnail: string = "";
  ListingId__Title: string = "";
  ListingbookingID__Date: string = "";
  Book: boolean = true;
  Time: string = "";


  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  choose = new FormGroup({
    start: new FormControl()
    // end: new FormControl()
  });

  show: boolean = false;
  flag: boolean = false;
  email1: any = [];

  constructor(private formBuilder: FormBuilder, private service: SharedService, private RandomUser: SharedService, private test_service: SharedService, private router: Router) { }

  profileForm = this.formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    date: ['', [Validators.required]],
    address: ['', [Validators.required]],
    timeslot: ['', [Validators.required]]
  });
  strikeCheckout: any = null;
  Listinginfo: any = [];
  Buyerinfo: any = [];
  lastbuyer: any = [];
  Bookinginfo: any = [];
  Thumbnail: string = "";
  ThumbnailPath: string = "";
  Path_Thumbnail: string = "assets\\Cards\\";
  email = new FormControl('', [Validators.required, Validators.email]);

  ngOnInit(): void {
    this.info = this.test_service.get_info();
    console.log(this.info);

    this.service.getListingslot().subscribe(data => {
      this.Listinginfo = data;
      console.log(this.Listinginfo);
      for (var i = 0; i < this.Listinginfo.length; i++) {
        if (this.Listinginfo[i].ListingId == this.info.ListingId &&
          this.Listinginfo[i].TimeslotID == this.info.TimeslotID &&
          this.Listinginfo[i].ListingbookingID == this.info.ListingbookingID) {
          var val = {
            ListingId__Charges: this.Listinginfo[i].ListingId__Charges,
            ListingId__Description: this.Listinginfo[i].ListingId__Description,
            ListingId__Thumbnail: this.Listinginfo[i].ListingId__Thumbnail,
            ListingId__Title: this.Listinginfo[i].ListingId__Title,
            ListingbookingID__Date: this.Listinginfo[i].ListingbookingID__Date,
            Book: true,
            Time: this.Listinginfo[i].Time,
          };
          this.service.updateListing(val).subscribe(res => {
            alert(res.toString());
          });

        }
      }
    });

    this.stripePaymentGateway();
    this.getbuyer();
  }

  updatelisting() {
    var val = {
      ListingId__Charges: this.ListingId__Charges,
      ListingId__Description: this.ListingId__Description,
      ListingId__Thumbnail: this.ListingId__Thumbnail,
      ListingId__Title: this.ListingId__Title,
      ListingbookingID__Date: this.ListingbookingID__Date,
      Book: this.Book,
      Time: this.Time,
    };
    this.service.updateListing(val).subscribe(res => {
      alert(res.toString());
    });
  }

  refreshListing() {
    this.service.getListing().subscribe(data => {
      this.Listinginfo = data;
    });
  }

  getbuyer() {
    this.service.getBuyer().subscribe(data => {
      this.Buyerinfo = data;
      this.lastbuyer = this.Buyerinfo[this.Buyerinfo.length - 1];
    });
  }

  Email() {
    this.service.sendEmail().subscribe(data => {
      this.email1 = data;
    });
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
    
    this.Email();
    
    strikeCheckout.open({
      name: 'Stripe Payment Gateway',
      description: 'Payment widgets',
      amount: (amount / 153) * 100
    });
    this.router.navigate(['../thankyou']);
  }

  booking() {
    this.service.getBooking().subscribe(data => {
      this.Bookinginfo = data;
    });
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
      // console.log(false)
    }
    // console.log('Form data is ', this.profileForm.value);
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
