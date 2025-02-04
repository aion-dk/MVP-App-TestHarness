import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { UserService } from 'src/app/class/user/user.service';
import { UserServiceStub } from 'src/app/class/user/user.service.stub';
import { DrClientService } from './drclient.service';
import { PRECINCT_2_CVR, PRECINCT_2_AFFIDAVIT } from './artifacts';

describe('DrClientService', () => {
  let service: DrClientService;
  let userService: UserService;
  const networkCode = 'network code';
  const voterRecordNotFound = 'voter record not found';
  const callOutOfOrder = 'call out of order error';
  const accessCodeExpired = 'access code expired';
  const accessCodeInvalid = 'access code invalid';
  const corruptCvr = 'corrupt CVR';
  const serverCommitment = 'server commitment error';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [{ provide: UserService, useClass: UserServiceStub }],
    });

    userService = TestBed.inject(UserService);
    userService.upsertUser({ lastName: 'foo' });

    service = TestBed.inject(DrClientService);
    service.initServerURL('https://random.local/');
  });

  describe('requestAccessCode', () => {
    it('should reject T0000', async () => {
      await expectAsync(service.requestAccessCode('T0000')).toBeRejectedWith(new Error(voterRecordNotFound));
    });
    it('should reject T0001', async () => {
      await expectAsync(service.requestAccessCode('T0001')).toBeRejectedWith(new Error(networkCode));
    });
    it('should resolve any other random ID', async () => {
      await expectAsync(service.requestAccessCode('008')).toBeResolved();
    });
  });

  describe('validateAccessCode', () => {
    it('should reject 00002', async () => {
      await expectAsync(service.validateAccessCode('00002')).toBeRejectedWith(new Error(callOutOfOrder));
    });
    it('should reject 00003', async () => {
      await expectAsync(service.validateAccessCode('00003')).toBeRejectedWith(new Error(accessCodeExpired));
    });
    it('should reject 00004', async () => {
      await expectAsync(service.validateAccessCode('00004')).toBeRejectedWith(new Error(accessCodeInvalid));
    });
    it('should reject 00005', async () => {
      await expectAsync(service.validateAccessCode('00005')).toBeRejectedWith(new Error(networkCode));
    });
    it('should resolve any other acceptable ID', async () => {
      await expectAsync(service.validateAccessCode('002')).toBeResolved();
    });
  });

  describe('constructBallotCryptograms', () => {
    it('should reject 00006', async () => {
      service.validateAccessCode('00006');
      await expectAsync(service.constructBallot(PRECINCT_2_CVR)).toBeRejectedWith(new Error(callOutOfOrder));
    });
    it('should reject 00007', async () => {
      service.validateAccessCode('00007');
      await expectAsync(service.constructBallot(PRECINCT_2_CVR)).toBeRejectedWith(new Error(networkCode));
    });
    it('should reject 00008', async () => {
      service.validateAccessCode('00008');
      await expectAsync(service.constructBallot(PRECINCT_2_CVR)).toBeRejectedWith(new Error(corruptCvr));
    });
    it('should resolve any other acceptable ID', async () => {
      service.validateAccessCode('00009');
      await expectAsync(service.constructBallot(PRECINCT_2_CVR)).toBeResolvedTo('zyx098-wvu765-tsr432-1234');
    });
  });

  describe('spoilBallotCryptograms', () => {
    it('should reject 00009', async () => {
      service.validateAccessCode('00009');
      await expectAsync(service.spoilBallot()).toBeRejectedWith(new Error(callOutOfOrder));
    });
    it('should reject 00010', async () => {
      service.validateAccessCode('00010');
      await expectAsync(service.spoilBallot()).toBeRejectedWith(new Error(networkCode));
    });
    it('should reject 00011', async () => {
      service.validateAccessCode('00011');
      await expectAsync(service.spoilBallot()).toBeRejectedWith(new Error(serverCommitment));
    });
    it('should resolve any other ID', async () => {
      service.validateAccessCode('00014');
      await expectAsync(service.spoilBallot()).toBeResolved();
    });
  });

  describe('submitBallotCryptograms', () => {
    it('should reject 00012', async () => {
      service.validateAccessCode('00012');
      await expectAsync(service.castBallot(PRECINCT_2_AFFIDAVIT)).toBeRejectedWith(new Error(networkCode));
    });
    it('should reject 00013', async () => {
      service.validateAccessCode('00013');
      await expectAsync(service.castBallot(PRECINCT_2_AFFIDAVIT)).toBeRejectedWith(new Error(callOutOfOrder));
    });
    it('should resolve any other ID', async () => {
      service.validateAccessCode('00014');
      await expectAsync(service.castBallot(PRECINCT_2_AFFIDAVIT)).toBeResolvedTo('ballot-tracking-code');
    });
  });

  describe('purgeData', () => {
    it('should delete the cached access code', async () => {
      service.validateAccessCode('00009');
      service.purgeData();
      await expectAsync(service.spoilBallot()).toBeResolved();
    });
  });
});
