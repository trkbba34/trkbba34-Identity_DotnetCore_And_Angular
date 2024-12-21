import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-validation-messages',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './validation-messages.component.html',
  styleUrl: './validation-messages.component.css',
})
export class ValidationMessagesComponent {
  @Input() errorMessages: string[] | undefined;
}
