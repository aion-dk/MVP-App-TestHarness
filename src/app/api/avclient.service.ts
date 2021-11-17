import { Injectable } from '@angular/core';

import { StatuscodeService } from 'src/app/api/statuscode.service';
import { VoterartifactsService } from 'src/app/api/voterartifacts.service';
import { MockClient as MockClient } from './mockclient';
import { IAVClient, AVClient, CastVoteRecord, BallotBoxReceipt, NistConverter } from '@aion-dk/js-client';
import { environment } from '../../environments/environment';
import { UserService } from 'src/app/class/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AvclientService {
  serverURL: any;
  client: IAVClient;

  constructor(
    public statuscodeService: StatuscodeService,
    public voterartifactsService: VoterartifactsService,
    private userService: UserService
  ) {}

  // eslint-disable-next-line unused-imports/no-unused-vars
  private static convertNIST103ToAvCvr(nistCvr: string): CastVoteRecord {
    //console.log('Ready to parse NIST CVR', nistCvr);
    return NistConverter.default.nistCvrToAvCvr(nistCvr);
  }

  initServerURL(bulletinBoardURL) {
    this.serverURL = bulletinBoardURL; // to be used in other constructor/initializer calls
    if (this.userService.getUser() !== undefined) {
      this.voterartifactsService.initialize(this.userService.getUser().lastName);
    } // to be added: other initializer calls included the one deprecated below

    if (environment.production) {
      this.client = new AVClient(bulletinBoardURL);
    } else {
      this.client = new MockClient(this.statuscodeService);
    }
  }

  async requestAccessCode(opaqueVoterId: string): Promise<void> {
    await this.client.initialize();

    const email = `us-voter-${opaqueVoterId}@aion.dk`;
    await this.client.requestAccessCode(opaqueVoterId, email);
  }

  async validateAccessCode(code: string): Promise<void> {
    await this.client.validateAccessCode(code);
    await this.client.registerVoter();
  }

  constructBallotCryptograms(nistCvr: string): Promise<string> {
    const cvr = AvclientService.convertNIST103ToAvCvr(nistCvr);
    return this.client.constructBallotCryptograms(cvr);
  }

  spoilBallotCryptograms(): Promise<void> {
    return this.client.spoilBallotCryptograms();
  }

  submitBallotCryptograms(affidavit: string): Promise<BallotBoxReceipt> {
    return this.client.submitBallotCryptograms(affidavit);
  }

  purgeData() {
    this.client.purgeData();
  }
}
