// home.component.ts
//  - home component declaration
// -------------------------------------------------------------------------------------------------

// importing 3rd party libraries
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Meta, Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// custom modules
import { TodoService } from '@app/todo/todo.service';
import { AuthService } from '@app/auth/auth.service';

// creating the component
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  // component variable declarations
  public todos = [];
  public todoForm: FormGroup;
  private componentName = 'home';

  constructor(
    public meta: Meta,
    public title: Title,
    public router: Router,
    public snackBar: MatSnackBar,
    public todoService: TodoService,
    public authService: AuthService,
    public formBuilder: FormBuilder
  ) {
    // creating the todo form validation group
    this.todoForm = formBuilder.group({
      todo: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(256)
        ]
      ]
    });

    // adding title
    title.setTitle('HCL Challenge');

    // adding meta tags to the component
    meta.addTags([
      {
        name: 'author',
        content: 'Bruno Duarte Brito'
      },
      {
        name: 'keywords',
        content: 'challenge'
      },
      {
        name: 'description',
        content: 'HCL Challenge by Bruno Duarte Brito'
      }
    ]);
  }

  // submits a todo to the services
  submitTodo(todo: string): void {
    // resetting the todo form
    this.todoForm.reset();

    // creating an object for the sent todo (in the format of the API response)
    const todoObject = {
      text: todo
    };

    // pushing the todo object to the list
    this.todos.push(todoObject);

    // sending a todo to the API
    this.todoService.sendTodo(todoObject).subscribe(
      success => {
        this.snackBar.open(success.message);
      },
      error => {
        // showing snackbar notification
        this.snackBar.open(error.message);
      }
    );
  }

  // logs the user out
  logout(): void {
    // logging the user out
    this.authService.logout();

    // redirecting to the login route
    this.router.navigate(['/auth']);
  }
}
