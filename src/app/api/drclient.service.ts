import { Injectable } from '@angular/core';

import { StatuscodeService } from 'src/app/api/statuscode.service';
import { VoterartifactsService } from 'src/app/api/voterartifacts.service';
import { UserService } from 'src/app/class/user/user.service';
import { AVClient, IAVClient } from '@aion-dk/js-client';
import { environment } from 'src/environments/environment';

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
  client: IAVClient;

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

    this.client = new AVClient(environment.url);
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
    const cvr = JSON.parse('{"contest ref 1": "option ref 1", "contest ref 2": "option ref 3" }');
    return this.client.constructBallot(cvr);
  }

  spoilBallot(): Promise<string> {
    return this.client.spoilBallot();
  }

  waitForVerifierRegistration(): Promise<string> {
    return this.client.waitForVerifierRegistration();
  }

  castBallot(affidavit: string): Promise<any> {
    return this.client.castBallot(affidavit);
  }

  challengeBallot(): Promise<void> {
    return Promise.resolve(this.client.challengeBallot());
  }

  purgeData() {
    this.client.purgeData();
  }
}
