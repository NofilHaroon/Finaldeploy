import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class SharedService {
  readonly APIUrl = "http://127.0.0.1:8000";
  // readonly APIUrl = "https://mimmarbackend3.herokuapp.com/";
  readonly ThumbnailUrl = "http://127.0.0.1:8000/media/";

  constructor(private http: HttpClient) { }

  extra_info: listing_service = {
    ListingId: 1,
    ListingId__Book: false,
    ListingId__Category: "string",
    ListingId__Charges: 1000,
    ListingId__Description: "string",
    ListingId__Thumbnail: "string",
    ListingId__Title: "string",
    ListingbookingID: 1,
    ListingbookingID__Date: "2021-05-10",
    Time: "9:00 am",
    TimeslotID: 1
  };

  getServiceList(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/service/');
  }

  addService(val: any) {
    return this.http.post(this.APIUrl + '/service/', val);
  }

  updateService(val: any) {
    return this.http.put(this.APIUrl + '/service/', val);
  }

  deleteService(val: any) {
    return this.http.delete(this.APIUrl + '/service/' + val);
  }

  getAllServices(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/service/');
  }

  getBooking(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/booking/');
  }

  addBooking(val: any) {
    return this.http.post(this.APIUrl + '/booking/', val);
  }


  getListing(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/listing/');
  }

  addListing(val: any) {
    return this.http.post(this.APIUrl + '/listing/', val);
  }

  updateListing(val: any) {
    return this.http.put(this.APIUrl + '/listing/', val);
  }

  deleteListing(val: any) {
    return this.http.delete(this.APIUrl + '/listing/' + val);
  }

  getAllListings(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/listing/');
  }

  UploadPhoto(val: any) {
    return this.http.post(this.APIUrl + '/SaveFile', val);
  }

  getTimeslot(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/timeslot/');
  }

  getBuyer(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/buyer/');
  }

  addBuyer(val: any) {
    return this.http.post(this.APIUrl + '/buyer/', val);
  }

  getPayment(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/payment/');
  }

  getListingslot(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/listingtimeslot/');
  }

  addPayment(val: any) {
    return this.http.post(this.APIUrl + '/payment/', val);
  }

  sendEmail(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/email/');
  }

  set_extra(str: listing_service) {
    this.extra_info = str;
  }

  get_info() {
    return this.extra_info;
  }

  getData(): Observable<any> {
    const url = 'https://randomuser.me/api/?results=100'
    return this.http.get<any>(url)
  }

}

export interface listing_service {
  ListingId: number,
  ListingId__Book: boolean,
  ListingId__Category: string,
  ListingId__Charges: number,
  ListingId__Description: string,
  ListingId__Thumbnail: string,
  ListingId__Title: string,
  ListingbookingID: number,
  ListingbookingID__Date: string,
  Time: string,
  TimeslotID: number
}