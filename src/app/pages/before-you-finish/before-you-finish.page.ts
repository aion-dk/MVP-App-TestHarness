import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DrClientService } from 'src/app/api/drclient.service';
import { VoterartifactsService } from 'src/app/api/voterartifacts.service';

@Component({
  selector: 'app-before-you-finish',
  templateUrl: './before-you-finish.page.html',
  styleUrls: ['./before-you-finish.page.scss'],
})
export class BeforeYouFinishPage implements OnInit {
  results = [];
  getCode: any;
  cvr: any;

  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,
    public drClientService: DrClientService,
    public voterartifactsService: VoterartifactsService
  ) {}

  ngOnInit() {
    this.getCode = this.activatedRoute.snapshot.paramMap.get('code');
    fetch('./assets/inputFile/input.json')
      .then((res) => res.json())
      .then((json) => {
        this.results = json[0].beforeyoufinish_page;
      });
  }

  nextbtn() {
    this.cvr = this.voterartifactsService.cvr;

    this.drClientService
      .constructBallot(this.cvr)
      .then(() => {
        this.route.navigate([
          '/ballot-fingerprint',
          {
            code: this.getCode,
          },
        ]);
      })
      .catch((res) => {
        if (res.message === 'call out of order error') {
          this.route.navigate(['/calloutoforder_construct00006_error']);
        } else if (res.message === 'network code') {
          this.route.navigate(['/check_network_construct00007_error']);
        } else if (res.message === 'corrupt CVR') {
          this.route.navigate(['/corrupt_cv_construct00008_error']);
        } else {
          console.error(res);
        }
      });
  }
}
