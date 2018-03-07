import {AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';

import {NotificationsService} from 'angular2-notifications';

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

    constructor(private servicePNotify: NotificationsService) {

    }

  ngOnInit() {
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
