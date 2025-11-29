import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService, InterpretationDto } from '../../../services/adminservice';

@Component({
  selector: 'app-get-admins-interpretations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './get-admins-interpretations.html',
  styleUrl: './get-admins-interpretations.css'
})
export class GetAdminsInterpretationsComponent implements OnInit {
  loading = true;
  error: string = '';
  interpretations: InterpretationDto[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getMyInterpretations().subscribe({
      next: (res) => {
        this.interpretations = res || [];
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.error = 'تعذر تحميل تفسيراتك.';
      }
    });
  }
}
