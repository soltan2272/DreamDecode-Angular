import { Component, OnInit } from '@angular/core';
import { DreamService } from '../../../services/dreamservice';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-dreams',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './get-user-dreams.html',
  styleUrls: ['./get-user-dreams.css']
})
export class MyDreamsComponent implements OnInit {
  dreams: any[] = [];
  loading = true;

  constructor(private dreamService: DreamService) {}

  ngOnInit(): void {
    this.dreamService.getMyDreams().subscribe({
      next: (res) => {
        this.dreams = res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
