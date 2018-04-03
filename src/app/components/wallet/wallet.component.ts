import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { TokenService } from '../../services/token.service';
import {ToastService} from '../../services/toast.service';
import * as R from 'ramda';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {
  // Observed Variables (from TokenService)
  token: string;
  isAuthenticated: boolean;

  // Card data
  balance: number;
  balanceInDollars: number;

  // Wallet table data
  wallets: Wallet[];

  // Input Box Filler
  tokenInput = '';

  // Export text area
  exportOutput = 'Data Will Appear Here';

  constructor(private dataService: DataService,
              private tokenService: TokenService,
              private toastService: ToastService) {}

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
      if (isAuthenticated) {
        // Fetch the data since token was validated with no problem.
        this.fetchWalletData();
      } else {
        // isAuthenticated is false. Wipe the input box and prompt for correct token.
        this.tokenInput = '';
      }

      // Update component's value of isAuthenticated
      this.isAuthenticated = isAuthenticated;
    });
  }

  generateWallet(password, confirmPassword) {
    // First check to make sure password and confirmPassword match
    if (password !== confirmPassword) {
      // Reissue modal indicating mismatch
      this.toastService.show('danger', 'Mismatched Passwords.', 'Confirm password and password do not match.', 3);
      return;
    }

    // Execute request to add wallet using provided password
    this.dataService.addWallet(password, this.token).subscribe((data) => {
      // Add the returned wallet to the view if wallet creation is successful
      this.wallets.push(data.wallet);
      this.toastService.show('success', 'Wallet Added.', `New wallet with address ${data.wallet.address} added!`, 4);
    });
  }

  exportWalletKeys(walletId) {
    this.dataService.getWalletKeys(walletId, this.token).subscribe((data) => {
      // Put data in display area for extraction
      this.exportOutput = JSON.stringify(data.keys, null, '\t');

      // Toast
      this.toastService.show('success', 'Keys Exported.', `Keys for wallet with ${walletId} exported. You may access them below.`, 6);
    });
  }

  exportAllWallets() {
    this.dataService.exportWallets(this.token).subscribe((data) => {
      // Put data in display area for extraction
      this.exportOutput = JSON.stringify(data.wallets, null, '\t');

      // Toast
      this.toastService.show('success', 'Wallets Exported.', `You may access them in the output area below.`, 6);
    });
  }

  withdrawFromWallets() {
    console.log('Request to withdraw funds for wallet(s)');
    this.wallets.forEach(function(wallet) {
      console.log(wallet.id);
    });
  }

  withdrawFromWallet(walletId) {
    console.log('Request to withdraw funds for wallet ' + walletId);
  }

  deleteWallet(walletId) {
    // Get index of wallet to delete
    const walletIndex = R.findIndex(R.propEq('id', walletId))(this.wallets);
    const walletAddress = this.wallets[walletIndex].address;

    this.dataService.deleteWallet(walletId, this.token).subscribe((data) => {
      // Tell user status of deletion
      console.dir(data.deletionStatus);

      // Remove wallet from view
      this.wallets.splice(walletIndex, 1);

      // Toast
      this.toastService.show('success', 'Wallet Deleted.', `Wallet with address ${walletAddress} deleted.`, 5);
    });
  }

  /***************************************************************************/

  // Takes in the input token and updates the token service with the value so all
  // observers will see the change
  setToken(tokenIn) {
    // Set the new token
    this.tokenService.setToken(tokenIn);
  }

  fetchWalletData() {
    // Fetch wallets
    this.dataService.getWalletsInfo(this.token).subscribe((data) => {
      this.wallets = data.wallets;

      // Calculate balance data and populate other variables
      this.balance = getSumOfAllWallets(this.wallets);
      this.balanceInDollars = convertPOLtoUSD(this.balance);
    });
  }

  clearOutput(){
    this.exportOutput = 'Data Will Appear Here';
  }

}

function getSumOfAllWallets(wallets) {
  let sum = 0;
  wallets.forEach(function(wallet) {
    sum += wallet.balance;
  });
  return sum;
}

function convertPOLtoUSD(polVal) {
  return Math.round((polVal / 9.987) * 100) / 100;
}

interface Wallet {
  id: string;
  address: string;
  balance: number;
}
