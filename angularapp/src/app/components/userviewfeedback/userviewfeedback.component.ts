import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Feedback } from 'src/app/models/feedback.model';
import { AuthService } from 'src/app/services/auth.service';
import { FeedbackService } from 'src/app/services/feedback.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-userviewfeedback',
  templateUrl: './userviewfeedback.component.html',
  styleUrls: ['./userviewfeedback.component.css']
})
export class UserviewfeedbackComponent implements OnInit {

  feedbackIdtoDelete: number;
  feedbacks: Feedback[] = [];
  selectedFeedbackId: number;
  isPopUpOpen: boolean;
  UserId: number;

  constructor(private feedbackService: FeedbackService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.UserId = +localStorage.getItem('userId'); 
    console.log(this.UserId);

    // Show loading indicator with a custom message
    Swal.fire({
      title: 'Loading Your Feedbacks...',
      text: 'Please wait while we load your feedback.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.feedbackService.getAllFeedbacksByUserid(this.UserId).subscribe(data => { 
      this.feedbacks = data;

      // Close loading indicator
      Swal.close();
    }, error => {
      // Handle error and close loading indicator
      Swal.close();
      Swal.fire('Error', 'Failed to fetch feedback. Please try again later.', 'error');
      console.error('Error fetching feedback:', error);
    });
  }
  
  openDeletePopUp(feedbackId: number): void {
    this.feedbackIdtoDelete = feedbackId;
    this.isPopUpOpen = true;
  }

  closeDeletePopUp(): void {
    this.isPopUpOpen = false;
    this.feedbackIdtoDelete = null;
  }

  deleteFeedback() {
    if (this.feedbackIdtoDelete !== null) {
      this.feedbackService.deleteFeedback(this.feedbackIdtoDelete).subscribe(() => {
        this.feedbacks = this.feedbacks.filter(feedback => feedback.FeedbackId !== this.feedbackIdtoDelete);
        this.closeDeletePopUp();
        this.router.navigate(['/user/viewFeedback']); // Navigate to viewFeedback component
      });
    }
  }
}
