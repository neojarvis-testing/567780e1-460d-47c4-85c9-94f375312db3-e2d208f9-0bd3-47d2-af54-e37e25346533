import { Component, OnInit } from '@angular/core';
import { MentorshipService } from 'src/app/services/mentorship.service';
import { MentorshipProgram } from 'src/app/models/mentorshipprogram.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewmentorshipprogram',
  templateUrl: './viewmentorshipprogram.component.html',
  styleUrls: ['./viewmentorshipprogram.component.css']
})
export class ViewmentorshipprogramComponent implements OnInit {

  mentorshipPrograms: MentorshipProgram[] = [];
  filteredPrograms: MentorshipProgram[] = [];
  searchTerm: string = '';

  constructor(private mentorshipService: MentorshipService, private router: Router) {}

  ngOnInit(): void {
    this.loadPrograms();
  }

  loadPrograms() {
    this.mentorshipService.getAllMentorshipPrograms().subscribe({
      next: (res) => {
        this.mentorshipPrograms = res;
        this.filteredPrograms = res;
      },
      error: () => {
        console.error("Failed to load mentorship programs!");
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
    this.router.navigate(['/admin/edit-mentorship', id]);
  }

  deleteProgram(id: number) {
    this.mentorshipService.deleteMentorshipProgram(id).subscribe({
      next: () => {
        console.log("Deleted Successfully");
        this.loadPrograms();
      },
      error: (err) => {
        console.error(err.error.message || "Delete failed! (Maybe already referenced)");
      }
    });
  }
}
