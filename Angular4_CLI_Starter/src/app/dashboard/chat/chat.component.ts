import { Component, OnInit } from '@angular/core';
import * as Peer from 'peerjs'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {

  peerId: string;
  remotePeerId: string;
  conn: any;
  peer: any;

  constructor() {}

  createRoom() {
    this.peer = new Peer(this.peerId, {key: 'wtbo9z9g1l1ve7b9'});

    this.peer.on('connection', function(conn) {
      conn.on('data', function(data){
        // Will print 'hi!'
        console.log(data);
      });
    });

    console.log("Room created with peer ID: " + this.peerId);
  }

  connectToRoom() {

    this.peer = new Peer({key: 'wtbo9z9g1l1ve7b9'});
    this.conn = this.peer.connect(this.remotePeerId);

    this.conn.on('open', function(){
      this.conn.send('hi!');
    });

    console.log("Connected to peer ID: " + this.remotePeerId);

  }

}
