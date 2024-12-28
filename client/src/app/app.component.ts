import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AccountService } from './core/services/account.service';
import { SharedService } from './core/services/shared.service';
import { take } from 'rxjs';
import { User } from './shared/models/account/user';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(
    private accountService: AccountService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.refreshUser();
  }

  @HostListener('window:keydown')
  @HostListener('window:mousedown')
  checkUserActivity() {
    this.accountService.user$.pipe(take(1)).subscribe({
      next: (user: User | null) => {
        if (user) {
          clearTimeout(this.accountService.timeoutId);
          this.accountService.checkUserIdleTimout();
        }
      },
    });
  }

  private refreshUser() {
    const jwt = this.accountService.getJWT();
    if (jwt) {
      this.accountService.refreshUser(jwt).subscribe({
        next: (_) => {},
        error: (error) => {
          this.accountService.logout();

          if (error.status === 401) {
            this.sharedService.showNotification(
              false,
              'Account blocked',
              error.error
            );
          }
        },
      });
    } else {
      this.accountService.refreshUser(null).subscribe();
    }
  }
}
