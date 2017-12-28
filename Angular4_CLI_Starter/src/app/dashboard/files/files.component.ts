import {Component} from '@angular/core';

export interface ConvergenceFile {
  name: string;
  extension: string;
  ipfshash: string;
}

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent {

  convergence: any;

  constructor() {

      this.convergence = {

        "files": [
          {
            "name": "London Timelapses",
            "pinned": "2017-11-12 12:34 GMT",
            "extension": "mp4",
            "url": "https://ipfs.io/ipfs/QmS8dtyZwNCj9rMkDy7EP2ZTdPAKhuvPtz6xZA46E2xydt"
          },
          {
            "name": "London Timelapses 2",
            "pinned": "2017-11-12 12:34 GMT",
            "extension": "mp4",
            "url": "https://ipfs.io/ipfs/QmS8dtyZwNCj9rMkDy7EP2ZTdPAKhuvPtz6xZA46E2xydt"
          }
        ],

      };

  }
}
