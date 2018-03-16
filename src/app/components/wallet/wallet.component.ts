import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {
  // Token
  token = 'NjhiNDY4NjA0ZTY3NWUxMWU3YWIzYzA5YzU1YmQyNDdiNjNiMTk2ZmQ3Yzg5ODNhYTM3NWY1ZmM0MzI1M2MzMTsxNy44LjI0My4xNDA7OTAxMQ==';

  // Card data
  balance: number;
  balanceInDollars: number;
  totalWallets: number;

  // Wallet table data
  wallets: Wallet[];

  constructor(private dataService: DataService) {}

  ngOnInit() {
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