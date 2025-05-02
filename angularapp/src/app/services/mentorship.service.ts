import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MentorshipProgram } from '../models/mentorshipprogram.model';
import { MentorshipApplication } from '../models/mentorshipapplication.model';

@Injectable({
  providedIn: 'root'
})
export class MentorshipService {

  // Base URL for API endpoints related to mentorship programs and applications.

  public apiUrl = "https://8080-cdcacccccaadbcfceefbaaddebedfbddafee.premiumproject.examly.io/api";

  // Injecting HttpClient for performing HTTP operations.
  constructor(private http: HttpClient) { }

  /**
   * Generates HTTP headers required for API requests.
   * Includes an Authorization token retrieved from the browser's local storage.
   * returns An object containing headers with an Authorization token.
   */
  private getHeaders() {
    const token = localStorage.getItem('jwtToken');
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }

  /**
   * Fetches all available mentorship programs from the server.
   * returns An Observable emitting an array of MentorshipProgram objects.
   */
  getAllMentorshipPrograms(): Observable<MentorshipProgram[]> {
    return this.http.get<MentorshipProgram[]>(`${this.apiUrl}/mentorship-program`, this.getHeaders());
  }

  /**
   * Fetches a specific mentorship program by its ID.
   *  id - The unique ID of the mentorship program to fetch.
   * returns An Observable emitting a MentorshipProgram object.
   */
  getMentorshipProgramById(id: number): Observable<MentorshipProgram> {
    return this.http.get<MentorshipProgram>(`${this.apiUrl}/mentorship-program/${id}`, this.getHeaders());
  }

  /**
   * Adds a new mentorship program.
   * Sends the program details to the server via an HTTP POST request.
   * program - The MentorshipProgram object to be added.
   * returns An Observable emitting the added MentorshipProgram object.
   */
  addMentorshipProgram(program: MentorshipProgram): Observable<MentorshipProgram> {
    return this.http.post<MentorshipProgram>(`${this.apiUrl}/mentorship-program`, program, this.getHeaders());
  }

  /**
   * Updates an existing mentorship program by its ID.
   * Sends updated program details to the server via an HTTP PUT request.
   *  id - The ID of the mentorship program to be updated.
   * program - The updated MentorshipProgram object.
   * returns An Observable emitting the updated MentorshipProgram object.
   */
  updateMentorshipProgram(id: number, program: MentorshipProgram): Observable<MentorshipProgram> {
    return this.http.put<MentorshipProgram>(`${this.apiUrl}/mentorship-program/${id}`, program, this.getHeaders());
  }

  /**
   * Deletes a mentorship program by its ID.
   * Sends an HTTP DELETE request to remove the specified program from the server.
   *  id - The ID of the mentorship program to be deleted.
   * returns An Observable that completes when the program is deleted.
   */
  deleteMentorshipProgram(mentorshipProgramId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/mentorship-program/${mentorshipProgramId}`, this.getHeaders());
  }

  /**
   * Submits a mentorship application.
   * Sends the application details to the server via an HTTP POST request.
   *  application - The MentorshipApplication object to be submitted.
   * returns An Observable emitting the submitted MentorshipApplication object.
   */
  addMentorshipApplication(data: MentorshipApplication): Observable<MentorshipApplication> {
    return this.http.post<MentorshipApplication>(`${this.apiUrl}/mentorship-application`, data, this.getHeaders());
  }

  /**
   * Fetches mentorship programs applied for by a specific user.
   *  userId - The ID of the user whose applications are to be fetched.
   * returns An Observable emitting an array of MentorshipApplication objects.
   */
  getAppliedMentorshipPrograms(userId: number): Observable<MentorshipApplication[]> {
    return this.http.get<MentorshipApplication[]>(`${this.apiUrl}/mentorship-application/user/${userId}`, this.getHeaders());
  }

  /**
   * Fetches all mentorship applications from the server.
   * returns An Observable emitting an array of all MentorshipApplication objects.
   */
  getAllMentorshipApplications(): Observable<MentorshipApplication[]> {
    return this.http.get<MentorshipApplication[]>(`${this.apiUrl}/mentorship-application`, this.getHeaders());
  }

  /**
   * Updates the status of a specific mentorship application by its ID.
   * Sends updated application details to the server via an HTTP PUT request.
   *  id - The ID of the mentorship application to be updated.
   * application - The updated MentorshipApplication object.
   * returns An Observable emitting the updated MentorshipApplication object.
   */
  updateApplicationStatus(id: number, mentorshipApplication: MentorshipApplication): Observable<MentorshipApplication> {
    return this.http.put<MentorshipApplication>(`${this.apiUrl}/mentorship-application/${id}`, mentorshipApplication, this.getHeaders());
  }

  /**
   * Deletes a mentorship application by its ID.
   * Sends an HTTP DELETE request to remove the specified application from the server.
   *  id - The ID of the mentorship application to be deleted.
   * returns An Observable that completes when the application is deleted.
   */
  deleteMentorshipApplication(mentorshipApplicationId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/mentorship-application/${mentorshipApplicationId}`, this.getHeaders());
  }
}