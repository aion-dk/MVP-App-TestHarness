import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-check-your-pairing-codes',
  templateUrl: './check-your-pairing-codes.page.html',
  styleUrls: ['./check-your-pairing-codes.page.scss'],
})
export class CheckYourPairingCodesPage implements OnInit {
  results = [];
  getCode: any;
  cvr: any;

  constructor(private route: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.getCode = this.activatedRoute.snapshot.paramMap.get('code');
    fetch('./assets/inputFile/input.json')
      .then((res) => res.json())
      .then((json) => {
        this.results = json[0].check_your_pairing_code_page;
      });
  }

  yesBtn() {
    this.route.navigate([
      '/test-results',
      {
        code: this.getCode,
      },
    ]);
  }

  tobecontinueBtn() {
    this.route.navigate(['/tobecontinue']);
  }
}
