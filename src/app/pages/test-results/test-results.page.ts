import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DrClientService } from 'src/app/api/drclient.service';
import { VoterartifactsService } from 'src/app/api/voterartifacts.service';
@Component({
  selector: 'app-test-results',
  templateUrl: './test-results.page.html',
  styleUrls: ['./test-results.page.scss'],
})
export class TestResultsPage implements OnInit {
  results = [];
  getCode: any;
  cvr: any;

  constructor(
    private route: Router,
    public drClientService: DrClientService,
    private activatedRoute: ActivatedRoute,
    public voterartifactsService: VoterartifactsService
  ) {}

  ngOnInit() {
    this.getCode = this.activatedRoute.snapshot.paramMap.get('code');
    fetch('./assets/inputFile/input.json')
      .then((res) => res.json())
      .then((json) => {
        this.results = json[0].test_result_page;
      });
  }

  passBtn() {
    this.cvr = this.voterartifactsService.cvr;
    this.drClientService
      .constructBallot(this.cvr)
      .then(() => {
        this.route.navigate([
          '/ballot-resealed',
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
        }
      });
  }

  cannotSeeBallot() {
    this.route.navigate(['/cannot-see-ballot']);
  }
}
