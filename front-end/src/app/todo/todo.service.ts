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
        // Authorization: this.authService.getToken()
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

  /**
   * @description Retrieves the todos from the current user
   * @param author Author of the todo
   */
  getTodos(author: any): Observable<any> {
    // creating the HTTP Options (with headers)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // Authorization: this.authService.getToken()
      })
    };

    // returning the request
    return this.http.get(`${environment.apiUrl}/todos/${author}`, httpOptions);
  }

  /**
   * @description Deletes a todo from the server
   * @param id ID of the todo
   */
  deleteTodo(id: string): Observable<any> {
    // creating the HTTP Options (with headers)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    // returning the request
    return this.http.delete(`${environment.apiUrl}/todo/${id}`, httpOptions);
  }
}
