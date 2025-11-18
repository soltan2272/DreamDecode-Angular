import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService, DreamDto, InterpretationDto, RegisterDto } from '../../services/adminservice';


@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule,],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css']
})
export class AdminDashboardComponent implements OnInit {
  admins: any[] = [];
  pendingDreams: DreamDto[] = [];

  myInterpretations: InterpretationDto[] = [];

  // Add-admin form model
  addAdminModel: RegisterDto = { fullName: '', email: '', password: '', role: 'Admin' };
  addAdminError = '';
  addAdminSuccess = '';

  // Interpretation form model
  interpText = '';
  interpError = '';
  selectedDreamId: number | null = null;

  loading = false;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadAdmins();
    this.loadPendingDreams();
    this.loadMyInterpretations();
  }

  loadAdmins() {
    this.adminService.getAdmins().subscribe({
      next: (res: any) => this.admins = res || [],
      error: (err:any) => console.error('getAdmins', err)
    });
  }


  loadPendingDreams() {
  this.adminService.getPendingDreams().subscribe({
    next: (res: any) => {
      this.pendingDreams = (res || []).map((d: DreamDto) => ({
        ...d,
        description: d.dreamDescription || 'لا يوجد وصف'
      }));
    },
    error: (err: any) => console.error('getPendingDreams', err)
  });
}

  loadMyInterpretations() {
    this.adminService.getMyInterpretations().subscribe({
      next: (res:any) => this.myInterpretations = res,
      error: (err:any) => console.error('getMyInterpretations', err)
    });
  }

  submitAddAdmin() {
    this.addAdminError = '';
    this.addAdminSuccess = '';
    if (!this.addAdminModel.email || !this.addAdminModel.password || !this.addAdminModel.fullName) {
      this.addAdminError = 'Please fill required fields.';
      return;
    }
    this.loading = true;
    this.adminService.addAdmin(this.addAdminModel).subscribe({
      next: (res:any) => {
        this.loading = false;
        if (res.succeeded) {
          this.addAdminSuccess = 'Admin added successfully.';
          this.addAdminModel = { fullName: '', email: '', password: '', role: 'Admin' };
          // refresh list
          this.loadAdmins();
        } else {
          this.addAdminError = (res.errors || []).join(', ') || 'Failed to add admin';
        }
      },
      error: (err:any) => {
        this.loading = false;
        this.addAdminError = err?.error?.message || 'Server error';
      }
    });
  }

  confirmDeleteAdmin(email: string) {
    if (!confirm(`Delete admin ${email}? This action cannot be undone.`)) return;
    this.adminService.deleteAdmin(email).subscribe({
      next: (res:any) => this.loadAdmins(),
      error: (err:any) => alert('Delete failed')
    });
  }

  openInterpretModal(dreamId: any) {
    console.log(dreamId);
    this.selectedDreamId = dreamId;
    this.interpText = '';
    this.interpError = '';
    // open the bootstrap modal by id using JS
    const el = document.getElementById('interpretModal');
    if (el) {
      // @ts-ignore
      const bs = bootstrap.Modal.getOrCreateInstance(el);
      // @ts-ignore
      bs.show();
    }
  }

  submitInterpretation(form: HTMLFormElement) {
    console.log("Interpret ");
    // if (!this.selectedDreamId) return;

     console.log("dreamid "+this.selectedDreamId);
    if (!this.interpText.trim()) {
      this.interpError = 'Please enter interpretation text.';
      return;
    }
    console.log("hgghgh");
    this.adminService.addInterpretation({ dreamId: this.selectedDreamId??0, interpretationText: this.interpText }).subscribe({
      next: (res:any) => {
        // refresh lists
        console.log(res);
        this.loadPendingDreams();
        this.loadMyInterpretations();
        // close modal
        const el = document.getElementById('interpretModal');
        if (el) {
          // @ts-ignore
          const bs = bootstrap.Modal.getInstance(el);
          if (bs) bs.hide();
        }
      },
      error: (err:any) => this.interpError = 'Failed to add interpretation'
    });
  }
}
