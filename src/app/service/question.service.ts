import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, tap, throwError} from "rxjs";
import {CustomResponse} from "../interface/custom-response";
import {Topic} from "../enums/topic.enum";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private readonly apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  topics$ = <Observable<CustomResponse>>
    this.http.get<CustomResponse>(`${this.apiUrl}/question/list/topics`)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );
  questionsForGivenTopic$ = (topic: Topic) => <Observable<CustomResponse>>
    this.http.get<CustomResponse>(`${this.apiUrl}/question/list/${topic}`)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );
  question$ = (id: number) => <Observable<CustomResponse>>
    this.http.get<CustomResponse>(`${this.apiUrl}/question/${id}`)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(`Error ${error} occurred`);
    return throwError(() => new Error(`An error occurred - Error code: ${error.status}`));
  }
}
