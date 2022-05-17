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

class DialogRefMock {
  componentRef = {
    instance: {
      trip: {
        id: 'tripId',
        title: 'tripTitle',
        description: 'tripDescription',
        price: 123
      }
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
    tripServiceMock = createSpyObj('TripService', ['applyToTrip']);
    toasterServiceMock = createSpyObj('NbToastrService', ['success', 'danger']);
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
});
