import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
export interface User {
  username: String;
  password: String;
  id_user: number;
  fullname: String;
  SDT: number;
}

export interface Detail {
  id_detail: number;
  detail: string;
  date: Date;
  category: string;
  price: number;
  note: string;
  status: number;
}

export interface Wallet {
  id_wallet: any;
  money: number;
}
@Injectable({
  providedIn: 'root'
})
export class DataService {
  rootURL = "http://localhost:8080";
  constructor(private http: HttpClient, private authService: AuthService) { }
  getListDetail(username: string): Observable<Array<Detail>> {
    return this.http.get<Array<Detail>>(this.rootURL + "/detail/all/" + username);
  }
  addDetail(detail: any) {
    return this.http.post<Response>(this.rootURL + "/detail/add", detail, {
      observe: 'response'
    });
  }
  getDetail(id: any): Observable<Detail> {
    return this.http.get<Detail>(this.rootURL + "/detail/" + id);
  }
  updateDetail(detail: any) {
    return this.http.put(this.rootURL + "/detail/update/" + detail.id, detail);
  }
  getUserName(username: string): Observable<User> {
    return this.http.get<User>(this.rootURL + "/user/get?username=" + username);
  }
  deleteDetail(id: any) {
    return this.http.delete(this.rootURL + "/detail/delete/" + id);
  }
  addWallet(wallet: any) {
    return this.http.post<Response>(this.rootURL + "/wallet/add", wallet, {
      observe: 'response'
    });
  }
  getWallet(id_wallet: any): Observable<Wallet> {
    return this.http.get<Wallet>(this.rootURL + "/wallet/get/" + id_wallet);
  }
  updateWallet(wallet: any) {
    return this.http.put(this.rootURL + "/wallet/update/" + wallet.id_wallet, wallet);
  }
  getDetailbyDate(username: string, date1: any, date2: any): Observable<Array<Detail>> {
    return this.http.get<Array<Detail>>(this.rootURL + "/detail/all/get/" + username + "?startDate=" + date1 + "&endDate=" + date2);
  }
  getDataSpendChart(username: string, date1: any, date2: any): Observable<Number[]> {
    return this.http.get<Number[]>(this.rootURL + "/detail/category/spend/" + username + "?startDate=" + date1 + "&endDate=" + date2);
  }
  getDataIncomeChart(username: string, date1: any, date2: any): Observable<Number[]> {
    return this.http.get<Number[]>(this.rootURL + "/detail/category/income/" + username + "?startDate=" + date1 + "&endDate=" + date2);
  }
  getDataChartBar(username: string, year: any): Observable<Number[]> {
    return this.http.get<Number[]>(this.rootURL + "/detail/month/" + username + "?year=" + year);
  }
  getDetailbyYear(username: string, year: any): Observable<Array<Detail>> {
    return this.http.get<Array<Detail>>(this.rootURL + "/detail/year/" + username + "?year=" + year);
  }
}
