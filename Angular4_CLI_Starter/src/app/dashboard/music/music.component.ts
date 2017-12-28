import { Component } from '@angular/core';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss']
})
export class MusicComponent {

  uploadedMusic: any;
  uploadedFiles: any;

  constructor() {
    this.uploadedFiles = localStorage.getItem('uploadedFiles') ? JSON.parse(localStorage.getItem('uploadedFiles')) : null;
    this.uploadedMusic = [];

    if (this.uploadedFiles) {
      for (let i = 0; i <= this.uploadedFiles.length; i++) {
        if (this.isAudio(this.uploadedFiles[i].name)) {
          this.uploadedMusic.push(this.uploadedFiles[i]);
        }
      }
    }
  }

  isAudio(type: string) {
    return type.indexOf('mp3') > 0 || type.indexOf('wav') > 0 || type.indexOf('ogg') > 0;
  }

}
