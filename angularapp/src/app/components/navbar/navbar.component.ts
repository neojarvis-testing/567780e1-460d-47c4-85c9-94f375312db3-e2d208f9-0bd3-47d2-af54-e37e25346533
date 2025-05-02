import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

// The @Component decorator provides metadata about the NavbarComponent.
@Component({
  selector: 'app-navbar', // Specifies the HTML tag used for this component.
  styleUrls:['./navbar.component.css'],
  templateUrl: './navbar.component.html' // Links the HTML file that defines the view of the navbar.
})
export class NavbarComponent {
  constructor(public authService: AuthService, private router: Router) { }

  logout() {
    if (confirm('Are you sure you want to logout?')) {

      // Call the logout method of AuthService to clear authentication data or sessions.
      this.authService.logout();

      // Navigate the user to the login page after logging out.
      this.router.navigate(['/login']);
    }
  }
}