import { IDigitalReturnClient } from './drclient.service';
import { StatuscodeService } from './statuscode.service';

export class MockClient implements IDigitalReturnClient {
  private statuscodeService: StatuscodeService;
  private cachedAccessCode: string;

  constructor(statuscodeService: StatuscodeService) {
    this.statuscodeService = statuscodeService;
  }

  registerVoter(): Promise<void> {
    return new Promise((resolve, reject) => {
      switch (this.cachedAccessCode) {
        case '00021':
          reject(new Error(this.statuscodeService.statusCode('InvalidStateError')));
          break;
        case '00022':
          reject(new Error(this.statuscodeService.statusCode('InvalidTokenError')));
          break;
        case '00023':
          reject(new Error(this.statuscodeService.statusCode('NetworkError')));
          break;
        default:
          resolve();
      }
    });
  }

  initialize(): Promise<void> {
    return new Promise((resolve, reject) => {
      switch (this.cachedAccessCode) {
        case '00019':
          reject(new Error(this.statuscodeService.statusCode('InvalidConfigError')));
          break;
        case '00020':
          reject(new Error(this.statuscodeService.statusCode('NetworkError')));
          break;
        default:
          resolve();
      }
    });
  }

  requestAccessCode(opaqueVoterId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      switch (opaqueVoterId) {
        case 'T0000':
          reject(new Error(this.statuscodeService.statusCode('VoterRecordNotFound')));
          break;
        case 'T0001':
          reject(new Error(this.statuscodeService.statusCode('NetworkError')));
          break;
        default:
          resolve();
      }
    });
  }

  validateAccessCode(code: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.cachedAccessCode = code;
      switch (code) {
        case '00002':
          reject(new Error(this.statuscodeService.statusCode('InvalidStateError')));
          break;
        case '00003':
          reject(new Error(this.statuscodeService.statusCode('AccessCodeExpired')));
          break;
        case '00004':
          reject(new Error(this.statuscodeService.statusCode('AccessCodeInvalid')));
          break;
        case '00005':
          reject(new Error(this.statuscodeService.statusCode('NetworkError')));
          break;
        default:
          // to be added: call(s) to other functions related to successfully validated access code
          resolve();
      }
    });
  }

  // eslint-disable-next-line unused-imports/no-unused-vars
  constructBallot(_cvr: any): Promise<string> {
    return new Promise((resolve, reject) => {
      switch (this.cachedAccessCode) {
        case '00006':
          reject(new Error(this.statuscodeService.statusCode('InvalidStateError')));
          break;
        case '00007':
          reject(new Error(this.statuscodeService.statusCode('NetworkError')));
          break;
        case '00008':
          reject(new Error(this.statuscodeService.statusCode('CorruptCVRError')));
          break;
        case '000024':
          reject(new Error(this.statuscodeService.statusCode('VoterSessionTimeoutError')));
          break;
        default:
          resolve('7654321');
      }
    });
  }

  spoilBallot(): Promise<string> {
    return new Promise((resolve, reject) => {
      switch (this.cachedAccessCode) {
        case '00009':
          reject(new Error(this.statuscodeService.statusCode('InvalidStateError')));
          break;
        case '00010':
          reject(new Error(this.statuscodeService.statusCode('NetworkError')));
          break;
        case '00011':
          reject(new Error(this.statuscodeService.statusCode('ServerCommitmentError')));
          break;
        case '000025':
          reject(new Error(this.statuscodeService.statusCode('VoterSessionTimeoutError')));
          break;
        default:
          resolve('qwerty-verifier-code');
      }
    });
  }

  // eslint-disable-next-line unused-imports/no-unused-vars
  castBallot(_affidavit: string): Promise<string> {
    return new Promise((resolve, reject) => {
      switch (this.cachedAccessCode) {
        case '00012':
          reject(new Error(this.statuscodeService.statusCode('NetworkError')));
          break;
        case '00013':
          reject(new Error(this.statuscodeService.statusCode('InvalidStateError')));
          break;
        case '000026':
          reject(new Error(this.statuscodeService.statusCode('VoterSessionTimeoutError')));
          break;
        default:
          resolve('ballot-tracking-code');
      }
    });
  }

  // Should be called right after 'spoilBallot'
  waitForVerifierRegistration(): Promise<string> {
    return new Promise((resolve, reject) => {
      switch (this.cachedAccessCode) {
        case '00014':
          reject(new Error(this.statuscodeService.statusCode('InvalidStateError')));
          break;
        case '00015':
          reject(new Error(this.statuscodeService.statusCode('NetworkError')));
          break;
        case '00016':
          reject(new Error(this.statuscodeService.statusCode('TimeoutError')));
          break;
        default:
          resolve('1234567');
      }
    });
  }

  challengeBallot(): Promise<void> {
    return new Promise((resolve, reject) => {
      switch (this.cachedAccessCode) {
        case '00017':
          reject(new Error(this.statuscodeService.statusCode('InvalidStateError')));
          break;
        case '00018':
          reject(new Error(this.statuscodeService.statusCode('NetworkError')));
          break;
        default:
          resolve();
      }
    });
  }

  purgeData(): void {
    delete this.cachedAccessCode;
  }
}
