import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Login } from '../../models/login.model';

// The @Component decorator defines the component's metadata.
@Component({
  selector: 'app-login', // This is the HTML tag used to identify the component.
  templateUrl: './login.component.html' // The associated HTML file for the component's view.
})
export class LoginComponent {

  // Defining the login model to capture user's email and password input.
  loginModel: Login = { Email: '', Password: '' };

  // Variable to store and display error messages.
  errorMessage: string = '';

  // Constructor initializes services like AuthService for authentication 
  // and Router for navigation between routes.
  constructor(private authService: AuthService, private router: Router) { }

  // Method that handles the login logic.
  login() {
    // Check if email and password fields are not empty.
    if (!this.loginModel.Email || !this.loginModel.Password) {
      this.errorMessage = 'All fields are required!'; // Display error message if any field is empty.
      return; // Exit the function.
    }

    // Call the login method of AuthService with login details.
    this.authService.login(this.loginModel).subscribe({
      next: (response) => {
        // Store the returned authentication details in the local storage.
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);
        localStorage.setItem('userId', response.userId);
        localStorage.setItem('username', response.username);

        // Update AuthService with role and userId to maintain state.
        this.authService.setRole(response.role);
        this.authService.setUserId(response.userId);

        // Navigate to the appropriate page based on user role.
        if (response.role === 'Admin') {
          this.router.navigate(['/admin/home']); // Redirect Admin user to Admin home page.
        } else if (response.role === 'User') {
          this.router.navigate(['/user/home']); // Redirect general User to User home page.
        }
      },
      error: (err) => {
        // Handle errors and display an appropriate error message.
        this.errorMessage = err.error.message || 'Login failed!';
      }
    });
  }
}