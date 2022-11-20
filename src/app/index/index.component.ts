import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { DataService, Wallet } from '../data.service';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  message: string | undefined;
  wallet: any;
  money: any;
  sumIn: any;
  sumSpend: any;
  username = this.authService.getLoggedInUserName();
  showMe: boolean | undefined;
  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private dataService: DataService) { }
  form = this.fb.group({
    id_wallet: [''],
    money: ['']
  })
  ngOnInit(): void {
    this.getWallet();
  }

  getWallet() {
    const userId = localStorage.getItem('userId');
    this.dataService.getWallet(userId).subscribe((data: Wallet) => {
      this.wallet = data;
      this.money = this.wallet.money;
      if (this.money == 0 || this.money < 0) {
        this.showMe = false;
      } else {
        this.showMe = true;
      }
    })
  }
}
