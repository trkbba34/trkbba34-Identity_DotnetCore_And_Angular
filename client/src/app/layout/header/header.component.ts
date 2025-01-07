import { Component } from '@angular/core';
import { AccountService } from '../../core/services/account.service';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { TitleCasePipe, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TitleCasePipe, CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  animations: [
    trigger('fadein', [
      state(
        'in',
        style({
          opacity: 1,
          transform: 'translateX(0)',
        })
      ),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100px)',
        }),
        animate(5000),
      ]),
      transition('* => void', [
        animate(
          5000,
          style({
            transform: 'translateX(100px)',
            opacity: 0,
          })
        ),
      ]),
    ]),
  ],
})
export class HeaderComponent {
  constructor(public accountService: AccountService) {}

  ngOnInit(): void {}

  logout() {
    this.accountService.logout();
  }
}
