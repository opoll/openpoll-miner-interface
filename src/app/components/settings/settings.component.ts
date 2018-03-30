import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  // Observed Variables (from TokenService)
  token:string;
  minerType:string;
  isAuthenticated:boolean;

  // Input Box Filler
  tokenInput = "";

  constructor(private dataService: DataService, private tokenService: TokenService) {}

  ngOnInit() {
    // Subscribe to observable admin auth token
    this.tokenService.adminAuthToken.subscribe(adminAuthToken => {
      this.token = adminAuthToken;
    });

    // Subscribe to observable minerType info
    this.tokenService.minerType.subscribe(minerType => {
      this.minerType = minerType;
    });

    // Subscribe to observable isAuthenticated
    this.tokenService.isAuthenticated.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  // Takes in the input token and updates the token service with the value so all
  // observers will see the change
  setToken(tokenIn){
    // Set the new token and extract result
    this.tokenService.setToken(tokenIn).then((isTokenValid) => {
      if(!isTokenValid){
        // Wipe input box and prompt user to input a valid token
        this.tokenInput = "";
      }
    });
  }

  // Takes in the minerType and updates token service so all observers get the change
  setMinerType(minerType){
    if(minerType == "Shard"){
      this.tokenService.setMinerType("Mainchain");
    } else {
      this.tokenService.setMinerType("Shard");
    }
  }

  // Lock the dashboard and destroy the admin auth token
  lockDashboard(){
    this.tokenService.wipe();
  }

}
