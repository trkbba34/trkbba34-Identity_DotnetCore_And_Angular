import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [NgClass],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
})
export class NotificationComponent {
  isSuccess: boolean = true;
  title: string = '';
  message: string = '';

  constructor(public bsModalRef: BsModalRef) {}
}
