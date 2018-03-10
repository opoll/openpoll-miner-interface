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
  totalShardsAvaliable: number;
  totalBlocksFound: number;
  totalBlocksImported: number;

  // Statues
  totalActive: number;
  totalPaused: number;
  totalFailed: number;

  // Table information on held chains and what is being worked on
  chainEntries:ChainEntry[];

  constructor(private servicePNotify: NotificationsService, private dataService: DataService) {
    this.totalShardsAvaliable = 150;
    this.totalBlocksFound = 23;
    this.totalBlocksImported = 100;

    this.chainEntries = [
      {
        type: 'mainchain',
        id: 'main',
        height: 403,
        lastUpdated: '02-31-2018',
        status: 'Paused'
      },
      {
        type: 'shard',
        id: '0x74324d303857b5779bca422f211b6d75',
        height: 14,
        lastUpdated: '02-24-2018',
        status: 'Active'
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
        status: 'Active'
      },
      {
        type: 'shard',
        id: '0xfb308a4a53707fa4da4e694466d88888',
        height: 8,
        lastUpdated: '02-21-2018',
        status: 'Failed'
      }
    ]

    // Fetch chain statuses
    const statuses = getStatusesFromChainEntries(this.chainEntries);

    this.totalActive = statuses.active;
    this.totalPaused = statuses.paused;
    this.totalFailed = statuses.failed;
  }

  ngOnInit() {
    // Fetch data to populate component with using data service
    // this.dataService.getChainData().subscribe((data) => {
    //   console.log(data);
    // })
  }

  ngAfterViewInit() {

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

}

function getStatusesFromChainEntries(chainEntries){
  let active = 0;
  let paused = 0;
  let failed = 0;

  chainEntries.forEach(function(entry) {
    if(entry.status.toLowerCase() === 'active'){
      active++;
    } else if(entry.status.toLowerCase() === 'paused'){
      paused++;
    } else if(entry.status.toLowerCase() === 'failed'){
      failed++;
    }
  });

  return {
    active, paused, failed
  }
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

// Interface defining the each table row of chain information
interface ChainEntry{
    type:string, // 'shard' or 'mainchain' (corresponds to png image names)
    id:string, // id of the chain. If it is the mainchain id is 'main'. If it is a shard it will look like this '0x23af69fa526bbf12372e'
    height:number, // height of the blockchain
    lastUpdated: string, // date this chain entry was last updated
    status: string// 'active', 'paused', or 'failed'
}