import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ValidationMessagesComponent } from '../../../shared/components/errors/validation-messages/validation-messages.component';
import { AccountService } from '../../../core/services/account.service';
import { Router, RouterLink } from '@angular/router';
import { DOCUMENT, NgIf } from '@angular/common';
import { User } from '../../../shared/models/account/user';
import { take } from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SharedService } from '../../../core/services/shared.service';
import { environment } from '../../../../environments/environment.development';
import { CredentialResponse } from 'google-one-tap';
import { jwtDecode } from 'jwt-decode';
declare const FB: any;

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ValidationMessagesComponent, NgIf, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  @ViewChild('googleButton', { static: true }) googleButton: ElementRef =
    new ElementRef({});
  registerForm: FormGroup = new FormGroup({});
  submitted = false;
  errorMessages: string[] = [];

  constructor(
    private accountService: AccountService,
    private sharedService: SharedService,
    private formBuilder: FormBuilder,
    private router: Router,
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document
  ) {
    this.accountService.user$.pipe(take(1)).subscribe({
      next: (user: User | null) => {
        if (user) {
          this.router.navigateByUrl('/');
        }
      },
    });
  }

  ngOnInit(): void {
    this.initiazeGoogleButton();
    this.initializeForm();
  }

  ngAfterViewInit() {
    const script1 = this._renderer2.createElement('script');
    script1.src = 'https://accounts.google.com/gsi/client';
    script1.async = 'true';
    script1.defer = 'true';
    this._renderer2.appendChild(this._document.body, script1);
  }

  initializeForm() {
    this.registerForm = this.formBuilder.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$'),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15),
        ],
      ],
    });
  }

  register() {
    this.submitted = true;
    this.errorMessages = [];

    if (this.registerForm.valid) {
      this.accountService.register(this.registerForm.value).subscribe({
        next: (response: any) => {
          this.sharedService.showNotification(
            true,
            response.value.title,
            response.value.message
          );
          this.router.navigateByUrl('/account/login');
        },
        error: (error) => {
          if (error.error.errors) {
            this.errorMessages = error.error.errors;
          } else {
            this.errorMessages.push(error.error);
          }
        },
      });
    }
  }

  registerWithFacebook() {
    FB.login(async (fbResult: any) => {
      if (fbResult.authResponse) {
        const accessToken = fbResult.authResponse.accessToken;
        const userId = fbResult.authResponse.userID;
        this.router.navigateByUrl(
          `/account/register/third-party/facebook?access_token=${accessToken}&userId=${userId}`
        );
      } else {
        this.sharedService.showNotification(
          false,
          'Failed',
          'Unable to register with your facebook'
        );
      }
    });
  }

  private initiazeGoogleButton() {
    (window as any).onGoogleLibraryLoad = () => {
      // @ts-ignore
      google.accounts.id.initialize({
        client_id: environment.googleClientId,
        callback: this.googleCallBack.bind(this),
        auto_select: false,
        cancel_on_tap_outside: true,
      });
      // @ts-ignore
      google.accounts.id.renderButton(this.googleButton.nativeElement, {
        size: 'medium',
        shape: 'rectangular',
        text: 'signup_with',
        logo_alignment: 'center',
      });
    };
  }

  private async googleCallBack(response: CredentialResponse) {
    const decodedToken: any = jwtDecode(response.credential);
    this.router.navigateByUrl(
      `/account/register/third-party/google?access_token=${response.credential}&userId=${decodedToken.sub}`
    );
  }
}
