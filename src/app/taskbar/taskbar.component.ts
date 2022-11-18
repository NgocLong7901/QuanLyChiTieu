import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-taskbar',
  templateUrl: './taskbar.component.html',
  styleUrls: ['./taskbar.component.css']
})
export class TaskbarComponent implements OnInit {
  // user=this.authService.getLoggedInUserName();
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  // logout() {
  //   this.authService.logout();
  //   this.router.navigate(['/login']);
  // }
  id: any
  tabChange(ids: any) {
    this.id = ids;
    this.router.navigate(['/' + this.id])
  }
}
