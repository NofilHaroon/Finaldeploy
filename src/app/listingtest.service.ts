import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListingtestService {

  constructor(private http:HttpClient) { }

  extra_info : listing_service = {  title: "",
  info: "strinsag",
  rating: 1,
  image: "stringsdad"};
  
  set_extra(str: listing_service) {
    this.extra_info = str;
  }
  
  get_info() {
    return this.extra_info;
  }

  getData(): Observable<any>{
    const url = 'https://randomuser.me/api/?results=100'
    return this.http.get<any>(url)
  }
}


export interface listing_service {
Title: string,
Description: string,
Rating: number,
Img_one: string
}