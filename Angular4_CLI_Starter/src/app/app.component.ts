import { Component } from '@angular/core';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {

  uploadedFiles: any;

  constructor() {
    this.uploadedFiles = localStorage.getItem('uploadedFiles') ? JSON.parse(localStorage.getItem('uploadedFiles')) : [];
  }

}
