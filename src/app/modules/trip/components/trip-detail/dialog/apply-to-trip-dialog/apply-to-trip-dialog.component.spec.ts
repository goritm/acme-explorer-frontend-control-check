import {
  NbCardModule,
  NbDialogRef,
  NbStatusService,
  NbToastrService
} from '@nebular/theme';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ApplyToTripDialogComponent } from './apply-to-trip-dialog.component';
import { TripService } from 'src/app/modules/trip/trip.service';
import { Mock } from 'jest-mock';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { NgxTranslateModule } from 'src/app/modules/translate/translate.module';
import { of } from 'rxjs';

const createSpyObj = (
  baseName: any,
  methodNames: string | any[]
): { [key: string]: Mock<any> } => {
  const obj: any = {};

  for (let i = 0; i < methodNames.length; i++) {
    obj[methodNames[i]] = jest.fn();
  }

  return obj;
};

const testTrip = {
  id: 'tripId',
  title: 'tripTitle',
  description: 'tripDescription',
  price: 123
};

class DialogRefMock {
  componentRef = {
    instance: {
      trip: testTrip
    }
  };
  close() {}
}

describe('ApplyToTripDialogComponent', () => {
  let component: ApplyToTripDialogComponent;
  let fixture: ComponentFixture<ApplyToTripDialogComponent>;

  let tripServiceMock: { [x: string]: any };
  let toasterServiceMock: { [x: string]: any };

  beforeEach(async () => {
    toasterServiceMock = createSpyObj('NbToastrService', ['success', 'danger']);

    tripServiceMock = createSpyObj('TripService', ['applyToTrip']);
    tripServiceMock['applyToTrip'].mockReturnValue(
      of({
        message: 'You have successfully applied to the trip tripTitle',
        comments: 'comments',
        tripId: 'tripId'
      })
    );

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        NgxTranslateModule,
        NbCardModule
      ],
      declarations: [ApplyToTripDialogComponent],
      providers: [
        {
          provide: NbToastrService,
          useValue: toasterServiceMock
        },
        {
          provide: NbDialogRef,
          useClass: DialogRefMock
        },
        {
          provide: TripService,
          useValue: tripServiceMock
        },
        {
          provide: NbStatusService,
          useValue: createSpyObj(NbStatusService, ['isCustomStatus'])
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyToTripDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should create a form to fill the application comments', () => {
    expect(component.applicationForm instanceof FormGroup).toBeTruthy();
  });

  it('should call the tripService applyToTrip method when the form is submitted', () => {
    component.onSubmit(component.applicationForm);
    expect(tripServiceMock['applyToTrip']).toHaveBeenCalledTimes(1);
  });

  it('should call the toastrService success method when the form is submitted', () => {
    component.onSubmit(component.applicationForm);
    expect(toasterServiceMock['success']).toHaveBeenCalledTimes(1);
  });

  it('should be valid if form value is valid', () => {
    component.applicationForm.setValue({
      comments: 'test comments'
    });
    expect(component.applicationForm.valid).toBeTruthy();
  });

  // it('should allow the user to apply to the trip', () => {
  //   component.applicationForm.setValue({
  //     comments: 'test comments'
  //   });
  //   component.onSubmit(component.applicationForm);
  //   expect(tripServiceMock['applyToTrip']).toHaveBeenCalledTimes(1);
  //   expect(tripServiceMock['applyToTrip']).toHaveBeenCalledWith(
  //     null,
  //     testTrip.id
  //   );
  // });
});
