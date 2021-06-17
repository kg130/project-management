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

  headOpts = [
    { path: '/projects', label: 'Projects' },
    { path: '/summary', label: 'Summary' },
    { path: '/create', label: 'Create Project' },
  ]

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.subscription.push(this.authService.loggedIn.subscribe(a => this.loggedIn = a));
  }

  ngOnDestroy(): void {
    this.subscription.map(i => i.unsubscribe());
  }

  selectedRoute(head: any): boolean {
    return window.location.href.includes(head.path);
  }

  logout(): void {
    this.authService.logout();
  }
}
