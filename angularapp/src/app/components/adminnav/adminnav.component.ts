import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminnav',
  templateUrl: './adminnav.component.html'
})
export class AdminnavComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout(): void {
    if (confirm('Are you sure you want to logout?')) {
      this.authService.logout(); // AuthService's logout method will be tested as-is
      this.router.navigate(['/login']); // Navigation will follow as per the test case
    }
  }
}