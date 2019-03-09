// todo.service.spec.ts
//  - todo service test declarations
// -----------------------------------------------------------------------------

// importing 3rd party libraries
import { TestBed, inject } from '@angular/core/testing';

// importing custom modules
import { TodoService } from '@app/todo/todo.service';

// declaring TodoService test suite
describe('TodoService', () => {
  // configuring the test module
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoService]
    });
  });

  // declaring tests
  // should create the service injectable
  it('should be created', inject([TodoService], (service: TodoService) => {
    expect(service).toBeTruthy();
  }));
});
