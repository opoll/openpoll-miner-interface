import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { TokenService } from '../../services/token.service';
import * as R from 'ramda';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {
  // Observed Variables (from TokenService)
  token: string;
  isAuthenticated:boolean;

  // Card data
  balance: number;
  balanceInDollars: number;

  // Wallet table data
  wallets: Wallet[];

  // Input Box Filler
  tokenInput = "";

  constructor(private dataService: DataService, private tokenService: TokenService) {}

  ngOnInit() {
    // Placeholder Data
    this.wallets = [];
    this.balance = 0;
    this.balanceInDollars = 0;

    // Subscribe to observable admin auth token
    this.tokenService.adminAuthToken.subscribe(adminAuthToken => {
      this.token = adminAuthToken;
    });

    // Subscribe to observable isAuthenticated
    this.tokenService.isAuthenticated.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  generateWallet(password, confirmPassword){
    // First check to make sure password and confirmPassword match
    if(password != confirmPassword){
      // Reissue modal indicating mismatch

    }

    // Execute request to add wallet using provided password
    this.dataService.addWallet(password, this.token).subscribe((data) => {
      // Add the returned wallet to the view if wallet creation is successful
      this.wallets.push(data.wallet);
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
    // Get index of wallet to delete
    const walletIndex = R.findIndex(R.propEq("id", walletId))(this.wallets);

    this.dataService.deleteWallet(walletId, this.token).subscribe((data) => {
      // Tell user status of deletion 
      console.dir(data.deletionStatus);

      // Remove wallet from view
      this.wallets.splice(walletIndex, 1);

    });
  }

  /***************************************************************************/

  // Takes in the input token and updates the token service with the value so all
  // observers will see the change
  setToken(tokenIn){
    // Set the new token and extract result
    this.tokenService.setToken(tokenIn).then((isTokenValid) => {
      if(isTokenValid){
        // Fetch the data if the token validated with no problems.
        // Otherwise do nothing.
        this.fetchWalletData();
      } else{
        // Invalid token.
        // Wipe input box and prompt user to input a valid token
        this.tokenInput = "";
      }
    });
  }

  fetchWalletData(){
    // Fetch wallets
    this.dataService.getWalletsInfo(this.token).subscribe((data) => {
      this.wallets = data.wallets;

      // Calculate balance data and populate other variables
      this.balance = getSumOfAllWallets(this.wallets);
      this.balanceInDollars = convertPOLtoUSD(this.balance);
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