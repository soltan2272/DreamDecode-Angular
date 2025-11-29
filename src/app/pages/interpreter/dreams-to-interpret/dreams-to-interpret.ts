import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService, DreamDto } from '../../../services/adminservice';

@Component({
  selector: 'app-dreams-to-interpret',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dreams-to-interpret.html',
  styleUrl: './dreams-to-interpret.css'
})
export class DreamsToInterpretComponent implements OnInit {
  loading = true;
  error: string = '';
  dreams: DreamDto[] = [];

  openForm: Record<number, boolean> = {};
  interpretationText: Record<number, string> = {};
  submitLoading: Record<number, boolean> = {};
  submitError: Record<number, string> = {};
  submitSuccess: Record<number, string> = {};

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getPendingDreams().subscribe({
      next: (res) => {
        this.dreams = res || [];
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.error = 'تعذر تحميل الأحلام قيد التفسير.';
      }
    });
  }

  toggleForm(dreamId: number) {
    this.openForm[dreamId] = !this.openForm[dreamId];
    this.submitError[dreamId] = '';
    this.submitSuccess[dreamId] = '';
  }

  submitInterpretation(dream: DreamDto) {
    const dreamId = dream.dreamId;
    const text = (this.interpretationText[dreamId] || '').trim();
    if (!text) {
      this.submitError[dreamId] = 'من فضلك اكتب التفسير.';
      return;
    }
    this.submitError[dreamId] = '';
    this.submitSuccess[dreamId] = '';
    this.submitLoading[dreamId] = true;

    this.adminService.addInterpretation({ dreamId, interpretationText: text }).subscribe({
      next: () => {
        this.submitLoading[dreamId] = false;
        this.submitSuccess[dreamId] = 'تم إضافة التفسير بنجاح.';
        // Remove interpreted dream from list
        this.dreams = this.dreams.filter(d => d.dreamId !== dreamId);
        delete this.openForm[dreamId];
        delete this.interpretationText[dreamId];
      },
      error: () => {
        this.submitLoading[dreamId] = false;
        this.submitError[dreamId] = 'حدث خطأ أثناء حفظ التفسير.';
      }
    });
  }
}
