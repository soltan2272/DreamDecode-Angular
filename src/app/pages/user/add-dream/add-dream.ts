import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DreamService } from '../../../services/dreamservice';

@Component({
  selector: 'app-add-dream',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-dream.html',
  styleUrls: ['./add-dream.css']
})
export class AddDreamComponent {
  title = '';
  description = '';
  isPaid = false;

  loading = false;
  successMessage = '';
  errorMessage = '';

  constructor(private dreamService: DreamService) {}

  submit() {
    this.loading = true;
    this.successMessage = '';
    this.errorMessage = '';

    const dto = {
      title: this.title,
      description: this.description,
      isPaid: this.isPaid
    };

    this.dreamService.addDream(dto).subscribe({
      next: (res) => {
        this.loading = false;
        this.successMessage = 'تم ارسال الحلم بنجاح!';
        this.title = '';
        this.description = '';
        this.isPaid = false;
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'حدث خطأ اثناء ارسال الحلم. اعد المحاولة!';
      }
    });
  }
}
