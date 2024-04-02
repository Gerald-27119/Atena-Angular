import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, tap, throwError} from "rxjs";
import {CustomResponse} from "../interface/custom-response";

/**
 * This is a QuestionService class that provides methods to fetch questions and subtopics from a backend API.
 */
@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private readonly apiUrl = 'http://localhost:8080/atena';

  constructor(private http: HttpClient) {
  }

  getSubtopicsForTopic$ = (topic: string): Observable<CustomResponse> => {
    console.log(`Sending request to ${this.apiUrl}/subtopics/${topic}`);
    return <Observable<CustomResponse>>
      this.http.get<CustomResponse>(`${this.apiUrl}/subtopics/${topic}`)
        .pipe(
          tap(console.log),
          catchError(this.handleError)
        );
  }

  getQuestionsForSubtopic$ = (topic: string, subtopic: string): Observable<CustomResponse> => {
    console.log(`Sending request to ${this.apiUrl}/questions/${topic}/${subtopic}`);
    return <Observable<CustomResponse>>
      this.http.get<CustomResponse>(`${this.apiUrl}/questions/${topic}/${subtopic}`)
        .pipe(
          tap(console.log),
          catchError(this.handleError)
        );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(`Error ${error} occurred`);
    return throwError(() => new Error(`An error occurred - Error code: ${error.status}`));
  }
}
