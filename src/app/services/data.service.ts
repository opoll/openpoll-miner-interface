import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class DataService {

  constructor(public http:Http) {
    console.log('data service connected');
  }

  // Initially pull nodeType and adminAuthToken
  getAdminInfo(){
    return this.http.get('http://localhost:9011/admin/info')
      .map(res => res.json());
  }

}
