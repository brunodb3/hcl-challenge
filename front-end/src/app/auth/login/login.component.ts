// login.component.ts
//  - login component declaration
// -------------------------------------------------------------------------------------------------

// importing 3rd party libraries
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Meta, Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OnInit, OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

// custom modules
import { AuthService } from '@app/auth/auth.service';

// creating the component
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  // component variable declarations
  public loginForm: FormGroup;
  private userSubscription: Subscription;

  constructor(
    public meta: Meta,
    public title: Title,
    public router: Router,
    public snackBar: MatSnackBar,
    public authService: AuthService,
    public formBuilder: FormBuilder
  ) {
    // creating the message form validation group
    this.loginForm = formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(256)
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(256)
        ]
      ]
    });

    // adding title
    title.setTitle('HCL Challenge - Login');

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
        // navigating to the todo route
        if (user) this.router.navigate(['/todo'])
      }
    );
  }

  // fires when component is destroyed
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  // submits the login request to the services
  submitLogin(email: string, password: string): void {
    // resetting the login form
    this.loginForm.reset();

    // sending the login request to the API
    this.authService.sendLogin(email, password).then(
      success => {
        // showing snackbar notification
        this.snackBar.open(`Welcome ${email}`);
        this.router.navigate(['/todo']);
      },
      error => {
        // showing snackbar notification
        this.snackBar.open(error.message);
      }
    );
  }
}
