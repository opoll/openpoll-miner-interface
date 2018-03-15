import {AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';

import {NotificationsService} from 'angular2-notifications';
import { DataService } from '../../../services/data.service';

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

  // View variables that will be dynamically updated
  minerType: string;
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

  constructor(private servicePNotify: NotificationsService, private dataService: DataService) {
    this.minerType = "Shard";
    this.hashrate = 11;
    this.netAvgHashrate = 8;

    // The shards that this miner is working on
    if(this.minerType == "Shard"){
      this.chainEntries = [
        {
          type: 'shard',
          id: '0x74324d303857b5779bca422f211b6d75',
          height: 14,
          lastUpdated: '02-24-2018',
          status: 'Awaiting Responses'
        },
        {
          type: 'shard',
          id: '0x3871612dc2bf2add6de545b950701933',
          height: 24,
          lastUpdated: '03-01-2018',
          status: 'Active'
        },
        {
          type: 'shard',
          id: '0xf8324e74713c0d65a2a025d9a744b58f',
          height: 14,
          lastUpdated: '03-23-2018',
          status: 'Failed'
        },
        {
          type: 'shard',
          id: '0x489c3f18c6c4de7b799c3cc000d3d670',
          height: 21,
          lastUpdated: '04-24-2018',
          status: 'Paused'
        },
        {
          type: 'shard',
          id: '0xbb155c1642c33ec1358cb23f7ea312a7',
          height: 40,
          lastUpdated: '02-02-2018',
          status: 'Active'
        },
        {
          type: 'shard',
          id: '0x0990f688ae97f026d2aacf1f6caacc97',
          height: 49,
          lastUpdated: '02-21-2018',
          status: 'Active'
        },
        {
          type: 'shard',
          id: '0x1e176a44ebb3be6a21f68a0de9d17d8c',
          height: 33,
          lastUpdated: '02-29-2018',
          status: 'Awaiting Responses'
        },
        {
          type: 'shard',
          id: '0xfb308a4a53707fa4da4e694466d88888',
          height: 8,
          lastUpdated: '02-21-2018',
          status: 'Failed'
        }
      ]
      sortByStatus(this.chainEntries);

      // Data on avaliable shards that this miner can work on
      this.avaliableShards = [
        {
          pollHash: '0xfb308a4asdffs07fa4da4asdffs6d88888',
          numMiners: 5,
          difficulty: 2,
          pollName: '2018 National Forest Conservation Survey'
        },
        {
          pollHash: '0xb9ce7e0f5dfd7c4b7649832d8cbb7149d67',
          numMiners: 8,
          difficulty: 3,
          pollName: 'New University of Maryland North Campus Diner Poll'
        }
      ]

      // Fetch chain statuses
      const statuses = getStatusesFromChainEntries(this.chainEntries);

      this.totalActive = statuses.active;
      this.totalPaused = statuses.paused;
      this.totalAwaitingResponses = statuses.awaitingResponses;
      this.totalFailed = statuses.failed;

      this.totalShardsAvaliable = this.avaliableShards.length;

    } else if (this.minerType == 'Mainchain'){
      this.mainchainInfo = {
        height: 302,
        lastUpdated: '03-15-2018',
        status: 'Paused'
      }
    }

  }

  ngOnInit() {
    // Fetch data to populate component with using data service
    // this.dataService.getChainData().subscribe((data) => {
    //   console.log(data);
    // })
  }

  ngAfterViewInit() {

  }

  importShard(shardId){
    console.log("Request to import shard " + shardId);
  }

  startShard(shardId){
    console.log("Request to start shard " + shardId);
  }

  pauseShard(shardId){
    console.log("Request to pause shard " + shardId);
  }

  deleteShard(shardId){
    console.log("Request to delete shard " + shardId);
  }

  reviveShard(shardId){
    console.log("Request to revive shard " + shardId);
  }

  switchMinerType(){
    console.log("Request to switch miner type. Current type is " + this.minerType);
  }

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

function sortByStatus(chainEntries){
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
    type: string, // 'shard' or 'mainchain' (corresponds to png image names)
    id: string, // id of the chain. If it is the mainchain id is 'main'. If it is a shard it will look like this '0x23af69fa526bbf12372e'
    height: number, // height of the blockchain
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