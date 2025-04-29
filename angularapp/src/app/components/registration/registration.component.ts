import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

// The @Component decorator defines metadata about this RegistrationComponent.
@Component({
  selector: 'app-registration', // Specifies the HTML tag used to identify this component.
  templateUrl: './registration.component.html' // Links the associated HTML template for the component's view.
})
export class RegistrationComponent {
  
  // User model to hold registration form data.
  user: User = {
    Email: '', // Email field initialized as an empty string.
    Password: '', // Password field initialized as an empty string.
    Username: '', // Username field initialized as an empty string.
    MobileNumber: '', // Mobile Number field initialized as an empty string.
    UserRole: '', // User role field initialized as an empty string.
    SecretKey: '' // Secret Key field initialized as an empty string.
  };

  // Hardcoded secret key for Admin role verification. This should be replaced with dynamic value in a production setup.
  secretKeyValue: string = 'Admin@123';

  // Variable to store error messages, displayed in the UI when validation or registration fails.
  errorMessage: string = '';

  // Boolean to determine if the Secret Key field should be displayed.
  showSecretKeyField: boolean = false;

  // Constructor initializes required services like AuthService for authentication and Router for navigation.
  constructor(private authService: AuthService, private router: Router) {}

  // Method triggered when the user role changes in the registration form.
  onRoleChange() {
    // Show the Secret Key field only if the user selects the Admin role.
    this.showSecretKeyField = (this.user.UserRole === 'Admin');
  }

  // Method to handle the registration process.
  register() {
    // Validate the Secret Key for Admin registration.
    if (this.user.UserRole === 'Admin' && this.user.SecretKey !== this.secretKeyValue) {
      // Show an error message if the Secret Key is invalid.
      this.errorMessage = 'Invalid Secret Key for Admin registration!';
      return; // Exit the function without proceeding further.
    }

    // Call the register method of AuthService to register the user.
    this.authService.register(this.user).subscribe({
      next: (res) => {
        // Show a success alert and navigate to the login page after successful registration.
        alert('Registered Successfully!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        // Handle errors and display an appropriate error message.
        this.errorMessage = err.error.message || 'Registration failed!';
      }
    });
  }
}