import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  loggedIn: boolean = false;
  subscription: Subscription[] = [];

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.subscription.push(this.authService.loggedIn.subscribe(a => this.loggedIn = a));
  }

  ngOnDestroy(): void {
    this.subscription.map(i => i.unsubscribe());
  }

  logout(): void {
    this.authService.logout();
  }
}
