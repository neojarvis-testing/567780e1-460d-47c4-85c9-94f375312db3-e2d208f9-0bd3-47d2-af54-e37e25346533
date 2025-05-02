import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  
  // User model to hold registration form data
  user: User = {
    Email: '',
    Password: '',
    Username: '',
    MobileNumber: '',
    UserRole: '',
    SecretKey: ''
  };

  confirmPassword: string = ''; // Holds Confirm Password field value
  secretKeyValue: string = 'Admin@123'; // Hardcoded Secret Key for Admin role
  errorMessage: string = ''; // To show error messages
  showSecretKeyField: boolean = false; // Boolean to toggle Secret Key field display for Admin

  constructor(private authService: AuthService, private router: Router) {}

  // Called when the User Role field changes
  onRoleChange() {
    this.showSecretKeyField = (this.user.UserRole === 'Admin');
  }

  // Validates if Password and Confirm Password match
  passwordMismatch(): boolean {
    return this.user.Password !== this.confirmPassword;
  }

  // Method to handle form submission and registration
  register() {
    // If the Admin role is selected, validate the Secret Key
    if (this.user.UserRole === 'Admin' && this.user.SecretKey !== this.secretKeyValue) {
      this.errorMessage = 'Invalid Secret Key for Admin registration!';
      return;
    }

    // Check for password mismatch
    if (this.passwordMismatch()) {
      this.errorMessage = 'Passwords do not match!';
      return;
    }

    // Make API call to register the user
    this.authService.register(this.user).subscribe({
      next: (res) => {
        alert('Registered Successfully!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Registration error:', err); // Debugging log for error
        this.errorMessage = err.error.message || 'Registration failed!';
      }
    });
  }
}
