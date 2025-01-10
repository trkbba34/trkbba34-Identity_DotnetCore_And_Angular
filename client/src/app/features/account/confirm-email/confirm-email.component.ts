import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../core/services/account.service';
import { SharedService } from '../../../core/services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../shared/models/account/user';
import { take } from 'rxjs';
import { NgIf } from '@angular/common';
import { ConfirmEmail } from '../../../shared/models/account/confirmEmail';

@Component({
  selector: 'app-confirm-email',
  standalone: true,
  imports: [NgIf],
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.css',
})
export class ConfirmEmailComponent implements OnInit {
  success = true;

  constructor(
    private accountService: AccountService,
    private sharedService: SharedService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.accountService.user$.pipe(take(1)).subscribe({
      next: (user: User | null) => {
        if (user) {
          this.router.navigateByUrl('/');
        } else {
          this.activatedRoute.queryParamMap.subscribe({
            next: (params: any) => {
              const confirmEmail: ConfirmEmail = {
                token: params.get('token'),
                email: params.get('email'),
              };

              this.accountService.confirmEmail(confirmEmail).subscribe({
                next: (response: any) => {
                  this.sharedService.showNotification(
                    true,
                    response.value.title,
                    response.value.message
                  );
                  this.router.navigateByUrl('/account/login');
                },
                error: (error) => {
                  this.success = false;
                  this.sharedService.showNotification(
                    false,
                    'Failed',
                    error.error
                  );
                },
              });
            },
          });
        }
      },
    });
  }

  resendEmailConfirmationLink() {
    this.router.navigateByUrl(
      '/account/send-email/resend-email-confirmation-link'
    );
  }
}
