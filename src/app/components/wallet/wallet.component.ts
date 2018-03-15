import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

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

  constructor(private dataService: DataService) {
    // Wallets
    this.wallets = [
      {
        id: 'a6ffed9-4252-427e-af7d-3dcaaf2db2df',
        address: 'mwVb4SJUxAoKmj3B1eQmxoEHJXY7v8izPk',
        balance: 265
      },
      {
        id: 'da492b1-c744-9bbe-d10e-cd871a65fac',
        address: 'e293e42b3bd765fad06c1ae258ca1405',
        balance: 930
      },
      {
        id: 'e81bcf8-02d6-afea-1006-f9f02b76f',
        address: '9edc1d079f29a6e42f8edf18d56876fe',
        balance: 0
      }
    ]

    // Get balance data
    this.balance = getSumOfAllWallets(this.wallets);
    this.balanceInDollars = convertPOLtoUSD(this.balance);
    this.totalWallets = this.wallets.length;
  }

  ngOnInit() {

  }

  generateWallet(password, confirmPassword){
    console.log("Request to generate a wallet with password " + password + ". Confirm password is " + confirmPassword);
  }

  exportWalletKeys(walletId){
    console.log("Request to export wallet keys for wallet " + walletId);
  }

  exportAllWallets(){
    console.log("Request to export wallet(s)");
    this.wallets.forEach(function(wallet) {
      console.log(wallet.id);
    });
  }

  withdrawFromWallets(){
    console.log("Request to withdraw funds for wallet(s)");
    this.wallets.forEach(function(wallet) {
      console.log(wallet.id);
    });
  }

  withdrawFromWallet(walletId){
    console.log("Request to withdraw funds for wallet " + walletId);
  }

  deleteWallet(walletId){
    console.log("Request to delete wallet " + walletId);
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
  address: string;
  balance: number;
}