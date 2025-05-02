import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/models/feedback.model';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({

  selector: 'app-userviewfeedback',

  templateUrl: './userviewfeedback.component.html'

})

export class UserviewfeedbackComponent implements OnInit {

  feedbacks: Feedback[] = [];

  userId: number = 0;

  constructor(private service: FeedbackService) {}

  ngOnInit(): void {

    this.service.getAllFeedbacksByUserId(this.userId).subscribe(res => {

      this.feedbacks = res;

    });

  }

}
