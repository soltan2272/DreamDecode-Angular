import { Component, OnInit } from '@angular/core';
import { DreamService } from '../../../services/dreamservice';
import { CommonModule } from '@angular/common';

export interface UserDream {
  id: number;
  title: string;
  description: string;
  submittedAt: string;
  isPaid: boolean;
  isInterpreted: boolean;
  interpretationText?: string;
  interpretedAt?: string;
  interpretation?: {
    interpretationText: string;
    interpretedAt: string;
  };
}

@Component({
  selector: 'app-my-dreams',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './get-user-dreams.html',
  styleUrls: ['./get-user-dreams.css']
})
export class MyDreamsComponent implements OnInit {
  dreams: UserDream[] = [];
  loading = true;

  constructor(private dreamService: DreamService) {}

  ngOnInit(): void {
    this.dreamService.getMyDreams().subscribe({
      next: (res) => {
        console.log(res);
        this.dreams = res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
