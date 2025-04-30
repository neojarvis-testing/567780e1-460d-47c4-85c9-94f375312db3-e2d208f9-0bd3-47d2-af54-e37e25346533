import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MentorshipApplication } from 'src/app/models/mentorshipapplication.model';
import { MentorshipService } from 'src/app/services/mentorship.service';

@Component({
  selector: 'app-mentorshipapplicationform',
  templateUrl: './mentorshipapplicationform.component.html',
  styleUrls: ['./mentorshipapplicationform.component.css']
})
export class MentorshipapplicationformComponent implements OnInit {

  mentorshipApplication: MentorshipApplication = {
    UserId: 0,
    MentorshipProgramId: 0,
    ReasonForApplying: '',
    CareerGoals: '',
    ProfileImage: '',
    ApplicationStatus: 'Pending',
    ApplicationDate: new Date().toISOString()
  };



  constructor(private route: ActivatedRoute, private router: Router, private mentorshipservice: MentorshipService) { }

  ngOnInit(): void {
    const userId = Number(localStorage.getItem('userId'));
    
    this.route.params.subscribe(params => {
      const programId = +params['id'];  // Extract program ID dynamically
      this.mentorshipApplication.UserId = userId;
      this.mentorshipApplication.MentorshipProgramId = programId;
    });
  }
  

  submit() {
    if (!this.mentorshipApplication.ReasonForApplying || !this.mentorshipApplication.CareerGoals || !this.mentorshipApplication.ProfileImage) {
      alert('All fields are required!');
      return;
    }

    this.mentorshipservice.addMentorshipApplication(this.mentorshipApplication).subscribe({

      next: () => {
        alert('Successfully Submitted!');
        this.router.navigate(['/user/view-mentorships']);
      },

      error: (err) => {
        alert(err.error.message || 'Failed to submit application!');
      }
    });
  }

  back() {
    this.router.navigate(['/user/view-mentorships']);
  }

}



