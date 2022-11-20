import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { DataService, Detail } from '../data.service';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  username = this.authService.getLoggedInUserName();
  details: any;
  public CURRENCY: any;
  showMe: boolean = true;
  sumIn: any;
  sumSpend: any;
  selectedDetail: any;
  message: string | undefined;
  showCategory: boolean | undefined;
  newForm: any = this.fb.group({
    detail: [''],
    date: [''],
    id_category: [''],
    price: [''],
    note: [''],
    username: [this.username]
  });
  constructor(private fb: FormBuilder, private authService: AuthService, private dataService: DataService, private ElByClassName: ElementRef) { }

  ngOnInit(): void {
    this.displayListDetail();
    this.CURRENCY = 'CURRENCY';
  }
  displayListDetail() {
    this.dataService.getListDetail(this.username).subscribe((data: Array<Detail>) => {
      this.details = data
    })
  }
  delete(detail: any) {
    this.dataService.deleteDetail(detail.id_detail).subscribe((res) => {
      this.displayListDetail();
    });
  }
  clickbtnFix(detail: any) {
    this.showMe = false;
    this.dataService.getDetail(detail.id_detail).subscribe((res) => {
      this.selectedDetail = res;
      this.newForm.patchValue({ detail: res.detail });
      if (res.status == 0) {
        this.showCategory = true;
      } else {
        this.showCategory = false;
      }
    })
  }
  onChangeReactiveForm(key: string) {
    this.newForm.get(key).patchValue(this.newForm.get(key).value);
  }
  updateDetail() {
    let code;
    const userId = localStorage.getItem('userId');
    let detail = { id: this.selectedDetail.id_detail, detail: "", date: "", id_category: "", price: "", note: "", status: this.selectedDetail.status, username: "", id_user: userId };
    detail.detail = this.newForm.value.detail;
    detail.date = this.newForm.value.date;
    detail.id_category = this.newForm.value.id_category;
    detail.price = this.newForm.value.price;
    detail.note = this.newForm.value.note;
    detail.username = this.newForm.value.username;
    console.log(detail);
    this.dataService.updateDetail(detail).subscribe(
      (response) => { },
      error => {
        code = error.status;
        console.log("status code:" + code);
        if (code == 303)
          this.message = "Bạn cập nhật thành công";
      }
    );
  }
  clickbtnClose() {
    this.showMe = !this.showMe;
  }
}
