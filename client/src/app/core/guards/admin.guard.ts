import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { AccountService } from '../services/account.service';
import { SharedService } from '../services/shared.service';
import { User } from '../../shared/models/account/user';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard {
  constructor(
    private accountService: AccountService,
    private sharedService: SharedService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.accountService.user$.pipe(
      map((user: User | null) => {
        if (user) {
          const decodedToken: any = jwtDecode(user.jwt);
          if (decodedToken.role.includes('Admin')) {
            return true;
          }
        }

        this.sharedService.showNotification(false, 'Admin Area', 'Leave now!');
        this.router.navigateByUrl('/');

        return false;
      })
    );
  }
}
