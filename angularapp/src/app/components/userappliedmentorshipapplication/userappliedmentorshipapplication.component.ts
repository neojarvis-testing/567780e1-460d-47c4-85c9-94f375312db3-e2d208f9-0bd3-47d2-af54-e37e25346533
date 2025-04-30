import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MentorshipService } from 'src/app/services/mentorship.service';

import { MentorshipApplication } from 'src/app/models/mentorshipapplication.model';
import { MentorshipProgram } from 'src/app/models/mentorshipprogram.model';

@Component({

  selector: 'app-userappliedmentorshipapplication',

  templateUrl: './userappliedmentorshipapplication.component.html'

})

export class UserappliedmentorshipapplicationComponent implements OnInit {

  applications: MentorshipProgram;

  userId: number = 0;

  constructor(private service: MentorshipService ,private router:Router) {}

  ngOnInit(): void {

    this.service.getMentorshipProgramById(this.userId).subscribe(res => {

      this.applications = res;

    });

  }

}