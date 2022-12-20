import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { DataService, Detail } from '../data.service';
import { Chart } from 'chart.js';
import * as _ from 'lodash';
@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {
  formDate: any = this.fb.group({
    startDate: [''],
    endDate: [''],
    year: ['']
  });
  constructor(private fb: FormBuilder, private authService: AuthService, private dataService: DataService) { }
  sumIn: any;
  sumSpend: any;
  sumInYear: any;
  sumSpendYear: any;
  showMe: boolean | undefined;
  details: any;
  dataSpendchart: any;
  dataIncomechart: any;
  chartSp: any;
  chartIn: any;
  dataInchartBar: any;
  chartBar: any;
  detailsInYear: any;
  year1: any;
  selected: number | undefined;
  ngOnInit(): void {
    this.year1 = this.selectyear();
  }
  selectyear() {
    let syear = 2019;
    var year = new Array();
    for (var i = 0; i < 15; i++) {
      year[i] = syear;
      syear++;
    }
    return year;
  }
  selectChangeHandler(event: any) {
    this.selected = event.target.value;
  }
  getDetailByDate() {
    let start_Date = new Date(this.formDate.value.startDate);
    var sdate = new Intl.DateTimeFormat("ja-JP").format(start_Date);
    let end_Date = new Date(this.formDate.value.endDate);
    var edate = new Intl.DateTimeFormat("ja-JP").format(end_Date);
    let username = this.authService.getLoggedInUserName();
    //details
    this.dataService.getDetailbyDate(username, sdate, edate).subscribe((data: Array<Detail>) => {
      this.details = data;
      var sum = 0;
      var sumSpend = 0;
      for (var i = 0; i < data.length; i++) {
        if (data[i].status == 0) {
          sum += data[i].price;
        }
        else {
          sumSpend += data[i].price;
        }
      }
      this.sumIn = sum;
      this.sumSpend = sumSpend;
    });

    //data chart spend
    this.dataService.getDataSpendChart(username, sdate, edate).subscribe((data: any) => {
      this.dataSpendchart = data;
      var dataSpendLine = new Array(0, 0, 0, 0, 0, 0, 0);
      for (var i = 0; i < data.length; i++) {
        switch (data[i][1]) {
          case 1:
            dataSpendLine[0] = data[i][0];
            break;
          case 2:
            dataSpendLine[1] = data[i][0];
            break;
          case 3:
            dataSpendLine[2] = data[i][0];
            break;
          case 4:
            dataSpendLine[3] = data[i][0];
            break;
          case 5:
            dataSpendLine[4] = data[i][0];
            break;
          case 6:
            dataSpendLine[5] = data[i][0];
            break;
          case 7:
            dataSpendLine[6] = data[i][0];
            break;
        }
      }
      console.log("dataSpendLine: " + dataSpendLine);
      if (this.chartSp == null) {
        this.chartSp = new Chart('canvasSp', {
          type: 'line',
          data: {
            labels: ['Xăng dầu', 'Giải trí', 'Điện nước', 'Du lịch', 'Sức khỏe', 'Giáo dục', 'Mua sắm'],
            datasets: [{
              data: dataSpendLine,
              label: 'Chi tiêu',
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
            }]
          },
          options: {
            responsive: true
          }
        })
      }
      else {
        this.chartSp.destroy();
        this.chartSp = new Chart('canvasSp', {
          type: 'line',
          data: {
            labels: ['Xăng dầu', 'Giải trí', 'Điện nước', 'Du lịch', 'Sức khỏe', 'Giáo dục', 'Mua sắm'],
            datasets: [{
              data: dataSpendLine,
              label: 'Chi tiêu',
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
            }]
          },
          options: {
            responsive: true
          }
        })
      }
    });
    //data chart income
    this.dataService.getDataIncomeChart(username, sdate, edate).subscribe((data: any) => {
      this.dataIncomechart = data;
      var dataInLine = new Array(0, 0, 0, 0);
      for (var i = 0; i < data.length; i++) {
        switch (data[i][1]) {
          case 10:
            dataInLine[0] = data[i][0];
            break;
          case 11:
            dataInLine[1] = data[i][0];
            break;
          case 12:
            dataInLine[2] = data[i][0];
            break;
          case 13:
            dataInLine[3] = data[i][0];
            break;
        }
      }
      console.log("dataInLine: " + dataInLine);
      if (this.chartIn == null) {
        this.chartIn = new Chart('canvasIn', {
          type: 'line',
          data: {
            labels: ['Lương', 'Thưởng', 'Được tặng', 'Bán đồ'],
            datasets: [{
              data: dataInLine,
              label: 'Thu nhập',
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
            }]
          },
          options: {
            responsive: true
          }
        })
      }
      else {
        this.chartIn.destroy();
        this.chartIn = new Chart('canvasIn', {
          type: 'line',
          data: {
            labels: ['Lương', 'Thưởng', 'Được tặng', 'Bán đồ'],
            datasets: [{
              data: dataInLine,
              label: 'Thu nhập',
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
            }]
          },
          options: {
            responsive: true
          }
        })
      }
    });
  }
  getChartBar() {
    let username = this.authService.getLoggedInUserName();
    var dataInBar = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    var dataSpendBar = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    //get detail
    this.dataService.getDetailbyYear(username, this.selected).subscribe((data: Array<Detail>) => {
      this.detailsInYear = data;
      var sum = 0;
      var sumSpend = 0;
      for (var i = 0; i < data.length; i++) {
        if (data[i].status == 0) {
          sum += data[i].price;
        }
        else {
          sumSpend += data[i].price;
        }
      }
      this.sumInYear = sum;
      this.sumSpendYear = sumSpend;
    });
    //data chart Bar
    this.dataService.getDataChartBar(username, this.selected).subscribe((data: any) => {
      this.dataInchartBar = data;
      for (var i = 0; i < data.length; i++) {
        if (data[i][2] == 0) {
          switch (data[i][1]) {
            case 1:
              dataInBar[0] = data[i][0];
              break;
            case 2:
              dataInBar[1] = data[i][0];
              break;
            case 3:
              dataInBar[2] = data[i][0];
              break;
            case 4:
              dataInBar[3] = data[i][0];
              break;
            case 5:
              dataInBar[4] = data[i][0];
              break;
            case 6:
              dataInBar[5] = data[i][0];
              break;
            case 7:
              dataInBar[6] = data[i][0];
              break;
            case 8:
              dataInBar[7] = data[i][0];
              break;;
            case 9:
              dataInBar[8] = data[i][0];
              break;
            case 10:
              dataInBar[9] = data[i][0];
              break;
            case 11:
              dataInBar[10] = data[i][0];
              break;
            case 12:
              dataInBar[11] = data[i][0];
              break;
          }
        } else {
          switch (data[i][1]) {
            case 1:
              dataSpendBar[0] = data[i][0];
              break;
            case 2:
              dataSpendBar[1] = data[i][0];
              break;
            case 3:
              dataSpendBar[2] = data[i][0];
              break;
            case 4:
              dataSpendBar[3] = data[i][0];
              break;
            case 5:
              dataSpendBar[4] = data[i][0];
              break;
            case 6:
              dataSpendBar[5] = data[i][0];
              break;
            case 7:
              dataSpendBar[6] = data[i][0];
              break;
            case 8:
              dataSpendBar[7] = data[i][0];
              break;;
            case 9:
              dataSpendBar[8] = data[i][0];
              break;
            case 10:
              dataSpendBar[9] = data[i][0];
              break;
            case 11:
              dataSpendBar[10] = data[i][0];
              break;
            case 12:
              dataSpendBar[11] = data[i][0];
              break;
          }
        }
        console.log(this.dataInchartBar[i][2]);
      }
      console.log(dataInBar);
      console.log(dataSpendBar);

      //draw chart
      if (this.chartBar == null) {
        this.chartBar = new Chart('chartBar', {
          type: 'bar',
          data: {
            labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
            datasets: [
              { data: dataSpendBar, label: 'Chi tiêu' },
              { data: dataInBar, label: 'Thu Nhập' }
            ]
          },
          options: {
            responsive: true,
            scales: {
              x: {},
              y: {
                beginAtZero: true
              }
            },
            plugins: {
              legend: {
                display: true,
              }
            }
          }
        })
      } else {
        this.chartBar.destroy();
        this.chartBar = new Chart('chartBar', {
          type: 'bar',
          data: {
            labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
            datasets: [
              { data: dataSpendBar, label: 'Chi tiêu' },
              { data: dataInBar, label: 'Thu nhập ' }
            ]
          },
          options: {
            responsive: true,
            scales: {
              x: {},
              y: {
                beginAtZero: true
              }
            },
            plugins: {
              legend: {
                display: true,
              }
            }
          }
        })
      }

    });
  }
}
