// todo.routing.ts
//  - todo module routing declaration
// -------------------------------------------------------------------------------------------------

// importing 3rd party libraries
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// importing custom components
import { HomeComponent } from '@app/todo/home/home.component';

// creating the routes
const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
];

// creating the module
@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class TodoRoutingModule {}
