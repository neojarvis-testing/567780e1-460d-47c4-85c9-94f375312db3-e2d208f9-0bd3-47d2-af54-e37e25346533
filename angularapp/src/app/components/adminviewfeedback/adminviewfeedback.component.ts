import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/models/feedback.model';
import { User } from 'src/app/models/user.model';
import { FeedbackService } from 'src/app/services/feedback.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
 
@Component({
  selector: 'app-adminviewfeedback',
  templateUrl: './adminviewfeedback.component.html',
  styleUrls: ['./adminviewfeedback.component.css']
})
export class AdminviewfeedbackComponent implements OnInit {
  feedbacks: Feedback[] = [];
  users: User[] = [];
 
  constructor(
    private feedbackService: FeedbackService,
    private authService: AuthService
  ) {}
 
  ngOnInit(): void {
    this.loadFeedbacks();
  }
 
  loadFeedbacks(): void {
    Swal.fire({
      title: 'Loading Feedbacks...',
      text: 'Please wait while we fetch the feedback data.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
 
    this.authService.getAllUsers().subscribe(users => {
      this.users = users;
      this.feedbackService.getFeedbacks().subscribe(data => {
        this.feedbacks = data;
        Swal.close();
      }, error => {
        Swal.close();
        Swal.fire('Error', 'Failed to fetch feedbacks. Try again later.', 'error');
        console.error('Error fetching feedbacks:', error);
      });
    }, error => {
      Swal.close();
      Swal.fire('Error', 'Failed to fetch users. Try again later.', 'error');
      console.error('Error fetching users:', error);
    });
  }
 
  getUserDetails(userId: number): User | undefined {
    return this.users.find(u => u.UserId === userId);
  }
 
  showProfile(feedback: Feedback): void {
    const userDetails = this.getUserDetails(feedback.UserId);
    if (userDetails) {
      Swal.fire({
        title: 'User Profile',
        html: `
          <p><strong>Username:</strong> ${userDetails.Username}</p>
          ${userDetails.Email ? `<p><strong>Email:</strong> ${userDetails.Email}</p>` : ''}
          ${userDetails.MobileNumber ? `<p><strong>Mobile Number:</strong> ${userDetails.MobileNumber}</p>` : ''}
        `,
        confirmButtonText: 'Close',
        confirmButtonColor: '#325C70ff',
        background: '#FFFFFF',
        customClass: {
          popup: 'modal-profile',
          title: 'modal-title',  // Fix for SweetAlert2 error
          confirmButton: 'btn-close-modal'
        }
      });
    }
  }
}
 