import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { CheckYourPairingCodesPage } from './check-your-pairing-codes.page';

describe('CheckYourPairingCodesPage', () => {
  let component: CheckYourPairingCodesPage;
  let fixture: ComponentFixture<CheckYourPairingCodesPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CheckYourPairingCodesPage],
        imports: [IonicModule.forRoot(), RouterTestingModule],
      }).compileComponents();

      fixture = TestBed.createComponent(CheckYourPairingCodesPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
