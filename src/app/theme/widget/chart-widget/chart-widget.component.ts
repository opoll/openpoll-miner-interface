import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

declare const AmCharts: any;

import '../../../../assets/charts/amchart/amcharts.js';
import '../../../../assets/charts/amchart/gauge.js';
import '../../../../assets/charts/amchart/pie.js';
import '../../../../assets/charts/amchart/serial.js';
import '../../../../assets/charts/amchart/light.js';
import '../../../../assets/charts/amchart/ammap.js';
import '../../../../assets/charts/amchart/worldLow.js';
import '../../../../assets/charts/amchart/continentsLow.js';

@Component({
  selector: 'app-chart-widget',
  templateUrl: './chart-widget.component.html',
  styleUrls: [
    './chart-widget.component.scss',
    '../../../../assets/icon/icofont/css/icofont.scss'
  ]
})
export class ChartWidgetComponent implements OnInit {
  public studentChartData: any;
  public studentChartOption: any;
  @ViewChild('studentChart') studentChart: ElementRef;
  public studentChartTag: CanvasRenderingContext2D;

  public emailChartData: any;
  public emailChartOption: any;

  public seoCard1Data: any;
  public seoCard2Data: any;
  public seoCard1Option: any;
  public seoCard2Option: any;
  @ViewChild('seoCard1Chart') seoCard1Chart: ElementRef;
  @ViewChild('seoCard2Chart') seoCard2Chart: ElementRef;
  public seoCard1Tag: CanvasRenderingContext2D;
  public seoCard2Tag: CanvasRenderingContext2D;

  public statisticsData: any;
  public statisticsOption: any;
  @ViewChild('statisticsChart') statisticsChart: ElementRef;
  public statisticsTag: CanvasRenderingContext2D;

  public processComplianceData: any;
  public processComplianceOption: any;
  @ViewChild('processComplianceChart') processComplianceChart: ElementRef;
  public processComplianceTag: CanvasRenderingContext2D;

  public userChart1Data: any;
  public userChart1Option: any;
  @ViewChild('userChart1') userChart1: ElementRef;
  public userChart1Tag: CanvasRenderingContext2D;

  public userChart2Data: any;
  public userChart2Option: any;
  @ViewChild('userChart2') userChart2: ElementRef;
  public userChart2Tag: CanvasRenderingContext2D;

  public userChart3Data: any;
  public userChart3Option: any;
  @ViewChild('userChart3') userChart3: ElementRef;
  public userChart3Tag: CanvasRenderingContext2D;

  public amountCardData: any;
  public amountCardOption: any;

  public feedbackData: any;
  public feedbackOption: any;

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      /* student chart start */
      const student_tag = (((<HTMLCanvasElement>this.studentChart.nativeElement).children));
      this.studentChartTag = ((student_tag['student_chart']).lastChild).getContext('2d');
      const efg = (this.studentChartTag).createLinearGradient(500, 0, 100, 0);
      efg.addColorStop(0, '#fd93a8');
      efg.addColorStop(1, '#FC6180');
      const def = (this.studentChartTag).createLinearGradient(500, 0, 100, 0);
      def.addColorStop(0, '#2ed8b6');
      def.addColorStop(1, '#7cffe5');
      const abc = (this.studentChartTag).createLinearGradient(500, 0, 100, 0);
      abc.addColorStop(1, '#56CCF2');
      abc.addColorStop(0, '#2F80ED');

      this.studentChartData = {
        labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL'],
        datasets: [{
          label: 'Arts',
          borderColor: efg,
          pointBorderColor: '#fff',
          pointBackgroundColor: efg,
          pointHoverBackgroundColor: efg,
          pointHoverBorderColor: efg,
          pointBorderWidth: 2,
          pointHoverRadius: 10,
          pointHoverBorderWidth: 1,
          pointRadius: 8,
          fill: false,
          borderWidth: 2,
          data: [20, 50, 30, 60, 30, 50, 40]
        }, {
          label: 'Commerce',
          borderColor: def,
          pointBorderColor: '#fff',
          pointBackgroundColor: def,
          pointHoverBackgroundColor: def,
          pointHoverBorderColor: def,
          pointBorderWidth: 2,
          pointHoverRadius: 10,
          pointHoverBorderWidth: 1,
          pointRadius: 8,
          fill: false,
          borderWidth: 2,
          data: [60, 30, 65, 45, 67, 35, 68]
        }, {
          label: 'Science',
          borderColor: abc,
          pointBorderColor: '#fff',
          pointBackgroundColor: abc,
          pointHoverBackgroundColor: abc,
          pointHoverBorderColor: abc,
          pointBorderWidth: 2,
          pointHoverRadius: 10,
          pointHoverBorderWidth: 1,
          pointRadius: 8,
          fill: false,
          borderWidth: 2,
          data: [40, 20, 50, 15, 40, 65, 20]
        }]
      };
      /* student chart end */

      /* email chart start */
      this.emailChartData = {
        datasets: [{
          data: [300, 170, 60],
          backgroundColor: ['#4099ff', '#2ed8b6', '#FF5370'],
          label: 'Dataset 1',
          borderWidth: 0
        }], labels: ['Send', 'Opened', 'Bounced']
      };
      this.emailChartOption = {
        responsive: true,
        cutoutPercentage: 80,
        legend: {position: 'top'},
        title: {display: false},
        animation: {animateScale: true, animateRotate: true}
      };
      /* email chart end */

      /* seo card start */
      const seo1_tag = (((<HTMLCanvasElement>this.seoCard1Chart.nativeElement).children));
      this.seoCard1Tag = ((seo1_tag['seo-card1']).lastChild).getContext('2d');
      const cde = (this.seoCard1Tag).createLinearGradient(300, 0, 0, 300);
      cde.addColorStop(0, '#b9fdef');
      cde.addColorStop(1, '#2ed8b6');

      const seo2_tag = (((<HTMLCanvasElement>this.seoCard2Chart.nativeElement).children));
      this.seoCard2Tag = ((seo2_tag['seo-card2']).lastChild).getContext('2d');
      const x = (this.seoCard2Tag).createLinearGradient(300, 0, 0, 300);
      x.addColorStop(0, '#b5d8ff');
      x.addColorStop(1, '#4099ff');

      this.seoCard1Data = e('#2ed8b6', [100, 80, 100, 150, 190, 200, 160], cde);
      this.seoCard1Option = f();

      this.seoCard2Data = e('#4099ff', [100, 80, 100, 150, 190, 200, 160], x);
      this.seoCard2Option = f();
      /* seo card end */

      AmCharts.makeChart('unique-visitor-chart', {
        type: 'map',
        theme: 'light',

        dragMap: false,
        projection: 'eckert3',
        areasSettings: {
          autoZoom: false,
          rollOverOutlineColor: '#fff',
          selectedColor: '#fff',
          outlineAlpha: 1,
          outlineColor: 'transparent',
          outlineThickness: 1,
          color: '#000000'
        },
        dataProvider: {
          map: 'continentsLow',
          areas: [{
            id: 'africa',
            title: 'Africa',
            pattern: {url: '../assets/images/widget/map-bg.png', width: 4, height: 4}
          }, {
            id: 'asia',
            title: 'Asia',
            pattern: {url: '../assets/images/widget/map-bg.png', width: 4, height: 4}
          }, {
            id: 'australia',
            title: 'Australia',
            pattern: {url: '../assets/images/widget/map-bg.png', width: 4, height: 4}
          }, {
            id: 'europe',
            title: 'Europe',
            pattern: {url: '../assets/images/widget/map-bg.png', width: 4, height: 4}
          }, {
            id: 'north_america',
            title: 'North America',
            pattern: {url: '../assets/images/widget/map-bg.png', width: 4, height: 4}
          }, {
            id: 'south_america',
            title: 'South America',
            pattern: {url: '../assets/images/widget/map-bg.png', width: 4, height: 4}
          }]
        },
        zoomControl: {panControlEnabled: false, zoomControlEnabled: false, homeButtonEnabled: false},
      });

      /* statistics chart start */
      const statistic_tag = (((<HTMLCanvasElement>this.statisticsChart.nativeElement).children));
      this.statisticsTag = ((statistic_tag['statistics_chart']).lastChild).getContext('2d');
      const efgh = (this.statisticsTag).createLinearGradient(500, 0, 100, 0);
      efgh.addColorStop(0, '#fd93a8');
      efgh.addColorStop(1, '#FC6180');
      const fgh = (this.statisticsTag).createLinearGradient(500, 0, 100, 0);
      fgh.addColorStop(1, '#56CCF2');
      fgh.addColorStop(0, '#2F80ED');

      this.statisticsData = {
        labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL'],
        datasets: [{
          label: 'Data',
          borderColor: efgh,
          pointBorderColor: efgh,
          pointBackgroundColor: efgh,
          pointHoverBackgroundColor: efgh,
          pointHoverBorderColor: efgh,
          pointBorderWidth: 10,
          pointHoverRadius: 10,
          pointHoverBorderWidth: 1,
          pointRadius: 0,
          fill: false,
          borderWidth: 4,
          data: [20, 50, 30, 50, 20, 70, 30]
        }, {
          label: 'Data',
          borderColor: fgh,
          pointBorderColor: fgh,
          pointBackgroundColor: fgh,
          pointHoverBackgroundColor: fgh,
          pointHoverBorderColor: fgh,
          pointBorderWidth: 10,
          pointHoverRadius: 10,
          pointHoverBorderWidth: 1,
          pointRadius: 0,
          fill: false,
          borderWidth: 4,
          data: [40, 30, 50, 15, 50, 50, 80]
        }]
      };
      this.statisticsOption = {
        legend: {position: 'top'},
        tooltips: {enabled: true, intersect: !1, mode: 'nearest', xPadding: 10, yPadding: 10, caretPadding: 10},
        scales: {
          yAxes: [{
            ticks: {
              fontColor: 'rgba(0,0,0,0.5)',
              fontStyle: 'bold',
              beginAtZero: true,
              maxTicksLimit: 5,
              padding: 20,
            }, gridLines: {drawTicks: false, display: false}
          }],
          xAxes: [{
            gridLines: {drawTicks: false, display: false},
            ticks: {padding: 20, fontColor: 'rgba(0,0,0,0.5)', fontStyle: 'bold'}
          }]
        },
      };
      /* statistics chart end */

      /* process compliance start */
      const process_compliance = (((<HTMLCanvasElement>this.processComplianceChart.nativeElement).children));
      this.processComplianceTag = ((process_compliance['process_compliance_chart']).lastChild).getContext('2d');
      const a = (this.processComplianceTag).createLinearGradient(0, 0, 0, 600);
      a.addColorStop(1, '#56CCF2');
      a.addColorStop(0, '#4099ff');

      this.processComplianceData = {
        labels: ['', '2012', '2013', '2014', '2015', '2016', '2017', '2018', ''],
        datasets: [{
          label: '# of Votes',
          data: [0, 12, 28, 23, 18, 45, 19, 36],
          backgroundColor: a,
          hoverBackgroundColor: a,
          hoverBorderWidth: 0,
        }]
      };
      this.processComplianceOption = {
        legend: {display: false},
        scales: {
          yAxes: [{
            gridLines: {display: false, drawBorder: false},
            ticks: {display: false},
          }], xAxes: [{gridLines: {display: false, drawBorder: false}}]
        }
      };
      /* process compliance end */

      /* user chart 1 start */
      const user_chart1 = (((<HTMLCanvasElement>this.userChart1.nativeElement).children));
      this.userChart1Tag = ((user_chart1['user_chart1']).lastChild).getContext('2d');
      const b = (this.userChart1Tag).createLinearGradient(0, 0, 0, 150);
      b.addColorStop(0, 'rgba(70, 128, 255, 1');
      b.addColorStop(1, 'rgba(70, 128, 255, 0.8');

      this.userChart1Data = l('rgb(70, 128, 255)', [0, 30, 10, 45, 30, 55, 30, 30, 70, 90], b);
      this.userChart1Option = h('rgba(70, 128, 255,0.8)');
      /* user chart 1 end */

      /* user chart 2 start */
      const user_chart2 = (((<HTMLCanvasElement>this.userChart2.nativeElement).children));
      this.userChart2Tag = ((user_chart2['user_chart2']).lastChild).getContext('2d');
      const c = (this.userChart1Tag).createLinearGradient(0, 0, 0, 150);
      c.addColorStop(0, 'rgba(147, 190, 82, 1');
      c.addColorStop(1, 'rgba(147, 190, 82, 0.8');

      this.userChart2Data = l('rgb(147, 190, 82)', [0, 30, 10, 45, 30, 55, 30, 30, 70, 90], c);
      this.userChart2Option = h('rgba(147, 190, 82,0.8)');
      /* user chart 2 end */

      /* user chart 3 start */
      const user_chart3 = (((<HTMLCanvasElement>this.userChart3.nativeElement).children));
      this.userChart3Tag = ((user_chart3['user_chart3']).lastChild).getContext('2d');
      const d = (this.userChart3Tag).createLinearGradient(0, 0, 0, 150);
      d.addColorStop(0, 'rgba(255, 182, 77, 1');
      d.addColorStop(1, 'rgba(255, 182, 77, 0.8');

      this.userChart3Data = l('rgb(255, 182, 77)', [0, 30, 10, 45, 30, 55, 30, 30, 70, 90], d);
      this.userChart3Option = h('rgba(255, 182, 77,0.8)');
      /* user chart 3 end */

      /* amount card 1 to 4 start */
      this.amountCardData = j('#fff', [40, 30, 45, 30, 35], '#fff');
      this.amountCardOption = g();
      /* amount card 1 to 4 end */

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
    }, 75);
  }

}

function e(hg, gh, i) {
  if (i == null) {
    i = 'rgba(0,0,0,0)';
  }
  return {
    labels: ['1', '2', '3', '4', '5', '6', '7'],
    datasets: [{
      label: '',
      borderColor: hg,
      borderWidth: 2,
      hitRadius: 0,
      pointHoverRadius: 0,
      pointRadius: 3,
      pointBorderWidth: 2,
      pointHoverBorderWidth: 12,
      pointBackgroundColor: '#fff',
      pointBorderColor: hg,
      pointHoverBackgroundColor: hg,
      pointHoverBorderColor: '#000',
      fill: true,
      backgroundColor: i,
      data: gh,
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

function l(r, q, s) {
  if (s == null) {
    s = 'rgba(0,0,0,0)';
  }
  return {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    datasets: [{
      label: 'Data',
      borderColor: r,
      pointBorderColor: r,
      pointBackgroundColor: r,
      pointHoverBackgroundColor: r,
      pointHoverBorderColor: r,
      pointBorderWidth: 0,
      lineTension: 0,
      pointHoverRadius: 0,
      pointHoverBorderWidth: 0,
      pointRadius: 0,
      fill: true,
      backgroundColor: s,
      borderWidth: 2,
      data: q
    }]
  };
}

function h(q) {
  return {
    legend: {display: false},
    tooltips: {
      enabled: true,
      intersect: !1,
      mode: 'nearest',
      backgroundColor: q,
      xPadding: 10,
      yPadding: 10,
      caretPadding: 10
    },
    scales: {
      yAxes: [{
        ticks: {
          fontColor: 'rgba(0,0,0,0.5)',
          fontStyle: 'bold',
          beginAtZero: true,
          maxTicksLimit: 5,
          padding: 20
        }
      }],
      xAxes: [{
        gridLines: {zeroLineColor: 'transparent', drawTicks: false, display: false},
        ticks: {padding: 20, fontColor: 'rgba(0,0,0,0.5)', fontStyle: 'bold'}
      }]
    }
  };
}

function j(r, q, s) {
  if (s == null) {
    s = 'rgba(0,0,0,0)';
  }
  return {
    labels: ['1', '2', '3', '4', '5'],
    datasets: [{
      label: '',
      borderColor: r,
      borderWidth: 2,
      hitRadius: 30,
      pointHoverRadius: 4,
      pointBorderWidth: 50,
      pointHoverBorderWidth: 12,
      pointBackgroundColor: 'transparent',
      pointBorderColor: 'transparent',
      pointHoverBackgroundColor: r,
      pointHoverBorderColor: 'transparent',
      fill: true,
      backgroundColor: s,
      data: q,
    }]
  };
}

function g() {
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
