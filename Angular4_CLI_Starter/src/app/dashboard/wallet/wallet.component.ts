import { Component, OnInit } from '@angular/core';
import * as bitcoin from 'bitcoinjs-lib';

/**
 *
 *   The wallet component (serverless)
 *   https://github.com/bitcoinjs/bitcoinjs-lib
 */

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {

  BTC_PRIVATE_KEY : string;
  BTC_PUBLIC_KEY : string;
  LTC_PRIVATE_KEY : string;
  LTC_PUBLIC_KEY: string;

  constructor() { }

  ngOnInit() {
    this.BTC_PRIVATE_KEY = localStorage.getItem('btc_private_key');
    this.BTC_PUBLIC_KEY = localStorage.getItem('btc_public_key');
    this.LTC_PRIVATE_KEY = localStorage.getItem('ltc_private_key');
    this.LTC_PUBLIC_KEY = localStorage.getItem('ltc_public_key');
  }

  setUpBitcoinWallet() {
    let keyPair = bitcoin.ECPair.makeRandom();
    // Print your private key (in WIF format)
    console.log(keyPair.toWIF());
    this.BTC_PRIVATE_KEY = keyPair.toWIF();
    localStorage.setItem('btc_private_key', this.BTC_PRIVATE_KEY);
    // Print your public key address
    console.log(keyPair.getAddress())
    this.BTC_PUBLIC_KEY = keyPair.getAddress();
    localStorage.setItem('btc_public_key', this.BTC_PUBLIC_KEY);
  }

  setupLitecoinWallet () {
    let litecoin = bitcoin.networks.litecoin;
    let keyPair = bitcoin.ECPair.makeRandom({ network: litecoin });
    let wif = keyPair.toWIF();
    console.log(wif);
    this.LTC_PRIVATE_KEY = wif;
    localStorage.setItem('ltc_private_key', this.LTC_PRIVATE_KEY);
    let address = keyPair.getAddress();
    // Print your public key address
    console.log(address);
    this.LTC_PUBLIC_KEY = address;
    localStorage.setItem('ltc_public_key', this.LTC_PUBLIC_KEY);
  }

  createBitcoinTransaction () {
      var tx = new bitcoin.TransactionBuilder();

      // Add the input (who is paying):
      // [previous transaction hash, index of the output to use]
      var txId = 'aa94ab02c182214f090e99a0d57021caffd0f195a81c24602b1028b130b63e31';
      tx.addInput(txId, 0);

      // Add the output (who to pay to):
      // [payee's address, amount in satoshis]
      tx.addOutput("1Gokm82v6DmtwKEB8AiVhm82hyFSsEvBDK", 15000);

      // Initialize a private key using WIF
      var privateKeyWIF = 'L1uyy5qTuGrVXrmrsvHWHgVzW9kKdrp27wBC7Vs6nZDTF2BRUVwy';
      var keyPair = bitcoin.ECPair.fromWIF(privateKeyWIF);

      // Sign the first input with the new key
      tx.sign(0, keyPair);

      // Print transaction serialized as hex
       console.log(tx.build().toHex());
      // => 0100000001313eb630b128102b60241ca895f1d0ffca21 ...

      // You could now push the transaction onto the Bitcoin network manually
      // (see https://blockchain.info/pushtx)
  }

}
