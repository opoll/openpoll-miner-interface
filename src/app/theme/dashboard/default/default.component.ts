import {AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';

declare const AmCharts: any;

import '../../../../assets/charts/amchart/amcharts.js';
import '../../../../assets/charts/amchart/gauge.js';
import '../../../../assets/charts/amchart/pie.js';
import '../../../../assets/charts/amchart/serial.js';
import '../../../../assets/charts/amchart/light.js';
import '../../../../assets/charts/amchart/ammap.js';
import '../../../../assets/charts/amchart/worldLow.js';
import '../../../../assets/charts/amchart/continentsLow.js';

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
  public seoCard1Data: any;
  public seoCard2Data: any;
  public seoCard1Option: any;
  public seoCard2Option: any;
  @ViewChild('seoCard1Chart') seoCard1Chart: ElementRef;
  @ViewChild('seoCard2Chart') seoCard2Chart: ElementRef;
  public seoCard1Tag: CanvasRenderingContext2D;
  public seoCard2Tag: CanvasRenderingContext2D;

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
    setTimeout(() => {
      this.options  = {
        position : ['bottom', 'right'],
        maxStack: 8,
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: true,
        lastOnBottom: true,
        clickToClose: true,
        preventDuplicates: false,
        preventLastDuplicates: false,
        theClass: 'bg-c-pink no-icon',
        rtl: false,
        animate: 'rotate'
      };

      this.servicePNotify.html(
        '<h4>Live customizer</h4> <p>Click on Right Gear icon <i class="ti-settings"></i> for apply live styles very first time in Angular 5.</p>',
        'success'
      );

      AmCharts.makeChart( 'statistics_chart', {
        'type': 'serial',
        'theme': 'light',
        'dataDateFormat': 'YYYY-MM-DD',
        'precision': 2,
        'valueAxes': [{
          'id': 'v1',
          'title': 'Sales',
          'position': 'left',
          'autoGridCount': false,
          'labelFunction': function(value) {
            return '$' + Math.round(value) + 'M';
          }
        }, {
          'id': 'v2',
          'gridAlpha': 0.1,
          'autoGridCount': false
        }],
        'graphs': [{
          'id': 'g1',
          'valueAxis': 'v2',
          'lineThickness': 0,
          'fillAlphas': 0.2,
          'lineColor': '#4099ff',
          'type': 'line',
          'title': 'Laptop',
          'useLineColorForBulletBorder': true,
          'valueField': 'market1',
          'balloonText': '[[title]]<br /><b style="font-size: 130%">[[value]]</b>'
        }, {
          'id': 'g2',
          'valueAxis': 'v2',
          'fillAlphas': 0.6,
          'lineThickness': 0,
          'lineColor': '#4099ff',
          'type': 'line',
          'title': 'TV',
          'useLineColorForBulletBorder': true,
          'valueField': 'market2',
          'balloonText': '[[title]]<br /><b style="font-size: 130%">[[value]]</b>'
        }],
        'chartCursor': {
          'pan': true,
          'valueLineEnabled': true,
          'valueLineBalloonEnabled': true,
          'cursorAlpha': 0,
          'valueLineAlpha': 0.2
        },
        'categoryField': 'date',
        'categoryAxis': {
          'parseDates': true,
          'gridAlpha' : 0,
          'minorGridEnabled': true
        },
        'legend': {
          'position': 'top',
        },
        'balloon': {
          'borderThickness': 1,
          'shadowAlpha': 0
        },
        'export': {
          'enabled': true
        },
        'dataProvider': [{
          'date': '2013-01-01',
          'market1': 0,
          'market2': 0,
          'sales1': 0
        }, {
          'date': '2013-02-01',
          'market1': 130,
          'market2': 110,
          'sales1': 0
        }, {
          'date': '2013-03-01',
          'market1': 80,
          'market2': 60,
          'sales1': 0
        }, {
          'date': '2013-04-01',
          'market1': 70,
          'market2': 200,
          'sales1': 0
        }, {
          'date': '2013-05-01',
          'market1': 180,
          'market2': 150,
          'sales1': 0
        }, {
          'date': '2013-06-01',
          'market1': 105,
          'market2': 90,
          'sales1': 0
        }, {
          'date': '2013-07-01',
          'market1': 250,
          'market2': 150,
          'sales1': 0
        }]
      });

      /* feedback chart start */
      this.feedbackData = {
        datasets: [{
          data: [83, 17],
          backgroundColor: ['#4099ff', '#81c1fd'],
          label: 'Dataset 1',
          borderWidth: 0
        }], labels: ['Positive', 'Negative']
      };

      this.feedbackOption = {
        responsive: true,
        legend: {display: false},
        title: {display: false, text: 'Chart.js Doughnut Chart'},
        animation: {animateScale: true, animateRotate: true}
      };
      /* feedback chart end */

      /* seo card start */
      const seo1_tag = (((<HTMLCanvasElement>this.seoCard1Chart.nativeElement).children));
      this.seoCard1Tag = ((seo1_tag['seo-card1']).lastChild).getContext('2d');
      const d = (this.seoCard1Tag).createLinearGradient(300, 0, 0, 300);
      d.addColorStop(0, '#b9fdef');
      d.addColorStop(1, '#2ed8b6');

      const seo2_tag = (((<HTMLCanvasElement>this.seoCard2Chart.nativeElement).children));
      this.seoCard2Tag = ((seo2_tag['seo-card2']).lastChild).getContext('2d');
      const x = (this.seoCard2Tag).createLinearGradient(300, 0, 0, 300);
      x.addColorStop(0, '#b5d8ff');
      x.addColorStop(1, '#4099ff');

      this.seoCard1Data = e('#2ed8b6', [100, 80, 100, 150, 190, 200, 160], d);
      this.seoCard1Option = f();

      this.seoCard2Data = e('#4099ff', [100, 80, 100, 150, 190, 200, 160], x);
      this.seoCard2Option = f();
      /* seo card end */
    }, 75);
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
