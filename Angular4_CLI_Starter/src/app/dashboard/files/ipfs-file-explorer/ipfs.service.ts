import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import webtorrent from 'webtorrent';
import {Buffer} from 'buffer';
import IPFS from 'ipfs';
import {bs58} from 'bs58'
import {Importer} from 'ipfs-unixfs-engine';
import streamBuffers from 'stream-buffers';
import { JSEncrypt } from './utilities/jsencrypt'

export interface IPFSResource {
  path: string;
  hash: string;
}

/**
 * https://www.youtube.com/watch?v=iywaBOMvYLI
 */

@Injectable()
export class IpfsService {
  private_key: any;
  public_key: any;
  public_key_ipfs_path: any;
  convergence: any;
  encrypt: any;
  encrypted: any;
  client: any;
  http: Http;
  ipfs_node: any;
  progress: number;

  enc: any;
  dec: any;

  constructor(http: Http) {
    this.http = http;
    this.client = new webtorrent();

    this.ipfs_node = new IPFS({
      repo: 'repo-' + Math.random(),
      init: true, // default
      // init: false,
      // init: {
      //   bits: 1024 // size of the RSA key generated
      // },
      start: true,
      // start: false,
      EXPERIMENTAL: { // enable experimental features
        pubsub: true,
        sharding: true, // enable dir sharding
        dht: true // enable KadDHT, currently not interopable with go-ipfs
      },
      config: { // overload the default IPFS node config
        Addresses: {
          Swarm: [
            '/ip4/127.0.0.1/tcp/5001'
          ]
        }
      },
      libp2p: { // add custom modules to the libp2p stack of your node
        modules: {}
      }
    });

    // Events
    this.ipfs_node.on('ready', (status) => {
      console.log(status);
    })   ; // Node is ready to use when you first create it
    this.ipfs_node.on('error', (err) => {}); // Node has hit some error while initing/starting
    this.ipfs_node.on('init', () => {});    // Node has successfully finished initing the repo
    this.ipfs_node.on('start', () => {});   // Node has started
    this.ipfs_node.on('stop', () => {});    // Node has stopped

    // // Our encryption library for storing all files ( Security layer )
    this.encrypt = new JSEncrypt();
  }

  createNewConvergence = (private_key) => {

    this.encrypt.setPrivateKey(private_key);

    const convergence = {
      "schema" : "convergence" ,
      "files" : "<convergence_encrypted_directory_ipfs_hash>",
    };

    // Encrypt the data with the public key.
    this.enc = this.encrypt.encrypt(JSON.stringify(convergence));

    console.log('Performing encryption test in browser.');
    console.log(this.enc);

    let data = new Blob([JSON.stringify(this.enc)],{type:'text/plain'});

    this.uploadIPFS(data).then((response : IPFSResource) => {

      console.log(response);

      // this.dec = this.encrypt.decrypt(JSON.parse(data));
      // // Now a simple check to see if the round-trip worked.
      // if (this.dec) {
      //   alert('Encryption working properly in this browser. Creating convergence (encrypted merkel tree on IPFS)');
      //   console.log(this.dec);
      // } else {
      //   alert('Something went wrong with the encryption');
      // }
    });

    // Add a retrieve verifications

    // this.ipfs_node.files.add(this.enc, (ipfs_hash) => {

    // });
  }

  loadConvergenceFromIPFSHash = (public_key_ipfs_path) => {
    return this.ipfs_node.cat(public_key_ipfs_path, (encrypted) => {
      // Now decrypt the crypted text with the private key.
      this.dec = this.encrypt.decrypt(encrypted);

      // Convert from string back to JSON
      const decrypted_convergence = JSON.parse(this.dec);

      // Now a simple check to see if the round-trip worked.
      if (decrypted_convergence) {
        alert('Encryption working properly in this browser. Creating convergence (encrypted merkel tree on IPFS)');
        console.log(decrypted_convergence);
      } else {
        alert('Something went wrong with the encryption');
      }
    });
  }

  uploadIPFS = (fileObj) => {
    console.log('----------')
    console.log(fileObj);
    console.log('----------')
    return new Promise((resolve, reject) => {
      this.client.seed(fileObj, (torrent) => {
        torrent.files[0].getBuffer((err, buffer) => {

          this.progress = 0;
          let myReadableStreamBuffer = new streamBuffers.ReadableStreamBuffer({
            chunkSize: 900000   //determines data transfer rate
          });
          this.ipfs_node.files.createAddStream((err, stream) => {
            console.log('ERR', err)
            console.log('STREAM', stream)
            stream.on('data', (file) => {
              console.log('FILE', file)
              resolve(file);
            })
            console.log('WRITE');
            myReadableStreamBuffer.on('data', (chunk) => {
              this.progress += chunk.byteLength
              console.log('Progress', this.progress);

              myReadableStreamBuffer.resume()

            });

            stream.write(myReadableStreamBuffer);

            myReadableStreamBuffer.put(Buffer.from(buffer))
            myReadableStreamBuffer.stop()

            myReadableStreamBuffer.on('end', () => {
              console.log('stream ended.')
              stream.end()
            })
            myReadableStreamBuffer.resume()
          })

        })
      });
    });
  }

}
