import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { DataService, Detail, Wallet } from '../data.service';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private dataService: DataService) { }
  ngOnInit(): void {
    this.addWalletByUser();
    this.getWallet();
  }
  sumIncome: number | undefined;
  sumSpend: number | undefined;
  details: any;
  wallet: any;
  surplus: number | undefined;
  moneyWallet: any;
  showMe: boolean | undefined;
  addWalletByUser() {
    var sumIn = 0;
    var sumSp = 0;
    let username = this.authService.getLoggedInUserName();
    const userId = localStorage.getItem('userId');
    this.dataService.getListDetail(username).subscribe((data: Array<Detail>) => {
      var newWallet = { id_wallet: userId, money: 0 };
      this.details = data;
      for (var i = 0; i < data.length; i++) {
        if (data[i].status == 0) {
          sumIn += data[i].price;
        }
        else {
          sumSp += data[i].price;
        }
      }
      this.sumIncome = sumIn;
      this.sumSpend = sumSp;
      newWallet.money = sumIn - sumSp;
      this.dataService.addWallet(newWallet).subscribe(response => {
        let code = 0;
        code = response.status;
        console.log("status code: " + code);
      })
    })
  }
  getWallet() {
    const userId = localStorage.getItem('userId');
    this.dataService.getWallet(userId).subscribe((data: Wallet) => {
      this.wallet = data;
      this.moneyWallet = this.wallet.money;
      if (this.moneyWallet == 0 || this.moneyWallet < 0) {
        this.showMe = false;
      } else {
        this.showMe = true;
      }
    })
  }
}
