
import { Component } from '@angular/core';

import { MentorshipService } from '../../services/mentorship.service';

import { MentorshipProgram } from 'src/app/models/mentorshipprogram.model';

import { Router } from '@angular/router';

@Component({

  selector: 'app-creatementorshipprogram',

  templateUrl: './creatementorshipprogram.component.html'

})

export class CreatementorshipprogramComponent {

  mentorship: MentorshipProgram = {

    ProgramName: '',

    Description: '',

    FieldOfMentorship: '',

    DurationInMonths: 0,

    MentorName: '',

    ExperienceLevel: '',

    ModeOfMentorship: ''

  };

  constructor(private mentorshipService: MentorshipService, private router: Router) {}

  submit() {

    this.mentorshipService.addMentorshipProgram(this.mentorship).subscribe({

      next: () => {

        alert('Successfully Added!');

        this.router.navigate(['/admin/view-mentorships']);

      },

      error: (err) => {

        alert(err.error.message || 'Failed to Add!');

      }

    });

  }

}