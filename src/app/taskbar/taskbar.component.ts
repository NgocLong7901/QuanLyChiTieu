import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';
@Component({
  selector: 'app-taskbar',
  templateUrl: './taskbar.component.html',
  styleUrls: ['./taskbar.component.css']
})
export class TaskbarComponent implements OnInit {
  id: any;
  user=this.authService.getLoggedInUserName();
  constructor(private router: Router, private authService: AuthService, private dataService: DataService) { }

  ngOnInit(): void {
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  tabChange(ids: any) {
    this.id = ids;
    this.router.navigate(['/' + this.id])
  }
}
