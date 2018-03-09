import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {
  // Card data
  balance: number;
  balanceInDollars: number;
  totalWallets: number;

  // Wallet table data
  wallets: Wallet[];

  constructor() {
    // Wallets
    this.wallets = [
      {
        id: 'a6ffed9-4252-427e-af7d-3dcaaf2db2df',
        addresses: [
          'mwVb4SJUxAoKmj3B1eQmxoEHJXY7v8izPk',
          '88dd9d005d9c3a31791455c9216d9cf3'
        ],
        balance: 265
      },
      {
        id: 'ce9d035-44c8-96a7-85c5-2dba5aad072',
        addresses: [
          'mo1fKAbgdZDnrh2CR423kvw6YLggntaRF3'
        ],
        balance: 103
      },
      {
        id: 'da492b1-c744-9bbe-d10e-cd871a65fac',
        addresses: [
          'e293e42b3bd765fad06c1ae258ca1405',
          '90671611afdd76cd015de2cd29d8a1ef',
          '96e7bbe0934446d708293f73d24ca45c'
        ],
        balance: 930
      }
    ]

    // Get balance data
    this.balance = getSumOfAllWallets(this.wallets);
    this.balanceInDollars = convertPOLtoUSD(this.balance);
    this.totalWallets = this.wallets.length;
  }

  ngOnInit() {

  }

}

function getSumOfAllWallets(wallets){
  let sum = 0;
  wallets.forEach(function(wallet) {
    sum += wallet.balance;
  });
  return sum;
}

function convertPOLtoUSD(polVal){
  return Math.round((polVal/9.987) * 100) / 100;
}

interface Wallet{
  id: string;
  addresses: string[];
  balance: number;
}