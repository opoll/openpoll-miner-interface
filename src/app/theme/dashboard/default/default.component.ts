import {AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation, Input,} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import * as R from 'ramda';

import {NotificationsService} from 'angular2-notifications';
import { DataService } from '../../../services/data.service';
import { TokenService } from '../../../services/token.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: [
    './default.component.scss',
    '../../../../assets/icon/icofont/css/icofont.scss'
  ],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('fadeInOutTranslate', [
      transition(':enter', [
        style({opacity: 0}),
        animate('400ms ease-in-out', style({opacity: 1}))
      ]),
      transition(':leave', [
        style({transform: 'translate(0)'}),
        animate('400ms ease-in-out', style({opacity: 0}))
      ])
    ])
  ]
})
export class DefaultComponent implements OnInit, AfterViewInit {
  public feedbackData: any;
  public feedbackOption: any;

  options: any = {
    position: ['bottom', 'right'],
  };

  // token + minerType
  token:string;
  minerType: string;

  // View variables that will be dynamically updated
  totalShardsAvaliable: number;
  hashrate: number;
  netAvgHashrate: number;

  // Statues
  totalActive: number;
  totalPaused: number;
  totalAwaitingResponses: number;
  totalFailed: number;

  // Table information on held chains and what is being worked on
  mainchainInfo:MainchainEntry;
  chainEntries:ShardEntry[];
  avaliableShards:ShardInfo[];

  constructor(private servicePNotify: NotificationsService, private dataService: DataService, private tokenService: TokenService) {}

  ngOnInit() {
    // Subscribe to observable admin auth token
    this.tokenService.adminAuthToken.subscribe(adminAuthToken => {
      this.token = adminAuthToken;
    });

    // Subscribe to observable minerType info
    this.tokenService.minerType.subscribe(minerType => {
      this.minerType = minerType;
    });


    this.hashrate = 11;
    this.netAvgHashrate = 8;
    
    // The shards that this miner is working on
    if(this.minerType == "Shard"){
      this.dataService.getShardsInfo(this.token).subscribe((data) => {
        // Populate chainEntries
        this.chainEntries = data.shardEntries;
        sortShardsByStatus(this.chainEntries);

        // Data on avaliable shards that this miner can work on
        this.avaliableShards = [
          {
            pollHash: '099F10317CDBA085AE450269504EB551412513B028E2512118E42FB41F1E8953',
            numMiners: 5,
            difficulty: 2,
            pollName: '2018 National Forest Conservation Survey'
          },
          {
            pollHash: 'B8C91B66EB23513EB3EAD1F5285AD21080DFDA75019F94BF3273F87B49D55F18',
            numMiners: 8,
            difficulty: 3,
            pollName: 'New University of Maryland North Campus Diner Poll'
          }
        ];

        // Fetch chain statuses
        const statuses = getStatusesFromChainEntries(this.chainEntries);

        this.totalActive = statuses.active;
        this.totalPaused = statuses.paused;
        this.totalAwaitingResponses = statuses.awaitingResponses;
        this.totalFailed = statuses.failed;

      });

    } else if (this.minerType == 'Mainchain'){
      this.dataService.getMainchainInfo(this.token).subscribe((data) => {
        this.mainchainInfo = data.mainchainEntry;
      });

    }

  } // End ngOnInit()

  ngAfterViewInit() {

  }

  /********************* Shard OnClick Functions ***********************/

  importShard(pollHash){
    // Find the chain entry's index in the chainEntries array
    const pollIndex = getEntryIndexById('pollHash', pollHash, this.avaliableShards);

    console.log("Request to import poll " + pollHash);

    // Remove avaliable poll from view upon import completion
    this.avaliableShards.splice(pollIndex, 1);

    // Add the poll to the shards being worked on tab
    this.chainEntries.push({
      id: pollHash,
      height: 0,
      respPoolSize: 0,
      lastUpdated: nowAsFmtDate(),
      status: "Awaiting Responses"
    })

    // Update dashboard card count
    this.totalAwaitingResponses++;

    // Resort list
    sortShardsByStatus(this.chainEntries);
  }

  startShard(shardId){
    // Find the chain entry's index in the chainEntries array
    const shardIndex = getEntryIndexById('id', shardId, this.chainEntries);

    this.dataService.startShard(shardId, this.token).subscribe((data) => {
      // Toggle this chain's status on success
      this.chainEntries[shardIndex].status = "Active";

      // Update dashboard card count
      this.totalActive++;
      this.totalPaused--;

    });
  }

  pauseShard(shardId){
    // Find the chain entry's index in the chainEntries array
    const shardIndex = getEntryIndexById('id', shardId, this.chainEntries);
    
    this.dataService.pauseShard(shardId, this.token).subscribe((data) => {
      // Toggle this chain's status on success
      this.chainEntries[shardIndex].status = "Paused";

      // Update dashboard card count
      this.totalPaused++;
      this.totalActive--;
      
    });
  }

  deleteShard(shardId){
    // Find the chain entry's index in the chainEntries array
    const shardIndex = getEntryIndexById('id', shardId, this.chainEntries);
    const targetShardStatus = this.chainEntries[shardIndex].status;

    this.dataService.deleteShard(shardId, this.token).subscribe((data) => {
      // Remove this chain from view on success
      this.chainEntries.splice(shardIndex, 1);

      // Update dashboard card count
      switch(targetShardStatus){
        case "Active":
          this.totalActive--;
          break;
        case "Paused":
          this.totalPaused--;
          break;
        case "Awaiting Responses":
          this.totalAwaitingResponses--;
          break;
        case "Failed":
          this.totalFailed--;
          break;
      }

    });
  }

  reviveShard(shardId){
    // Find the chain entry's index in the chainEntries array
    const shardIndex = getEntryIndexById('id', shardId, this.chainEntries);

    console.log("Request to revive shard " + shardId);

    // Toggle this chain's status on success
    this.chainEntries[shardIndex].status = "Paused";

    // Update dashboard card count
    this.totalPaused++;
    this.totalFailed--;

  }

  /********************* Mainchain OnClick Functions ***********************/

  importMainchain(){
    console.log("Request to import mainchain.");
  }

  startMainchain(){
    this.dataService.startMainchain(this.token).subscribe((data) => {
      // Toggle chain state on success
      console.dir(data.message);
    });
  }

  pauseMainchain(){
    this.dataService.pauseMainchain(this.token).subscribe((data) => {
      // Toggle chain state on success
      console.dir(data.message);
    });
  }

  deleteMainchain(){
    this.dataService.deleteMainchain(this.token).subscribe((data) => {
      // Remove mainchain from view on success (can be added back later)
      console.dir(data.message);
    });
  }

  reviveMainchain(){
    console.log("Request to revive mainchain.");
  }

  /*************************************************************************/

  switchMinerType(){
    console.log("Request to switch miner type. Current type is " + this.minerType);
  }
  
}

/************ Generic Function Helpers ************/

function nowAsFmtDate(){
  const dateObj = new Date();

  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1; // Gives month index from 0-11 therefore we add 1 to adjust for this
  const year = dateObj.getFullYear();

  return `${month}-${day}-${year}`;
}

function getEntryIndexById(property, value, array){
  return R.findIndex(R.propEq(property, value))(array);
}

function getStatusesFromChainEntries(chainEntries){
  let active = 0;
  let paused = 0;
  let awaitingResponses = 0;
  let failed = 0;

  chainEntries.forEach(function(entry) {
    switch(entry.status.toLowerCase()){
      case 'active':
        active++;
        break;
      case 'paused':
        paused++;
        break;
      case 'awaiting responses':
        awaitingResponses++;
        break;
      case 'failed':
        failed++;
        break;
    }
  });

  return {
    active, paused, awaitingResponses, failed
  }
}

function sortShardsByStatus(chainEntries){
  chainEntries.sort(compareChainEntries)
}

function compareChainEntries(a, b){
  let statuses = ['failed', 'awaiting responses', 'paused', 'active'];

  if(statuses.indexOf(a.status.toLowerCase()) > statuses.indexOf(b.status.toLowerCase())){
    return -1;
  } else if (statuses.indexOf(a.status.toLowerCase()) < statuses.indexOf(b.status.toLowerCase())){
    return 1;
  }

  return 0;
}

function e(h, g, i) {
  if (i == null) {
    i = 'rgba(0,0,0,0)';
  }
  return {
    labels: ['1', '2', '3', '4', '5', '6', '7'],
    datasets: [{
      label: '',
      borderColor: h,
      borderWidth: 2,
      hitRadius: 0,
      pointHoverRadius: 0,
      pointRadius: 3,
      pointBorderWidth: 2,
      pointHoverBorderWidth: 12,
      pointBackgroundColor: '#fff',
      pointBorderColor: h,
      pointHoverBackgroundColor: h,
      pointHoverBorderColor: '#000',
      fill: true,
      backgroundColor: i,
      data: g,
    }]
  };
}

function f() {
  return {
    title: {display: !1},
    tooltips: {enabled: true, intersect: !1, mode: 'nearest', xPadding: 10, yPadding: 10, caretPadding: 10},
    legend: {display: !1, labels: {usePointStyle: !1}},
    responsive: !0,
    maintainAspectRatio: !0,
    hover: {mode: 'index'},
    scales: {
      xAxes: [{display: !1, gridLines: !1, scaleLabel: {display: !0, labelString: 'Month'}}],
      yAxes: [{
        display: !1,
        gridLines: !1,
        scaleLabel: {display: !0, labelString: 'Value'},
        ticks: {beginAtZero: !0}
      }]
    },
    elements: {point: {radius: 4, borderWidth: 12}},
    layout: {padding: {left: 0, right: 0, top: 0, bottom: 0}}
  };
}

// Interface defining each table row of chain information
interface ShardEntry{
    id: string, // id of the chain. If it is the mainchain id is 'main'. If it is a shard it will look like this '0x23af69fa526bbf12372e'
    height: number, // height of the blockchain
    respPoolSize: number, // the size of the response pool maintained locally associated with this shard
    lastUpdated: string, // date this shard entry was last updated
    status: string // 'active', 'paused', 'awaiting responses', or 'failed'
}

interface MainchainEntry{
  height: number, // height of the blockchain
  lastUpdated: string, // date this chain was last updated
  status: string // 'active', 'paused', or 'failed'
}

// Interface defining each table row of information of shards that can be imported
interface ShardInfo{
  pollHash: string,
  numMiners: number,
  difficulty: number,
  pollName: string
}