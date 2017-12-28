import { Component } from '@angular/core';
import { IpfsService } from "../files/ipfs-file-explorer/ipfs.service";

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent {

  uploadedPhotos: any;
  uploadedFiles: any;

  constructor(private ipfsService: IpfsService) {
    this.uploadedFiles = localStorage.getItem('uploadedFiles') ? JSON.parse(localStorage.getItem('uploadedFiles')) : null;
    this.uploadedPhotos = [];

    if (this.uploadedFiles) {
      for (let i = 0; i <= this.uploadedFiles.length; i++) {
        if (this.uploadedFiles[i] && this.uploadedFiles[i].name && this.isImage(this.uploadedFiles[i].name)) {
          this.uploadedPhotos.push(this.uploadedFiles[i]);
        }
      }
    }
  }

  isImage(type: string) {
    return type.indexOf('jpg') > 0 ||
      type.indexOf('jpeg') > 0||
      type.indexOf('png') > 0 ||
      type.indexOf('ico') > 0;
  }

}
