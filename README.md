# openpoll-miner-interface

Simple Angular 5 GUI for the [OpenPoll Mining Application](https://github.com/opoll/opollminer)

## How To Run
#### Prerequisites
Ensure that you have [NPM](https://docs.npmjs.com/getting-started/installing-node) installed

Ensure that you have the [Angular CLI](https://cli.angular.io/) installed globally

#### Start The Application
1.) Change to the current working directory you'd like to put the project.

2.) Run `git clone https://github.com/opoll/openpoll-miner-interface.git` to clone the repo

3.) Run `npm install` to install dependencies

4.) Start an instance of the [openpoll mining application](https://github.com/opoll/opollminer) and select miner type as either 'shard' or 'mainchain'

5.) Run `npm start` or `ng serve` to run the application on http://localhost:4200/ (`npm start` just runs the application's start script which is defined as `ng serve` leading to the same result)

6.) If you close the browser window or have any case where the Angular app must restart, you must restart the mining application again before calling `npm start` or `ng serve` again since the adminAuthToken is only served once and cannot be queried again. Then a new token will be distributed and the interface will work as normal again.
