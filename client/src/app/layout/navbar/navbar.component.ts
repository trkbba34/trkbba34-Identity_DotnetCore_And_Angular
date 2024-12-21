import { AsyncPipe, NgClass, NgIf, TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AccountService } from '../../core/services/account.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    TitleCasePipe,
    NgIf,
    AsyncPipe,
    NgClass,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  collapsed = true;

  constructor(public accountService: AccountService) {}

  logout() {
    this.accountService.logout();
  }

  toggleCollapsed() {
    this.collapsed = !this.collapsed;
  }
}
