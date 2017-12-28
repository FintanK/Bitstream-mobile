import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import {environment} from "../../environments/environment";
import {Subscription} from "rxjs/Subscription";


/**
 *
 *   This Authentication service ensures that a session is only valid as long as
 *   the native app has a private key that can decrypt the convergence file
 *   located at an IPFS hash.
 *
 *   Once a convergence configuration is loaded the app initialises and pulls in all of the
 *   information required to restore an old session (Still working on synch strategy).
 *
 */

@Injectable()
export class AuthenticationService {

  private convergence : any;
  private merkel: any;
  private authenticated: boolean;

  constructor(private http: Http) {
    // Set configuration if found in local storage
    this.convergence = JSON.parse(localStorage.getItem('Convergence'));
  }

  isAuthenticated() : boolean {
    return localStorage.getItem('Convergence').length > 0;
  }

  /**
   *
   *     Security
   *
   *     We never keep a copy of the the user's private key. It is generated on the client and is just used to decrypt
   *     data pulled down from IPFS
   *
   *
   *     Login
   *
   *     This will only require a private and public key. When entering the private key it will only be stored locally
   *     in order for user's to have complete control over the storage of information
   *
   *
   *     New Profile
   *
   *     Private key generated on client and stored there only.
   *     Public key generated on client and stored in Convergence as an identifier for the json merkel index file
   *
   */

  login(public_key: string): any {
    this.authenticated = false;

    console.log('Attempting login with public key ' + public_key);

    // Import convergence.json file stored at the public key location
    // Populate the application configuration using
    // Login fails if a convergence.json file can't be pulled from IPFS.

    // Pull content down from IPFS hash supplied
    // Decrypt using private key
    // Populate application

  }

  newProfile(public_key: string): any {
    // Generate a brand new convergence.json file
    let Convergence = {
      "public_key" : "",

    }.toString();

    localStorage.setItem('Convergence', Convergence);
  }

  logout(): void {
    localStorage.removeItem('Convergence')
  }
}
