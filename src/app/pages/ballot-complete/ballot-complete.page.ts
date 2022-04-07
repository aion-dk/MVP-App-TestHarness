import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Browser } from '@capacitor/browser';
import { DrClientService } from 'src/app/api/drclient.service';

@Component({
  selector: 'app-ballot-complete',
  templateUrl: './ballot-complete.page.html',
  styleUrls: ['./ballot-complete.page.scss'],
})
export class BallotCompletePage implements OnInit {
  paramData: any;
  precinctNum: number;
  results = [];
  serverURL: any;

  constructor(private router: Router, public drClientService: DrClientService) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.paramData = this.router.getCurrentNavigation().extras.state.user;
    }
  }

  ngOnInit() {
    fetch('./assets/inputFile/input.json')
      .then((res) => res.json())
      .then((json) => {
        this.results = json[0].ballot_comp;
      });
  }

  goToFinish() {
    this.router.navigate(['print']);
  }

  async openPDF(precinctNum) {
    if (precinctNum === 1) {
      await Browser.open({
        url: 'https://drive.google.com/file/d/1Wrk9xhJkMFVEqtBBJgw2qZOTS9nqFxwk/view?usp=sharing',
      });
    } else if (precinctNum === 2) {
      await Browser.open({
        url: 'https://drive.google.com/file/d/1cV-4autG5EmSzThK82-0WWbFRv2RnkuR/view?usp=sharing',
      });
    } else if (precinctNum === 3) {
      await Browser.open({
        url: 'https://drive.google.com/file/d/16A2tzWcmvLQzXBdHordJ0OZbT2li2I8j/view?usp=sharing',
      });
    } else {
      await Browser.open({
        url: 'https://drive.google.com/file/d/1C6TO44gUkkljSyNLXdV_e1X7wPvEc3eA/view?usp=sharing',
      });
    }
  }

  async openPDF2(precinctNum) {
    if (precinctNum === 1) {
      await Browser.open({
        url: 'https://drive.google.com/file/d/1kn2xt5WxYzTn-NsbPc1X3BMqI47rjHDP/view?usp=sharing',
      });
    } else if (precinctNum === 2) {
      await Browser.open({
        url: 'https://drive.google.com/file/d/1BSmmTchFQ3X8MD4wEmsIStA2hV97nRS1/view?usp=sharing',
      });
    } else if (precinctNum === 3) {
      await Browser.open({
        url: 'https://drive.google.com/file/d/1oB_xaVUPwK6oE_9Np_iTymAU-lV2urJT/view?usp=sharing',
      });
    } else {
      await Browser.open({
        url: 'https://drive.google.com/file/d/160p-8lKOlIWXffnXZGR3Pf1gXf6mQYQW/view?usp=sharing',
      });
    }
  }

  async openXML(precinctNum) {
    if (precinctNum === 1) {
      await Browser.open({
        url: 'https://drive.google.com/file/d/1pIe31DRlAtmcdsTeCc1HrAHKQ82N6wYL/view?usp=sharing',
      });
    } else if (precinctNum === 2) {
      await Browser.open({
        url: 'https://drive.google.com/file/d/1WUl5lTFPDYB8FJYdxq5FKhJGPaQgyy1Y/view?usp=sharing',
      });
    } else if (precinctNum === 3) {
      await Browser.open({
        url: 'https://drive.google.com/file/d/1A_NWcXXqOLzr8OHnzmEEnCNcrYyBiViz/view?usp=sharing',
      });
    } else {
      await Browser.open({
        url: 'https://drive.google.com/file/d/1FBLU2ZGeVOO71zwqnPiWtOH_ibgCosId/view?usp=sharing',
      });
    }
  }

  physicalret() {
    this.router.navigate(['/print-return']);
  }
  digitalret() {
    this.router.navigate([
      '/request-access-code',
      {
        t: new Date().getTime(),
      },
    ]);
  }

  ballotReturnChoice(choice) {
    const voterChoice = choice;
    localStorage.setItem('voterChoiceForChooseReturn', JSON.stringify(voterChoice));
    // this method previously created a constant which was never used
    // todo: figure out what the original intent was and implement it
  }
}
