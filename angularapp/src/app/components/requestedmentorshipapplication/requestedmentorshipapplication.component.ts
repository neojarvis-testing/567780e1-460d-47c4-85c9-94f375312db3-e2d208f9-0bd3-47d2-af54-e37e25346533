import { Component, OnInit } from '@angular/core';
import { MentorshipService } from 'src/app/services/mentorship.service';
import { MentorshipApplication } from 'src/app/models/mentorshipapplication.model';
 
import { FormsModule } from '@angular/forms';
 
@Component({
  selector: 'app-requestedmentorshipapplication',
  styleUrls: ['./requestedmentorshipapplication.component.css'],
  templateUrl: './requestedmentorshipapplication.component.html'
})
export class RequestedmentorshipapplicationComponent implements OnInit {
  applications: MentorshipApplication[] = [];
  filteredApplications: MentorshipApplication[] = [];
  searchTerm: string = '';
  statusFilter: string = '';
 
  constructor(private mentorshipService: MentorshipService) { }
 
  ngOnInit(): void {
    this.loadApplications();
  }
 
  loadApplications() {
    this.mentorshipService.getAllMentorshipApplications().subscribe({
      next: (res) => {
        this.applications = res;
        this.filteredApplications = res;
      },
      error: (err) => {
        alert('Failed to load mentorship applications!');
      }
    });
  }
 
  search() {
    const term = this.searchTerm.toLowerCase();
    this.filteredApplications = this.applications.filter(app =>
      app.CareerGoals.toLowerCase().includes(term)
    );
    this.applyStatusFilter();
  }
 
  applyStatusFilter() {
    if (this.statusFilter) {
      this.filteredApplications = this.filteredApplications.filter(app =>
        app.ApplicationStatus === this.statusFilter
      );
    }
  }
 
  approve(app: MentorshipApplication) {
    if (confirm('Approve this application?')) {
      app.ApplicationStatus = 'Approved';
      this.updateApplication(app);
    }
  }
 
  reject(app: MentorshipApplication) {
    if (confirm('Reject this application?')) {
      app.ApplicationStatus = 'Rejected';
      this.updateApplication(app);
    }
  }
 
  updateApplication(app: MentorshipApplication) {
    this.mentorshipService.updateApplicationStatus(app.MentorshipApplicationId!, app).subscribe({
      next: () => {
        alert('Status updated successfully!');
        this.loadApplications();
      },
      error: (err) => {
        alert(err.error.message || 'Failed to update status!');
      }
    });
  }
 
  viewProfileImage(imageUrl: string) {
    window.open(imageUrl, "_blank");
  }
}