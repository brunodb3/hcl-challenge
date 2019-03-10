// auth.module.ts
//  - auth module declaration
// -------------------------------------------------------------------------------------------------

// importing 3rd party libraries
import { NgModule } from '@angular/core';

// importing custom components
import { LoginComponent } from '@app/auth/login/login.component';
import { SignupComponent } from '@app/auth/signup/signup.component';

// importing custom modules
import { SharedModule } from '@app/shared';
import { AuthRoutingModule } from '@app/auth/auth-routing.module';

// creating the module
@NgModule({
  imports: [
    // custom modules
    SharedModule,
    AuthRoutingModule
  ],
  declarations: [
    // custom components
    LoginComponent,
    SignupComponent
  ],
  providers: [
    // custom providers
  ]
})
export class AuthModule {}
