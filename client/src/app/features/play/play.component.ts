import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-play',
  standalone: true,
  imports: [NgIf],
  templateUrl: './play.component.html',
  styleUrl: './play.component.css',
})
export class PlayComponent {
  message = '';
}
