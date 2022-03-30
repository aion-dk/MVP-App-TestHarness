import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StatuscodeService } from 'src/app/api/statuscode.service';
import { DrClientService } from 'src/app/api/drclient.service';
import { environment } from 'src/environments/environment';
import { VoterartifactsService } from 'src/app/api/voterartifacts.service';
import { UserService } from 'src/app/class/user/user.service';

@Component({
  selector: 'app-request-access-code',
  templateUrl: './request-access-code.page.html',
  styleUrls: ['./request-access-code.page.scss'],
})
export class RequestAccessCodePage implements OnInit {
  results = [];

  constructor(
    private route: Router,
    private userService: UserService,
    public statuscodeService: StatuscodeService,
    public drClientService: DrClientService,
    private voterartifactsService: VoterartifactsService
  ) {
    // there's a bug here where voterartifactsService.initialize will be called twice:
    // - once indirectly by the drClientService.initServerURL method
    // - again directly in this constructor
    // todo: determine the appropriate time for calling that method, and resolve the duplicate calls to a single one
    this.drClientService.initServerURL(environment.url);
    this.voterartifactsService.initialize(this.userService.getUser().lastName);
  }

  ngOnInit() {
    fetch('./assets/inputFile/input.json')
      .then((res) => res.json())
      .then((json) => {
        this.results = json[0].rap_page;
      });
  }

  async continuebtn() {
    if (this.userService.getUser().lastName !== undefined) {
      // Introduce randomness. Currently no support for voter-restart scenario
      const opaqueVoterId = environment.production ? 'B00000000001' : this.userService.getUser().lastName;

      await this.drClientService
        .requestAccessCode(opaqueVoterId)
        .then(() => {
          this.route.navigate([
            '/access-code',
            {
              t: new Date().getTime(),
            },
          ]);
        })
        .catch((res) => {
          if (res.message === 'voter record not found') {
            this.route.navigate(['/voter_record_notfound00000_error']);
          } else if (res.message === 'network code') {
            this.route.navigate(['/check_network_request00001_error']);
          }
        });
    }
  }

  backbtn() {
    this.route.navigate(['/ballot-complete']);
  }
}
