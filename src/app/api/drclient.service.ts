import { Injectable } from '@angular/core';

import { StatuscodeService } from 'src/app/api/statuscode.service';
import { VoterartifactsService } from 'src/app/api/voterartifacts.service';
import { UserService } from 'src/app/class/user/user.service';
import { AVClient } from '@aion-dk/js-client';

// todo: replace anys in favor of real types
export interface IDigitalReturnClient {
  initialize(electionConfig?: any): Promise<void>;
  requestAccessCode(opaqueVoterId: string, email: string): Promise<void>;
  validateAccessCode(code: string): Promise<void>;
  registerVoter(): Promise<void>;
  constructBallot(cvr: any): Promise<string>;
  spoilBallot(): Promise<string>;
  waitForVerifierRegistration(): Promise<string>;
  castBallot(affidavit: any): Promise<string>;
  challengeBallot(): Promise<void>;
  purgeData(): void;
}

@Injectable({
  providedIn: 'root',
})
export class DrClientService {
  serverURL: any;
  client: any;

  constructor(
    public statuscodeService: StatuscodeService,
    public voterartifactsService: VoterartifactsService,
    private userService: UserService
  ) {}

  initServerURL(bulletinBoardURL) {
    this.serverURL = bulletinBoardURL; // to be used in other constructor/initializer calls
    if (this.userService.getUser() !== undefined) {
      this.voterartifactsService.initialize(this.userService.getUser().lastName);
    } // to be added: other initializer calls included the one deprecated below

    this.client = new AVClient('http://us-avx:3000/dbb/us/api');
  }

  async requestAccessCode(opaqueVoterId: string): Promise<void> {
    await this.client.initialize();

    const email = 'mvptuser@yahoo.com';
    await this.client.requestAccessCode(opaqueVoterId, email);
  }

  async validateAccessCode(code: string): Promise<void> {
    await this.client.validateAccessCode(code);
    await this.client.registerVoter();
  }

  constructBallot(nistCvr: string): Promise<string> {
    console.log(nistCvr);
    const cvr = { 'f7a04384-1458-5911-af38-7e08a46136e7': 'option ref 1', '026ca870-537e-57b2-b313-9bb5d9fbe78b': 'option ref 3' };
    return this.client.constructBallot(cvr);
  }

  spoilBallot(): Promise<string> {
    return this.client.spoilBallot();
  }

  waitForVerifierRegistration(): Promise<string> {
    return this.client.waitForVerifierRegistration();
  }

  castBallot(affidavit: string): Promise<string> {
    return this.client.castBallot(affidavit);
  }

  challengeBallot(): Promise<void> {
    return this.client.challengeBallot();
  }

  purgeData() {
    this.client.purgeData();
  }
}
