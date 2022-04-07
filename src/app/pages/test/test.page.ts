import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { StatuscodeService } from 'src/app/api/statuscode.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {
  serverURL: any;
  results = [];

  constructor(private alertctrl: AlertController, private router: Router, public statuscodeService: StatuscodeService) {}

  ngOnInit() {
    this.autoCall();
  }

  backbtn() {
    this.router.navigate(['tobecontinue']);
  }
  async autoCall() {
    await this.initServerURL(environment.url);
    await this.requestAccessCodeStatic();
    await this.requestAccessCodeStaticT1();
    await this.validateAccessCodeStatic();
    await this.validateAccessCodeStatic3();
    await this.validateAccessCodeStatic4();
    await this.validateAccessCodeStatic5();
  }
  async initServerURL(bulletinBoardURL) {
    this.serverURL = bulletinBoardURL;
    this.presentAlertEmpty('bulletinBoardURL', bulletinBoardURL);
  }

  requestAccessCodeStatic() {
    return new Promise((resolve) => {
      const code = '00000';
      this.presentAlertEmpty(code, this.statuscodeService.statusCode('VoterRecordNotFound'));
      resolve(true);
    });
  }
  requestAccessCodeStaticT1() {
    return new Promise((resolve) => {
      const code = '00001';
      this.presentAlertEmpty(code, this.statuscodeService.statusCode('NetworkError'));
      resolve(true);
    });
  }

  validateAccessCodeStatic() {
    return new Promise((resolve) => {
      const code = '00002';
      this.presentAlertEmpty(code, this.statuscodeService.statusCode('InvalidStateError'));
      resolve(true);
    });
  }
  validateAccessCodeStatic3() {
    return new Promise((resolve) => {
      const code = '00003';
      this.presentAlertEmpty(code, this.statuscodeService.statusCode('AccessCodeExpired'));
      resolve(true);
    });
  }
  validateAccessCodeStatic4() {
    return new Promise((resolve) => {
      const code = '00004';
      this.presentAlertEmpty(code, this.statuscodeService.statusCode('AccessCodeInvalid'));
      resolve(true);
    });
  }
  validateAccessCodeStatic5() {
    return new Promise((resolve) => {
      const code = '00005';
      this.presentAlertEmpty(code, this.statuscodeService.statusCode('NetworkError'));
      resolve(true);
    });
  }

  async presentAlertEmpty(code, error) {
    const alert = await this.alertctrl.create({
      header: code,
      message: error,
      buttons: [
        {
          text: 'Okay',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {},
        },
      ],
    });
    await alert.present();
  }
}
