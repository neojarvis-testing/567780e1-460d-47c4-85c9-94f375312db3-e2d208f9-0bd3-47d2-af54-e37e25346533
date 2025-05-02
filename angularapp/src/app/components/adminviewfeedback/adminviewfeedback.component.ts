import { Component, OnInit } from '@angular/core';
 
import { FeedbackService } from '../../services/feedback.service';
 
import { Feedback } from '../../models/feedback.model';
 
@Component({
 
  selector: 'app-adminviewfeedback',
 
  templateUrl: './adminviewfeedback.component.html'
 
})
 
export class AdminviewfeedbackComponent implements OnInit {
 
  feedbacks: Feedback[] = [];
 
  constructor(private feedbackService: FeedbackService) {}
 
  ngOnInit(): void {
 
    this.loadFeedbacks();
 
  }
 
  loadFeedbacks() {
 
    this.feedbackService.getFeedbacks().subscribe({
 
      next: (res) => {
 
        this.feedbacks = res;
 
      },
 
      error: (err) => {
 
        alert('Failed to load feedbacks!');
 
      }
 
    });
 
  }
 
}
 