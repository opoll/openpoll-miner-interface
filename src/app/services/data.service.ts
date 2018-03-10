import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class DataService {

  constructor(public http:Http) {
    console.log('data service connected');
  }

  // getChainData(){
  //   return this.http.get('../data/shards.json')
  //     .map(res => res.json());
  // }

}
