import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DataService } from './data.service';

@Injectable()
export class TokenService {

  private tokenSource = new BehaviorSubject<string>("no auth");
  adminAuthToken = this.tokenSource.asObservable();

  private minerTypeSource = new BehaviorSubject<string>("Shard");
  minerType = this.minerTypeSource.asObservable();

  private isAuthenticatedSource = new BehaviorSubject<boolean>(false);
  isAuthenticated = this.isAuthenticatedSource.asObservable();

  constructor(private dataService:DataService) {
    console.log("token service connected");
  }

  // Setters that initialize Behaviour Subjects. Other
  // components will observe the source's value through a proxy variable
  // of the source as an observable
  setToken(tokenIn){
    return new Promise((resolve, reject) => {
      // Check if token is valid
      this.dataService.checkToken(tokenIn).subscribe((res) => {
        if(res.isValid == true){
          // Token is valid.
          // Set global token.
          this.tokenSource.next(tokenIn);

          // Set isAuthenticated to true so that dashboard shows
          this.isAuthenticatedSource.next(true);

          resolve(true); // Success.
        } else {
          resolve(false); // Failed;
        } 
      });
    });
}

  setMinerType(minerType){
    this.minerTypeSource.next(minerType);
  }

  // Clears the admin auth token and sets authentication to false
  wipe(){
    this.tokenSource.next("no auth");
    this.isAuthenticatedSource.next(false);
  }

}
