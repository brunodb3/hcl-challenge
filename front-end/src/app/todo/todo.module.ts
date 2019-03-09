// todo.module.ts
//  - todo module declaration
// -------------------------------------------------------------------------------------------------

// importing 3rd party libraries
import { NgModule } from '@angular/core';

// importing custom components
import { HomeComponent } from '@app/todo/home/home.component';

// importing custom modules
import { SharedModule } from '@app/shared';
import { TodoService } from '@app/todo/todo.service';
import { TodoRoutingModule } from '@app/todo/todo-routing.module';

// creating the module
@NgModule({
  imports: [
    // custom modules
    SharedModule,
    TodoRoutingModule
  ],
  declarations: [
    // custom components
    HomeComponent
  ],
  providers: [
    // custom providers
    TodoService
  ]
})
export class TodoModule {}
