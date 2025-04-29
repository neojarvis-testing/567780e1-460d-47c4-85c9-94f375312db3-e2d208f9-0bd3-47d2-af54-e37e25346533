
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { MentorshipService } from '../../services/mentorship.service';

import { MentorshipProgram } from 'src/app/models/mentorshipprogram.model';

@Component({

  selector: 'app-admineditmentorshipprogram',

  templateUrl: './admineditmentorshipprogram.component.html'

})

export class AdmineditmentorshipprogramComponent implements OnInit {

  mentorshipId: number = 0;

  mentorship: MentorshipProgram = {

    ProgramName: '',

    Description: '',

    FieldOfMentorship: '',

    DurationInMonths: 0,

    MentorName: '',

    ExperienceLevel: '',

    ModeOfMentorship: ''

  };



  constructor(

    private route: ActivatedRoute,

    private mentorshipService: MentorshipService,

    private router: Router

  ) { }

  ngOnInit(): void {

    // this.mentorshipId = this.route.snapshot.params['id'];
    this.route.params.subscribe((p) => {
      this.mentorshipId = Number(p['id']);

      if (this.mentorshipId) {
        this.loadMentorship();
      }
    });

   

  }

  loadMentorship() {

    this.mentorshipService.getMentorshipProgramById(this.mentorshipId).subscribe({

      next: (res) => {

        this.mentorship = res;

      },

      error: (err) => {

        alert('Failed to load mentorship details.');

      }

    });

  }

  update() {

    this.mentorshipService.updateMentorshipProgram(this.mentorshipId, this.mentorship).subscribe({

      next: () => {

        alert('Updated successfully!');

        this.router.navigate(['/admin/view-mentorships']);

      },

      error: (err) => {

        alert(err.error.message || 'Update failed!');

      }

    });

  }

  back() {

    this.router.navigate(['/admin/view-mentorships']);

  }

}







