import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent {

  uploadedFiles: any;

  constructor() {
    this.uploadedFiles = localStorage.getItem('uploadedFiles') ? JSON.parse(localStorage.getItem('uploadedFiles')) : null;
  }

  isVideo(file: any) {
    return file.name.indexOf('mp4') > 0 ||
      file.name.indexOf('avi') > 0||
      file.name.indexOf('swf') > 0||
      file.name.indexOf('asf') > 0||
      file.name.indexOf('flv') > 0||
      file.name.indexOf('mkv') > 0
  }

}
