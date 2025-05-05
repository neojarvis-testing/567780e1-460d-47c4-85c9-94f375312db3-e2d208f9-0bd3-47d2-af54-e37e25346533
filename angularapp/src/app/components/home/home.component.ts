import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  myIndex = 0;
 
  constructor(private authService: AuthService) { }
 
  ngOnInit(): void {
    this.initTypewriter();
  }
 
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
 
  isAdmin(): boolean {
    return this.authService.isAdmin();
  }
 
  isUser(): boolean {
    return this.authService.isUser();
  }
 
  private initTypewriter(): void {
    const text = "Empowering Mentor-Mentee Connections for Skill Development";
    const typewriterElement = document.getElementById("typewriter");
 
    if (!typewriterElement) return;
 
    let index = 0;
 
    function type() {
      if (index < text.length) {
        typewriterElement.textContent += text.charAt(index);
        index++;
        setTimeout(type, 50); // Adjust typing speed
      } else {
        // Reset after completion and restart typing after delay
        setTimeout(() => {
          typewriterElement.textContent = '';
          index = 0;
          type();
        }, 5000); // Adjust delay before restarting
      }
    }
 
    type();
  }
}
 