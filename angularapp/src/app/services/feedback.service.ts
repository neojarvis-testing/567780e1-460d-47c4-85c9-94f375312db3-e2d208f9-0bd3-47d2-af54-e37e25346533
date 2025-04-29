import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Feedback } from '../models/feedback.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  // Base API URL for the feedback-related requests.
  public apiUrl = "https://8080-cdcacccccaadbcfceefbaaddebedfbddafee.premiumproject.examly.io";

  // Constructor injecting HttpClient for HTTP operations.
  constructor(private http: HttpClient) {}

  /**
   * Generates HTTP headers required for API requests.
   * Includes an Authorization token retrieved from the browser's local storage.
   * returns An object containing headers with an Authorization token.
   */
  private getHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }

  /**
   * Sends feedback to the server.
   *  feedback - The Feedback object containing user feedback details.
   * returns An Observable emitting the response with the submitted Feedback data.
   */
  sendFeedback(feedback: Feedback): Observable<Feedback> {
    return this.http.post<Feedback>(`${this.apiUrl}/feedback`, feedback, this.getHeaders());
  }

  /**
   * Retrieves all feedback submitted by a specific user.
   * param userId - The ID of the user whose feedback is to be fetched.
   * returns An Observable emitting an array of Feedback objects.
   */
  getAllFeedbacksByUserId(userId: number): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.apiUrl}/feedback/user/${userId}`, this.getHeaders());
  }

  /**
   * Retrieves all feedback from the server.
   * returns An Observable emitting an array of all Feedback objects.
   */
  getFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.apiUrl}/feedback`, this.getHeaders());
  }

  /**
   * Deletes a specific feedback entry from the server.
   *  id - The ID of the feedback to be deleted.
   * returns An Observable that completes once the feedback is successfully deleted.
   */
  deleteFeedback(feedbackId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/feedback/${feedbackId}`, this.getHeaders());
  }
}