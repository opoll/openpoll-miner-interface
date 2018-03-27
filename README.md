# Miner GUI

**Purpose:** The miner interface is an Angular 5 frontend Single Page Application (SPA) that provides miners access to the underlying functionality and elements of the mining app that will allow them to perform their mining tasks, monitor critical metrics, and manage their wallets. This page will outline the basic endpoints (at least for now) that the mining application will contain to respond to frontend events. Endpoints will be prefaced by '/admin/' and be secured by a token.

# Temporary Frontend Layout

**Home Dashboard (Shard Mining Tab)**

![](https://static.notion-static.com/4c209fb1-cb43-41ae-99a2-0667c18ae2b0/screencapture-localhost-4200-dashboard-2018-03-15-01_14_17.png)

**Home Dashboard (Available Polls)**

![](https://static.notion-static.com/95019c26-4994-481a-a588-271725018098/screencapture-localhost-4200-dashboard-2018-03-15-01_05_44.png)

**Note:** The Angular application will fetch this tab's data from the facilitator API and not have to talk to the underlying mining application instance therefore no endpoint covers the data found in this tab.

**Wallet Management Tab**

![](https://static.notion-static.com/e82fbe03-00cc-4c48-ab30-ebe3ca7d3744/screencapture-localhost-4200-wallet-2018-03-15-01_06_44.png)

**Settings**

**Note:** Past the initial data fetch to populate the dashboard (which happens through token secured http communication), the Angular interface will be updated with WebSocket communication (secured by the same token used for the initial population of the dashboard). Therefore the "Data Refresh Rate" you see will likely change and not be necessary.

![](https://static.notion-static.com/1bf3389e-71cf-490f-abcb-0351b0e28d80/screencapture-localhost-4200-settings-2018-03-16-13_20_49.png)

**Repo:** [https://github.com/opoll/openpoll-miner-interface](https://github.com/opoll/openpoll-miner-interface)

**Note:** This repo will end up embedded in the main mining application in a folder like 'client/' then be served to the client and from there communication will take place through HTTP with token secured endpoints.

# Token Authentication

When the Angular app is first served to the client the server will generate and store a token called `adminAuthToken` in LevelDb. Upon the Angular application being served it will ask the miner for the token generated like so:

    Base64( random_alphanumeric(32) + ";" + Miner_IPAddress + ";" + Miner_Port )

This token will be be printed to the CLI and embedded in the Angular application upon it being served. The way admin token authentication will work is that every time that the Angular application want's to execute an action (interact with the miner's underlying mining application instance), they will pass the token along with the request. There will be middleware on every endpoint checking for this token and comparing it against what the mining application instance holds in LevelDb.

If invalid the mining application will reject the request with a `401 Unauthorized` status code (this will never happen to the actual miner using their dashboard since they will have the correct token at all times). If valid the miner will respond normally with the data the Angular app desires.

When the mining application is shutdown no action needs to take place with tokens since every new launch of the mining application will result in a new `adminAuthToken` server-side and consequently a new token to what is served to the client.

The `adminAuthToken` will consist of a 32 byte hex string concatenated with the miner's address as well as the port of communication (each element separated by a semicolon ";")

Token before conversion to Base64:

    68b468604e675e11e7ab3c09c55bd247b63b196fd7c8983aa375f5fc43253c31;17.8.243.140;9011

Token after conversion to Base64 and appending of `'Bearer:'` label:

    Bearer: NjhiNDY4NjA0ZTY3NWUxMWU3YWIzYzA5YzU1YmQyNDdiNjNiMTk2ZmQ3Yzg5ODNhYTM3NWY1ZmM0MzI1M2MzMTsxNy44LjI0My4xNDA7OTAxMQ==

The Angular data service that makes requests to the mining application will set its request `Authorization` header roughly like so with each request:

    import { Http, Headers, RequestOptions } from '@angular/http';
    
    const token = 'NjhiNDY4NjA0ZTY3NWUxMWU3YWIzYzA5YzU1YmQyNDdiNjNiMTk2ZmQ3Yzg5ODNhYTM3NWY1ZmM0MzI1M2MzMTsxNy44LjI0My4xNDA7OTAxMQ==';
    
    someServiceGetRequest(token){
    		const httpOptions = this.getAuthHttpOptions(token);
        return this.http.get(url, httpOptions)
          .map(res => res.json());
    }
    
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

And the mining application middleware will validate the header like so:

    const authHeader = req.get('Authorization'); // Extract Authorization header
    if (!authHeader) {
    	// Auth header not found. Reject request.
    }
    
    // Header found. Isolate.
    const tokenSplit = authHeader.split(' ');
    const token = tokenSplit[1]; // Removes 'Bearer: ' from authHeader string
    const adminAuthToken = // Fetch token held in LevelDb sync or async.
    
    // Compare isolated token to what is in mining app instance's LevelDb.
    if(token != adminAuthToken){
    	// Auth token is incorrect. Reject request.
    }
    
    // At this point token is valid. Call next(). Endpoint access granted.
    next();

# Endpoints

GET `/admin/info`

Non-Token Restricted Once-Valid Endpoint for serving Angular Interface `adminAuthToken` and `minerType` on Angular app's spawn. Shuts down afterwards therefore only runs upon the creation of a mining application instance.

## Shard Status Endpoints

**GET** `/admin/chains/shards`

This will return an array of general data on the shards that the miner is working on to populate the initial home dashboard view with.

    Response
    {
    	shardEntries: [
    		{
    			id: '74324d...1b6d75', // Id of chain. Hex id for a shard or 'main' for mainchain
    			height: 15, // Height of the chain
    			respPoolSize: 32, // the size of the response pool maintained locally associated with this shard
    			lastUpdated: '02-31-2018', // Date this chain was last synched with the network
    			status: 'Active' // Chain status. 'Active', 'Paused', 'Awaiting Responses', or 'Failed'.
    											 // Active: The chain is being mined on
    											 // Paused: The chain is ready to be mined on but is currently idle
    											 // Awaiting Responses: Chain imported but response pool empty. Awaiting responses.
    											 // Failed: A fatal error occurred. The shard's mempool and chain must be refetched.
    		}
    	]
    }

**GET** `/admin/chains/mainchain`

This will return an general data on the mainchain that the miner is working on to populate the initial home dashboard with.

    Response
    {
    	mainchainEntry: {
    			height: 15, // Height of the chain
    			lastUpdated: '02-31-2018', // Date this chain was last synched with the network
    			status: 'Paused' // Chain status. 'Active', 'Paused', or 'Failed'.
    											 // Active: The chain is being mined on
    											 // Paused: The chain is ready to be mined on but is currently idle
    											 // Failed: A fatal error occurred. The shard's mempool and chain must be refetched.
    	}
    }

**GET** `/admin/chains/shards/{shardID}/event?action=start`

Starts the shard with the provided shard ID.

**GET** `/admin/chains/shards/{shardID}/event?action=pause`

Pauses the shard with the provided shard ID.

**GET** `/admin/chains/mainchain/event?action=start`

Starts the mining on the mainchain.

**GET** `/admin/chains/mainchain/event?action=pause`

Pauses the mining on the mainchain.

**DELETE** `/admin/chains/shards/{shardID}`

Deletes the specified shard from the miner's mining pool. Mining is shut down for the shard and the db is wiped of any entries for the specified shard. The node's working status is potentially broadcasted.

**DELETE** `/admin/chains/mainchain`

Clears the mining pool for the mainchain (both txns and completed shards). Mining is shutdown for the mainchain and the db is wiped of entries for the mainchain. The node's working status is potentially broadcasted.

## Wallet Endpoints

**GET** `/admin/wallets`

This will return an array of general data on the wallets that the miner holds to populate the wallet component view with.

    Response
    {
    	wallets: [
    		{
    			id: 'a6ffed...2db2df', // The id of the wallet
    			address: 'mwVb4SJUxAoKmj3B1eQmxoEHJXY7v8izPk',
    			balance: 265 // Wallet balance in POL
    		}
    	]
    }

**GET** `/admin/wallets/{walletId}/event?action=exportKeys`

Returns the private and public key pair for the wallet with the specified ID.

**DELETE** `/admin/wallets/{walletId}`

Deletes the specified wallet from LevelDb and the keys associated with it. Double user confirmation on the frontend will be implemented as this is a drastic action.

**GET** `/admin/wallets/event?action=exportWallets`

Exports the complete information of all of the miner's wallets. This is a sensitive route so it is key that token rotation protects this endpoint.

**POST** `/admin/wallets`

Request to create a new wallet. If token is valid and password as well as confirm password match, a new wallet is created with one address. The response will contain general information on this wallet to populate the interface with.

    Request Body
    {
    	password: f2cc7084f422c2dfc161db19e
    }

    Response
    {
    	wallet: {
    			id: 'a6ffed...2db2df', // The id of the new wallet
    			address: 'mwVb4SJUxAoKmj3B1eQmxoEHJXY7v8izPk',
    			balance: 0 // Wallet balance in POL
    	}
    }
