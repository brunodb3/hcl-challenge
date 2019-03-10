// home.component.ts
//  - home component declaration
// -------------------------------------------------------------------------------------------------

// importing 3rd party libraries
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Meta, Title } from '@angular/platform-browser';
import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class HomeComponent implements OnInit, OnDestroy {
  // component variable declarations
  public user: any = {};
  public todoForm: FormGroup;
  public todos: Array<any> = [];
  private userSubscription: Subscription;
  private todoSubscription: Subscription;

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

  // fires when component is ready
  ngOnInit(): void {
    this.userSubscription = this.authService.currentUser().subscribe(
      user => {
        // navigating to the login route
        if (!user) this.router.navigate(['/auth/login'])

        this.user = user;

        // getting the todos for the current user
        this.todoSubscription = this.todoService.getTodos(this.user.email).subscribe(
          response => {
            this.todos = response.todos;
          },
          error => {
            this.snackBar.open(error.message);
          }
        )
      }
    );
  }

  // fires when the component is destroyed
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.todoSubscription.unsubscribe();
  }

  // submits a todo to the services
  submitTodo(todo: string): void {
    // resetting the todo form
    this.todoForm.reset();

    // creating an object for the sent todo (in the format of the API response)
    const todoObject = {
      title: todo,
      author: this.user.email
    };

    // sending a todo to the API
    this.todoService.sendTodo(todoObject).subscribe(
      success => {
        this.snackBar.open(success.message);
        // pushing the todo object to the list
        this.todos.push(success.todo);
      },
      error => {
        // showing snackbar notification
        this.snackBar.open(error.message);
      }
    );
  }

  // submits the delete request to the server
  delete(todo: any): void {
    // deleting a todo
    this.todoService.deleteTodo(todo._id).subscribe(
      success => {
        this.snackBar.open(success.message);
        // removing the todo object from the list
        this.todos.splice(this.todos.findIndex((each) => each._id === todo._id), 1);
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
