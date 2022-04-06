import { Injectable } from '@angular/core';

import { StatuscodeService } from 'src/app/api/statuscode.service';
import { VoterartifactsService } from 'src/app/api/voterartifacts.service';
import { UserService } from 'src/app/class/user/user.service';
import { MockClient } from './mockclient';

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
  client: IDigitalReturnClient;

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

    this.client = new MockClient(this.statuscodeService);
  }

  async requestAccessCode(opaqueVoterId: string): Promise<void> {
    await this.client.initialize();

    const email = 'markitmarchtest@osetinstitute.org';
    await this.client.requestAccessCode(opaqueVoterId, email);
  }

  async validateAccessCode(code: string): Promise<void> {
    await this.client.validateAccessCode(code);
    await this.client.registerVoter();
  }

  constructBallot(nistCvr: string): Promise<string> {
    // Temporary CVR parsing method. Will remain until NIST parsing is better understood
    const parser = new window.DOMParser();
    const xml = parser.parseFromString(nistCvr, 'application/xml');

    const contestIds: string[] = [];
    const contestIdNodes = xml.evaluate('//ContestId', xml, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    let i = 0;
    for (i = 0; i < contestIdNodes.snapshotLength; i++) {
      const node = contestIdNodes.snapshotItem(i);
      if (node === null || node.textContent === null) {
        break;
      }
      contestIds.push(node.textContent);
    }

    const selectionIds: string[] = [];
    const selectionIdNodes = xml.evaluate('//ContestSelectionId', xml, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    let j = 0;
    for (j = 0; j < selectionIdNodes.snapshotLength; j++) {
      const node = selectionIdNodes.snapshotItem(j);
      if (node === null || node.textContent === null) {
        break;
      }
      selectionIds.push(node.textContent);
    }

    const serverCVR = {};
    contestIds.forEach((contestId, idx) => {
      // @ts-ignore
      serverCVR[contestId.toString()] = selectionIds[idx];
    });

    return this.client.constructBallot(serverCVR);
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
