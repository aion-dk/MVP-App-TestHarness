import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DrClientService } from 'src/app/api/drclient.service';

@Component({
  selector: 'app-check-your-pairing-codes',
  templateUrl: './check-your-pairing-codes.page.html',
  styleUrls: ['./check-your-pairing-codes.page.scss'],
})
export class CheckYourPairingCodesPage implements OnInit {
  results = [];
  getCode: any;
  cvr: any;

  constructor(private route: Router, private activatedRoute: ActivatedRoute, public drClientService: DrClientService) {}

  ngOnInit() {
    this.drClientService.waitForVerifierRegistration().then((verifierCode) => {
      this.getCode = verifierCode;
    });

    fetch('./assets/inputFile/input.json')
      .then((res) => res.json())
      .then((json) => {
        this.results = json[0].check_your_pairing_code_page;
      });
  }

  yesBtn() {
    this.drClientService.challengeBallot().then(() => {
      this.route.navigate([
        '/test-results',
        {
          code: this.getCode,
        },
      ]);
    });
  }

  tobecontinueBtn() {
    this.route.navigate(['/tobecontinue']);
  }
}
