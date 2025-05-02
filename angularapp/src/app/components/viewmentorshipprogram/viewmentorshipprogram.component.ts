
import { Component, OnInit } from '@angular/core';

import { MentorshipService } from '../../services/mentorship.service';

import { MentorshipProgram } from 'src/app/models/mentorshipprogram.model';

import { Router } from '@angular/router';

@Component({

  selector: 'app-viewmentorshipprogram',
  styleUrls: ['./viewmentorshipprogram.component.css'],

  templateUrl: './viewmentorshipprogram.component.html'

})

export class ViewmentorshipprogramComponent implements OnInit {

  mentorshipPrograms: MentorshipProgram[] = [];

  filteredPrograms: MentorshipProgram[] = [];

  searchTerm: string = '';

  constructor(private mentorshipService: MentorshipService, private router: Router) { }

  ngOnInit(): void {

    this.loadPrograms();

  }

  loadPrograms() {

    this.mentorshipService.getAllMentorshipPrograms().subscribe({

      next: (res) => {

        this.mentorshipPrograms = res;

        this.filteredPrograms = res;

      },

      error: (err) => {

        alert('Failed to load mentorship programs!');

      }

    });

  }

  search() {

    const term = this.searchTerm.toLowerCase();

    this.filteredPrograms = this.mentorshipPrograms.filter(program =>

      program.ProgramName.toLowerCase().includes(term) ||

      program.MentorName.toLowerCase().includes(term)

    );

  }

  editProgram(id: number) {

    this.router.navigate(['/edit-mentorship', id]);

  }

  deleteProgram(id: number) {

    if (confirm('Are you sure you want to delete this program?')) {

      this.mentorshipService.deleteMentorshipProgram(id).subscribe({

        next: () => {

          alert('Deleted Successfully');

          this.loadPrograms();

        },

        error: (err) => {

          alert(err.error.message || 'Delete failed! (Maybe already referenced)');

        }

      });

    }

  }

}
