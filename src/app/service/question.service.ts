import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, tap, throwError} from "rxjs";
import {CustomResponse} from "../interface/custom-response";
import {Topic} from "../enums/topic.enum";


@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private readonly apiUrl = 'http://localhost:8080/atena';

  constructor(private http: HttpClient) {
  }



  getQuestionsForTopic$ = (topic: Topic): Observable<CustomResponse> => {
    console.log(`Sending request to ${this.apiUrl}/questions/${topic}`);

    return <Observable<CustomResponse>>
      this.http.get<CustomResponse>(`${this.apiUrl}/questions/${topic}`)
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
