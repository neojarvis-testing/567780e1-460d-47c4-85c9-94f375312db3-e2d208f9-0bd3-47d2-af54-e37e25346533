import { Component, OnInit } from '@angular/core';
import { MentorshipService } from 'src/app/services/mentorship.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-userviewmentorshipprogram',
  templateUrl: './userviewmentorshipprogram.component.html',
  styleUrls: ['./userviewmentorshipprogram.component.css'],
})
export class UserviewmentorshipprogramComponent implements OnInit {
  searchTerm: string = '';
  mentorshipPrograms: any[] = [];
  filteredPrograms: any[] = [];
  noRecordsFound: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 6;
  showSearch: boolean = false;

  constructor(private mentorshipService: MentorshipService, private router: Router) {}

  ngOnInit(): void {
    this.fetchMentorshipPrograms();
  }

  fetchMentorshipPrograms(): void {
    // Show loading indicator with a custom message
    Swal.fire({
      title: 'Preparing your Programs...',
      text: 'Please wait while we load the mentorship programs.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.mentorshipService.getAllMentorshipPrograms().subscribe(
      (programs: any[]) => {
        this.mentorshipPrograms = programs.map(program => {
          const appliedStatus = localStorage.getItem(`applied_${program.MentorshipProgramId}`);
          program.applied = appliedStatus === 'true';
          program.canApply = appliedStatus !== 'true';
          return program;
        });
        this.filteredPrograms = [...this.mentorshipPrograms];
        this.noRecordsFound = this.filteredPrograms.length === 0;

        // Close loading indicator
        Swal.close();
      },
      (error) => {
        // Handle error and close loading indicator
        Swal.close();
        Swal.fire('Error', 'Failed to fetch programs. Please try again later.', 'error');
        this.noRecordsFound = true;
      }
    );
  }

  filterPrograms() {
    this.filteredPrograms = this.mentorshipPrograms.filter((program) =>
      program.ProgramName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      program.MentorName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.noRecordsFound = this.filteredPrograms.length === 0;
    this.currentPage = 1; // Reset to the first page after filtering
  }

  apply(program: any, id: number): void {
    if (!program.applied) {
      this.router.navigate([`user/mentorshipapplicationform/${id}`], { state: { program } });
      program.applied = true;
      localStorage.setItem(`applied_${program.ProgramName}`, 'true');
    }
  }

  addToWishlist(program: any): void {
    let wishlist = localStorage.getItem('wishlist');
    let wishlistPrograms = wishlist ? JSON.parse(wishlist) : [];
    wishlistPrograms.push(program);
    localStorage.setItem('wishlist', JSON.stringify(wishlistPrograms));
  }

  paginatedPrograms(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredPrograms.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredPrograms.length / this.itemsPerPage);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  toggleSearch(): void {
    this.showSearch = !this.showSearch;
  }
}
