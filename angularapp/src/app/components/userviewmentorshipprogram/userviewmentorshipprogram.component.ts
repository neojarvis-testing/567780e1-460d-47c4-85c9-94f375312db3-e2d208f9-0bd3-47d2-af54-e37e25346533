import { Component, OnInit } from '@angular/core';

import { MentorshipService } from '../../services/mentorship.service';

import { MentorshipProgram } from 'src/app/models/mentorshipprogram.model';

import { Router } from '@angular/router';

@Component({

  selector: 'app-userviewmentorshipprogram',

  templateUrl: './userviewmentorshipprogram.component.html'

})

export class UserviewmentorshipprogramComponent implements OnInit {

  programs: MentorshipProgram[] = [];

  searchTerm: string = '';

  constructor(private mentorshipService: MentorshipService, private router: Router) {}

  ngOnInit(): void {

    this.loadPrograms();

  }

  loadPrograms() {

    this.mentorshipService.getAllMentorshipPrograms().subscribe({

      next: (res) => {

        this.programs = res;

      },

      error: (err) => {

        alert('Failed to load programs!');

      }

    });

  }

  applyProgram(id: number) {

    this.router.navigate(['/user/apply-mentorship', id]);

  }

}

