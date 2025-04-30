import { Component, OnInit } from '@angular/core';
import { MentorshipService } from '../../services/mentorship.service';
import { MentorshipApplication } from 'src/app/models/mentorshipapplication.model';
@Component({
  selector: 'app-mentorshipapplicationlist',
  templateUrl: './mentorshipapplicationlist.component.html'
})
export class MentorshipapplicationlistComponent implements OnInit {
  applications: MentorshipApplication[] = [];
  searchTerm: string = '';
  constructor(private mentorshipService: MentorshipService) {}
  ngOnInit(): void {
    this.mentorshipService.getAllMentorshipApplications().subscribe(res => {
      this.applications = res;
    });
  }
}