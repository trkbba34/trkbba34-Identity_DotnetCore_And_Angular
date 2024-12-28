import { Component, OnInit } from '@angular/core';
import { PlayService } from '../../core/services/play.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-play',
  standalone: true,
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css'],
  imports: [CommonModule],
})
export class PlayComponent implements OnInit {
  message: string | undefined;

  constructor(private playService: PlayService) {}

  ngOnInit(): void {
    this.playService.getPlayers().subscribe({
      next: (respose: any) => (this.message = respose.value.message),
      error: (error) => console.log(error),
    });
  }
}
