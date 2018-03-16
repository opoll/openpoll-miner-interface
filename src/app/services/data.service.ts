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
    return this.get('/admin/wallets', httpOptions);
  }

  /* Retrieves the public-private keypair for the provided walletId */
  getWalletKeys(walletId, token){
    const httpOptions = this.getAuthHttpOptions(token);
    return this.get(`/admin/wallets/${walletId}/event?action=exportKeys`, httpOptions);
  }

  /* Deletes the wallet with the specified walletId */
  deleteWallet(walletId, token){
    const httpOptions = this.getAuthHttpOptions(token);
    return this.delete(`/admin/wallets/${walletId}`, httpOptions);
  }

  /* Exports all of the wallets the miner holds */
  exportWallets(token){
    const httpOptions = this.getAuthHttpOptions(token);
    return this.get(`/admin/wallets/event?action=exportWallets`, httpOptions);
  }

  /* Creates a new wallet with one address from password passed in. Response is
  general info on the new wallet that was created to populate the view with */
  addWallet(password, token){
    const httpOptions = this.getAuthHttpOptions(token);
    const data = {
      'password': password
    }
    return this.post(`/admin/wallets`, data, httpOptions);
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

  // Generic requests taking an endpoint url and httpOptions
  get(endpoint, httpOptions){
    return this.http.get(`http://localhost:9011${endpoint}`, httpOptions)
      .map(res => res.json());
  }

  post(endpoint, data, httpOptions){
    return this.http.post(`http://localhost:9011${endpoint}`, data, httpOptions)
    .map(res => res.json());
  }

  delete(endpoint, httpOptions){
    return this.http.delete(`http://localhost:9011${endpoint}`, httpOptions)
        .map(res => res.json());
  }

  /*****************        End Helpers        ******************/

}
