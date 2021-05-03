import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {FormControl, Validators} from '@angular/forms';
@Component({
  selector: 'app-bookslot',
  templateUrl: './bookslot.component.html',
  styleUrls: ['./bookslot.component.css']
})
export class BookslotComponent implements OnInit {

  // constructor() { }

  constructor(private formBuilder:FormBuilder){}
  
  ngOnInit(): void {
  }
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  profileForm = this.formBuilder.group({
    firstName:[''],
    lastName:[''],
    address:[''],
    dob:[''],
    gender:['']
  });
 
  saveForm(){
    console.log('Form data is ', this.profileForm.value);
  }
}
