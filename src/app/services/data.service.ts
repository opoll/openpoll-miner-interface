import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class DataService {

  constructor(public http:Http) {
    console.log('data service connected');
  }

  /* Request for initial pulling of admin info (nodeType and adminAuthToken) as a
  one time request. */
  getAdminInfo(){
    return this.http.get('http://localhost:9011/admin/info')
      .map(res => res.json());
  }





  /****************************************************************/
  /*                  Shard Miner Admin Requests                  */
  /****************************************************************/



  /****************************************************************/
  /*                End Shard Miner Admin Requests                */
  /****************************************************************/






  /****************************************************************/
  /*                Mainchain Miner Admin Requests                */
  /****************************************************************/



  /****************************************************************/
  /*              End Mainchain Miner Admin Requests              */
  /****************************************************************/







  /***************************************************************/
  /*                 Miner Wallet Admin Requests                 */
  /***************************************************************/

  /* Retrieves general information on all wallets miner holds to populate
  wallet component with */
  getWalletsInfo(token){
    const httpOptions = this.getAuthHttpOptions(token);
    return this.http.get('http://localhost:9011/admin/wallets', httpOptions)
      .map(res => res.json());
  }

  /***************************************************************/
  /*               End Miner Wallet Admin Requests               */
  /***************************************************************/




  
  /********************        Helpers        ********************/

  // Returns RequestOptions object configured with proper Authorization header
  getAuthHttpOptions(tokenString): RequestOptions{
    // Create auth string
    const auth = `Bearer: ${tokenString}`;

    // Set headers
    let headers = new Headers();
    headers.append('Authorization', auth);

    // Set http options
    let httpOptions = new RequestOptions();
    httpOptions.headers = headers;

    return httpOptions;
  }

  /*****************        End Helpers        ******************/

}
