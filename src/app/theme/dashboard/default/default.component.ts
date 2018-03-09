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
  shardsBeingMined: number;
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
    this.shardsBeingMined = 13;
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
        id: '0x23af69fa526bbf12372e',
        height: 14,
        lastUpdated: '02-24-2018',
        status: 'Active'
      },
      {
        type: 'shard',
        id: '0xfa526bbf123af69fa23',
        height: 24,
        lastUpdated: '03-01-2018',
        status: 'Active'
      }
    ]

    this.totalActive = 2;
    this.totalPaused = 1;
    this.totalFailed = 0;
  }

  ngOnInit() {
    // Fetch data to populate component with using data service
    // this.dataService.getChainData().subscribe((data) => {
    //   console.log(data);
    // })
  }

  ngAfterViewInit() {
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