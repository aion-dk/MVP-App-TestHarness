import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DrClientService } from 'src/app/api/drclient.service';
import { VoterartifactsService } from 'src/app/api/voterartifacts.service';

@Component({
  selector: 'app-ballot-fingerprint',
  templateUrl: './ballot-fingerprint.page.html',
  styleUrls: ['./ballot-fingerprint.page.scss'],
})
export class BallotFingerprintPage implements OnInit {
  results = [];
  isVisible = false;
  icon = true;
  scndicons = false;
  fsticon = true;
  getCode: any;
  affidavit: any;

  constructor(
    private route: Router,
    public drClientService: DrClientService,
    private activatedRoute: ActivatedRoute,
    public voterartifactsService: VoterartifactsService
  ) {}

  policyDetails() {
    this.isVisible = true;
    this.fsticon = false;
    this.scndicons = true;
  }
  policyDetailsHide() {
    this.isVisible = false;
    this.scndicons = false;
    this.fsticon = true;
  }

  ngOnInit() {
    this.getCode = this.activatedRoute.snapshot.paramMap.get('code');
    fetch('./assets/inputFile/input.json')
      .then((res) => res.json())
      .then((json) => {
        this.results = json[0].ballot_fingerp;
      });
  }

  rpbtn() {
    this.route.navigate(['/tobecontinue']);
  }

  sendbtn() {
    this.affidavit = this.voterartifactsService.affidavit;
    this.drClientService
      .castBallot(this.affidavit)
      .then(() => {
        this.route.navigate([
          '/sending-confirmation',
          {
            code: this.getCode,
          },
        ]);
      })
      .catch((res) => {
        if (res.message === 'network code') {
          this.route.navigate(['/check_network_submit00012_error']);
        } else if (res.message === 'call out of order error') {
          this.route.navigate(['/calloutoforder_submit00013_error']);
        }
      });
  }

  copybtn() {
    this.drClientService
      .spoilBallot()
      .then(() => {
        this.route.navigate([
          '/check-your-pairing-codes',
          {
            code: this.getCode,
          },
        ]);
      })
      .catch((res) => {
        if (res.message === 'call out of order error') {
          this.route.navigate(['/calloutoforder_spoil00009_error']);
        } else if (res.message === 'network code') {
          this.route.navigate(['/check_network_spoil00010_error']);
        } else if (res.message === 'server commitment error') {
          this.route.navigate(['/check_server_spoil00011_error']);
        }
      });
  }
}
