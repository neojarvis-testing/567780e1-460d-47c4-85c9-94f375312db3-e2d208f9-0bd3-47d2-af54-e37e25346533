import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { Feedback } from 'src/app/models/feedback.model';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({

  selector: 'app-useraddfeedback',

  templateUrl: './useraddfeedback.component.html'

})

export class UseraddfeedbackComponent {

  feedback: Feedback = { UserId: 0, FeedbackText: '', Date: new Date() };

  constructor(private service: FeedbackService, private router: Router) {}

  submit() {

    this.service.sendFeedback(this.feedback).subscribe(() => {

      alert('Feedback submitted');

      this.router.navigate(['/user/view-feedbacks']);

    });

  }

}
