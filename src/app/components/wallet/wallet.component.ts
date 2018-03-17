import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {
  // Token
  token: string;

  // Card data
  balance: number;
  balanceInDollars: number;
  totalWallets: number;

  // Wallet table data
  wallets: Wallet[];

  constructor(private dataService: DataService, private tokenService: TokenService) {}

  ngOnInit() {
    // Subscribe to observable admin auth token
    this.tokenService.adminAuthToken.subscribe(adminAuthToken => {
      this.token = adminAuthToken;
    });

    // Fetch wallets
    this.dataService.getWalletsInfo(this.token).subscribe((data) => {
      this.wallets = data.wallets;

      // Calculate balance data and populate other variables
      this.balance = getSumOfAllWallets(this.wallets);
      this.balanceInDollars = convertPOLtoUSD(this.balance);
      this.totalWallets = this.wallets.length;
    });
  }

  generateWallet(password, confirmPassword){
    // First check to make sure password and confirmPassword match

    // Execute request to add wallet using provided password
    this.dataService.addWallet(password, this.token).subscribe((data) => {
      // Add the returned wallet to the view if wallet creation is successful
      console.dir(data.wallet);
    });
  }

  exportWalletKeys(walletId){
    this.dataService.getWalletKeys(walletId, this.token).subscribe((data) => {
      // Download the keys as an arbitrary file type of choice
      console.dir(data.keys);
    });
  }

  exportAllWallets(){
    this.dataService.exportWallets(this.token).subscribe((data) => {
      // Download the wallets as an arbitrary file type of choice
      console.dir(data.wallets);
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
    this.dataService.deleteWallet(walletId, this.token).subscribe((data) => {
      // Tell user status of delete
      console.dir(data.deletionStatus);
    });
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