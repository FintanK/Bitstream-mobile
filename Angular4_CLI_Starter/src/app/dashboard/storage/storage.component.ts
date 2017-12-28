import { Component, OnInit } from '@angular/core';
import * as WebTorrent from 'webtorrent'
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.scss']
})
export class StorageComponent {

  searchTerm: string;
  results: any;
  activeTorrentInfo: string;
  progress: any;
  tor_client: any;
  torrents:any[];

  constructor(private http: HttpClient) {
    this.torrents = [];
    this.activeTorrentInfo = '';

    /**
     * WebTorrent Client Set Up
     */
    this.tor_client = new WebTorrent();

    this.tor_client.on('error', function (err) {
      console.error('ERROR: ' + err.message)
    });

    this.tor_client.on('torrent', function (torrent) {

      this.activeTorrentInfo = 'Torrent info hash: ' + torrent.infoHash + ' ' +
        '<a href="' + torrent.magnetURI + '" target="_blank">[Magnet URI]</a> ' +
        '<a href="' + torrent.torrentFileBlobURL + '" target="_blank" download="' + torrent.name + '.torrent">[Download .torrent]</a>';

      torrent.on('download', function (bytes) {
        console.log('just downloaded: ' + bytes);
        console.log('total downloaded: ' + torrent.downloaded);
        console.log('download speed: ' + torrent.downloadSpeed);
        console.log('progress: ' + torrent.progress)
      });

      // Print out progress every 5 seconds
      let interval = setInterval(function () {
        console.log('Progress: ' + (torrent.progress * 100).toFixed(1) + '%')
        this.progress = (torrent.progress * 100).toFixed(1);
      }, 5000);

      torrent.on('done', function () {
        console.log('Progress: 100%')
        clearInterval(interval)
      });

      torrent.on('noPeers', function (announceType) {
        console.log('No peers for this torrent ;(');
      });

    });

  }

  addTorrent() {
    let torrentId = (<HTMLInputElement>document.querySelector('input[name=torrentId]')).value;
    this.tor_client.add(torrentId, null, function (torrent) {
      // Got torrent metadata!
      console.log('Client is downloading:', torrent.infoHash)

      torrent.files.forEach(function (file) {
        // Display the file by appending it to the DOM. Supports video, audio, images, and
        // more. Specify a container element (CSS selector or reference to DOM node).
        file.appendTo('.results')
      });
    });
    console.log(this.tor_client);
    this.results = [];
  }

  formatSizeUnits(bytes){
    if      (bytes>=1073741824) {bytes=(bytes/1073741824).toFixed(2)+' GB';}
    else if (bytes>=1048576)    {bytes=(bytes/1048576).toFixed(2)+' MB';}
    else if (bytes>=1024)       {bytes=(bytes/1024).toFixed(2)+' KB';}
    else if (bytes>1)           {bytes=bytes+' bytes';}
    else if (bytes==1)          {bytes=bytes+' byte';}
    else                        {bytes='0 byte';}
    return bytes;
  }

}
