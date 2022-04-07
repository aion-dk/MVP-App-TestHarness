import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StatuscodeService } from 'src/app/api/statuscode.service';
import { DrClientService } from 'src/app/api/drclient.service';

@Component({
  selector: 'app-access-code',
  templateUrl: './access-code.page.html',
  styleUrls: ['./access-code.page.scss'],
})
export class AccessCodePage implements OnInit {
  alertController: any;
  otpForm: FormGroup;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @ViewChild('first', {
    static: false,
  })
  first: ElementRef;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @ViewChild('second', {
    static: false,
  })
  second: ElementRef;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @ViewChild('third', {
    static: false,
  })
  third: ElementRef;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @ViewChild('four', {
    static: false,
  })
  four: ElementRef;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @ViewChild('five', {
    static: false,
  })
  five: ElementRef;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @ViewChild('singUp', {
    static: false,
  })
  singUp: ElementRef;
  data: string;
  results = [];

  constructor(
    private route: Router,
    public fb: FormBuilder,
    private toastctrl: ToastController,
    private alertctrl: AlertController,
    private loadingctrl: LoadingController,
    public statuscodeService: StatuscodeService,
    public drClientService: DrClientService
  ) {
    this.createOTPForm();
  }

  ngOnInit() {
    fetch('./assets/inputFile/input.json')
      .then((res) => res.json())
      .then((json) => {
        this.results = json[0].access_code;
      });
  }

  getOtpValue() {
    return (
      this.otpForm.controls.first.value +
      this.otpForm.controls.second.value +
      this.otpForm.controls.third.value +
      this.otpForm.controls.four.value +
      this.otpForm.controls.five.value
    );
  }

  createOTPForm() {
    this.otpForm = this.fb.group({
      first: [null, Validators.required],
      second: [null, Validators.required],
      third: [null, Validators.required],
      four: [null, Validators.required],
      five: [null, Validators.required],
    });
  }

  // eslint-disable-next-line sonarjs/cognitive-complexity
  focusNext(event, index) {
    if (index === 1) {
      console.log(event.which !== 8);
      if (event.which !== 8) {
        this.second.nativeElement.focus();
      }
      index = '';
    } else if (index === 2) {
      if (event.which !== 8) {
        this.third.nativeElement.focus();
      } else if (event.target.value.length <= 0) {
        this.first.nativeElement.focus();
      }
      index = '';
    } else if (index === 3) {
      if (event.which !== 8) {
        this.four.nativeElement.focus();
      } else if (event.target.value.length <= 0) {
        this.second.nativeElement.focus();
      }
      index = '';
    } else if (index === 4) {
      if (event.which !== 8) {
        this.five.nativeElement.focus();
      } else if (event.target.value.length <= 0) {
        this.third.nativeElement.focus();
        index = '';
      }
    } else {
      if (event.which === 8 && event.target.value.length <= 0) {
        this.four.nativeElement.focus();
      }
      index = '';
    }
  }

  async nextbtn() {
    this.data = this.getOtpValue();
    if (this.data === '') {
      this.presentAlertEmpty();
    } else {
      const loading = await this.loadingctrl.create({
        message: 'Check Authorization....',
      });
      await loading.present();

      return new Promise(() => {
        loading.dismiss();
        this.drClientService
          .validateAccessCode(this.data)
          .then(() => {
            this.route.navigate([
              '/before-you-finish',
              {
                code: this.data,
              },
            ]);
          })
          .catch((res) => {
            if (res.message === 'call out of order error') {
              this.route.navigate(['/calloutoforder-access00002-error']);
            } else if (res.message === 'access code expired') {
              this.route.navigate(['/code_expired_access00003_error']);
            } else if (res.message === 'access code invalid') {
              this.route.navigate(['/code_invalid_access00004_error']);
            } else if (res.message === 'network code') {
              this.route.navigate(['/check-network-access00005-error']);
            }
          });
        // this appears to be a function declaration, so I'm not entirely sure what it does
        // todo: figure out the original intent, implement accordingly, and remove the eslint disable
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        () => {
          loading.dismiss();
          this.presentAlertConfirm('Timeout');
        };
      });
    }
  }

  async presentAlertEmpty() {
    const alert = await this.alertctrl.create({
      message: (this.results as any).alert_msg,
      buttons: [
        {
          text: 'Retry',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {},
        },
      ],
    });
    await alert.present();
  }

  async presentToast(a) {
    const toast = await this.toastctrl.create({
      message: a,
      duration: 3000,
      position: 'middle',
    });
    toast.present();
  }

  async presentAlertConfirm(a) {
    const alert = await this.alertController.create({
      header: a,
      backdropDissmiss: false,
      buttons: [
        {
          text: 'Cancel',
          handler: (blah) => {
            console.log('Confirm Cancel: blah', blah);
          },
        },
        {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
          },
        },
      ],
    });
    await alert.present();
  }

  backbtn() {
    this.route.navigate(['/request-access-code']);
  }

  numberOnlyValidation(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}
