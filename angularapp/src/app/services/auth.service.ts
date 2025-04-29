import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Login } from '../models/login.model';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Base URL for API endpoints.
  private apiUrl = "https://8080-dfadabbbaceadbcfceefbaaddebedfbddafee.premiumproject.examly.io/api/";

  // BehaviorSubject to hold the current user's role, defaulting to an empty string.
  public currentUserRole = new BehaviorSubject<string>('');

  // BehaviorSubject to hold the current user's ID, defaulting to 0.
  public currentUserId = new BehaviorSubject<number>(0);

  // Injecting HttpClient for making HTTP requests.
  constructor(private http: HttpClient) { }

  /**
   * Registers a new user.
   * Sends an HTTP POST request to the '/register' endpoint with the user details.
   *  user - The user data to be sent in the request.
   * returns An Observable of the server's response.
   */
  register(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  /**
   * Authenticates a user with login credentials.
   * Sends an HTTP POST request to the '/login' endpoint with the login details.
   * login - The login data (e.g., username and password).
   * returns An Observable of the server's response.
   */
  login(login: Login): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, login);
  }

  /**
   * Updates the current user's role in the BehaviorSubject.
   *  role - The role of the currently logged-in user.
   */
  setRole(role: string) {
    this.currentUserRole.next(role);
  }

  /**
   * Updates the current user's ID in the BehaviorSubject.
   * id - The ID of the currently logged-in user.
   */
  setUserId(id: number) {
    this.currentUserId.next(id);
  }

  /**
   * Logs out the current user.
   * Removes token, role, and user ID from local storage.
   * Resets the BehaviorSubjects to their initial values.
   */
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    this.currentUserRole.next('');
    this.currentUserId.next(0);
  }

  /**
   * Checks if a user is logged in.
   * Determines this by checking the presence of a token in local storage.
   * returns A boolean indicating whether the user is logged in.
   */
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}