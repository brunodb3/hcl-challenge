// todo.service.ts
//  - todo service declaration
// -----------------------------------------------------------------------------

// importing 3rd party libraries
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

// importing environment
import { environment } from '@env/environment';

// importing custom modules
import { AuthService } from '@app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private http: HttpClient, private authService: AuthService) {}
  /**
   * @description Sends a todo to the API
   * @param todo Todo to send
   */
  sendTodo(todo: object): Observable<any> {
    // creating the HTTP Options (with headers)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.authService.getToken()
      })
    };

    // creating the request body
    const requestBody = { todo };

    // returning the POST request
    return this.http.post(
      `${environment.apiUrl}/todo`,
      requestBody,
      httpOptions
    );
  }
}
