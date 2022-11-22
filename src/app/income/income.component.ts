import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {
  public CURRENCY: any;
  message: string | undefined;
  users: any;
  newForm: any = this.fb.group({
    detail: [''],
    date: [''],
    id_category: [''],
    price: [''],
    note: [''],
    username: [this.authService.getLoggedInUserName()]
  });
  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private dataService: DataService) { }
  user = this.authService.getLoggedInUserName();
  ngOnInit(): void {
    this.CURRENCY = 'CURRENCY';
  }
  onSubmit() {
    const userId = localStorage.getItem('userId');
    console.log(userId);
    let detail = { id: "", detail: "", date: "", id_category: "", price: "", note: "", status: 0, username: "", id_user: userId };
    detail.detail = this.newForm.value.detail;
    detail.date = this.newForm.value.date;
    detail.id_category = this.newForm.value.id_category;
    detail.price = this.newForm.value.price;
    detail.note = this.newForm.value.note;
    detail.username = this.newForm.value.username;
    let code = 0;
    this.dataService.addDetail(detail).subscribe(response => {
      code = response.status;
      console.log("status code:" + code);
      if (code == 200) {
        this.message = "Bạn thêm thành công";
      }
    }
    );
  }
  onChangeReactiveForm(key: string) {
    // cập nhật 1 phần của form -> patchValue
    this.newForm.get(key).patchValue(this.newForm.get(key).value);
  }
}
