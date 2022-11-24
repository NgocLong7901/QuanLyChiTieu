import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';
@Component({
  selector: 'app-spend',
  templateUrl: './spend.component.html',
  styleUrls: ['./spend.component.css']
})
export class SpendComponent implements OnInit {
  public CURRENCY: any;
  message: string | undefined;
  newForm: any = this.fb.group({
    detail: [''],
    date: [''],
    id_category: [''],
    price: [''],
    note: [''],
    username: [this.authService.getLoggedInUserName()]
  });
  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private dataService: DataService) { }

  ngOnInit(): void {
    this.CURRENCY = 'CURRENCY';
  }
  onSubmit() {
    const userId = localStorage.getItem('userId');
    console.log(userId);
    let detail = { id: "", detail: "", date: "", id_category: "", price: "", note: "", status: 1, username: "", id_user: userId };
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
    this.newForm.get(key).patchValue(this.newForm.get(key).value);
  }
}
