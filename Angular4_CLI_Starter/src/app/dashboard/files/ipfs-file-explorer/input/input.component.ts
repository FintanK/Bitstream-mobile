import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {EmailService} from './../email.service';
import {IpfsService} from '../ipfs.service';

export interface Torrent {
  hash: string;
  path: string;
  size: number;
}

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  data: any;
  hashes: any;
  name: string;
  parentSize: any;
  file: any;
  temp: any;
  submit: boolean;
  submitResponse: boolean;
  form: boolean;
  progress: number;
  showUpdate: boolean;

  uploadedFiles: any;
  torrents: any;

  constructor(private emailService: EmailService, private ipfsService: IpfsService) {

    this.data = {
      to: '',
      from: '',
      hashes: ''
    }

  }

  ngOnInit() {
    this.hashes = [];
    this.file = [];
    this.submit = false;
    this.submitResponse = false;
    this.form = true;
    this.progress = this.ipfsService.progress;
    this.showUpdate = false;
    this.uploadedFiles = localStorage.getItem('uploadedFiles') ? JSON.parse(localStorage.getItem('uploadedFiles')) : [];

    this.getTransfer();

  };

  getTransfer() {
    setInterval(() => this.progress = this.ipfsService.progress), 500;
  }

  refresh() {
    this.hashes = [];
    this.file = [];
    this.submit = false;
    this.submitResponse = false;
    this.form = true;
    this.data.to = '';
    this.data.from = '';
    this.showUpdate = false;
  }

  upload = ($event) => {
    if (this.file.length < 1) {
      this.showUpdate = true;
      var file = $event.target.files[0];

      console.log('Selected file');
      console.log(file);
      console.log(this.torrents);

      this.name = file.name;
      this.parentSize = file.size;
      this.ipfsService.uploadIPFS(file)
        .then((torrent : Torrent) => {
          console.log(torrent.path);
          this.uploadedFiles.unshift({
            "name": file.name,
            "type": file.type,
            "url" : torrent.path
          });

          localStorage.setItem('uploadedFiles', JSON.stringify(this.uploadedFiles))

        });
    }
    else {
      alert("Sorry, still uploading previous file!")
    }
  }

  deleteFile(file) {
    let files = JSON.parse(localStorage.getItem('uploadedFiles'));
    let index = this.uploadedFiles.indexOf(file);
    if(files && index !== -1) {
      files.splice(index, 1);
      this.uploadedFiles.splice(index, 1);
    } else {
      alert("This file no longer exists");
    }
    localStorage.removeItem('uploadedFiles');
    this.uploadedFiles = files;
    localStorage.setItem('uploadedFiles', files.stringify());
  }
}
