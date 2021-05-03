import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor() {
  }

  extra_info : Info_service = {  title: "",
  info: "strinsag",
  rating: 1,
  image: "stringsdad"};

  set_extra(str: Info_service) {
    this.extra_info = str;
  }

  get_info() {
    return this.extra_info;
  }

}

export interface Info_service {
  title: string,
  info: string,
  rating: number,
  image: string
}