import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DataService } from './data.service';

@Injectable()
export class TokenService {

  private tokenSource = new BehaviorSubject<string>("init token");
  adminAuthToken = this.tokenSource.asObservable();

  private minerTypeSource = new BehaviorSubject<string>("init type");
  minerType = this.minerTypeSource.asObservable();

  constructor(private dataService:DataService) { }

  // Called in app component to initialize Behaviour Subjects. Other
  // components will observe the source's value through a proxy variable
  // of the source as an observable
  initAdminInfo(){
    this.dataService.getAdminInfo().subscribe((info) => {
      this.tokenSource.next(info.adminAuthToken);
      this.minerTypeSource.next(info.minerType);
    });
  }

}
