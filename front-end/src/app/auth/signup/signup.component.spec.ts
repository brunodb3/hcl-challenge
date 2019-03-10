// signup.component.spec.ts
//  - signup component test declarations
// -----------------------------------------------------------------------------

// importing 3rd party libraries
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// importing custom modules
import { SignupComponent } from '@app/auth/signup/signup.component';

// declaring SignupComponent test suite
describe('SignupComponent', () => {
  // declaring variables
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  // configuring the test module
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // declaring tests
  // should create the component
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
