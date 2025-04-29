import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

// The @Component decorator provides metadata about the NavbarComponent.
@Component({
  selector: 'app-navbar', // Specifies the HTML tag used for this component.
  templateUrl: './navbar.component.html' // Links the HTML file that defines the view of the navbar.
})
export class NavbarComponent {

  // Constructor initializes required services, making them available within the component.
  // 'authService' is used for authentication-related operations.
  // 'router' is used for navigation between routes/pages.
  constructor(public authService: AuthService, private router: Router) { }

  // Method to log out the user.
  logout() {
    // Display a confirmation dialog box asking the user if they want to log out.
    if (confirm('Are you sure you want to logout?')) {

      // Call the logout method of AuthService to clear authentication data or sessions.
      this.authService.logout();

      // Navigate the user to the login page after logging out.
      this.router.navigate(['/login']);
    }
  }
}