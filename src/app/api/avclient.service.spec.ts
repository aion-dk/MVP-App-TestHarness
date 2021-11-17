import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { UserService } from 'src/app/class/user/user.service';
import { UserServiceStub } from 'src/app/class/user/user.service.stub';
import { AvclientService } from './avclient.service';
import { PRECINCT_2_CVR, PRECINCT_2_AFFIDAVIT } from './artifacts';

describe('AvclientService', () => {
  let service: AvclientService;
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

    service = TestBed.inject(AvclientService);
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
      await expectAsync(service.constructBallotCryptograms(PRECINCT_2_CVR)).toBeRejectedWith(new Error(callOutOfOrder));
    });
    it('should reject 00007', async () => {
      service.validateAccessCode('00007');
      await expectAsync(service.constructBallotCryptograms(PRECINCT_2_CVR)).toBeRejectedWith(new Error(networkCode));
    });
    it('should reject 00008', async () => {
      service.validateAccessCode('00008');
      await expectAsync(service.constructBallotCryptograms(PRECINCT_2_CVR)).toBeRejectedWith(new Error(corruptCvr));
    });
    it('should resolve any other acceptable ID', async () => {
      service.validateAccessCode('00009');
      await expectAsync(service.constructBallotCryptograms(PRECINCT_2_CVR)).toBeResolvedTo('zyx098-wvu765-tsr432-1234');
    });
  });

  describe('spoilBallotCryptograms', () => {
    it('should reject 00009', async () => {
      service.validateAccessCode('00009');
      await expectAsync(service.spoilBallotCryptograms()).toBeRejectedWith(new Error(callOutOfOrder));
    });
    it('should reject 00010', async () => {
      service.validateAccessCode('00010');
      await expectAsync(service.spoilBallotCryptograms()).toBeRejectedWith(new Error(networkCode));
    });
    it('should reject 00011', async () => {
      service.validateAccessCode('00011');
      await expectAsync(service.spoilBallotCryptograms()).toBeRejectedWith(new Error(serverCommitment));
    });
    it('should resolve any other ID', async () => {
      service.validateAccessCode('00014');
      await expectAsync(service.spoilBallotCryptograms()).toBeResolved();
    });
  });

  describe('submitBallotCryptograms', () => {
    it('should reject 00012', async () => {
      service.validateAccessCode('00012');
      await expectAsync(service.submitBallotCryptograms(PRECINCT_2_AFFIDAVIT)).toBeRejectedWith(new Error(networkCode));
    });
    it('should reject 00013', async () => {
      service.validateAccessCode('00013');
      await expectAsync(service.submitBallotCryptograms(PRECINCT_2_AFFIDAVIT)).toBeRejectedWith(new Error(callOutOfOrder));
    });
    it('should resolve any other ID', async () => {
      service.validateAccessCode('00014');
      await expectAsync(service.submitBallotCryptograms(PRECINCT_2_AFFIDAVIT)).toBeResolvedTo({
        previousBoardHash: 'tsr432-wvu765-zyx098-4321',
        boardHash: 'zyx098-wvu765-tsr432-1234',
        registeredAt: '2020-03-01T10:00:00.000+01:00',
        serverSignature:
          // eslint-disable-next-line max-len
          'dbcce518142b8740a5c911f727f3c02829211a8ddfccabeb89297877e4198bc1,46826ddfccaac9ca105e39c8a2d015098479624c411b4783ca1a3600daf4e8fa',
        voteSubmissionId: '6',
      });
    });
  });

  describe('purgeData', () => {
    it('should delete the cached access code', async () => {
      service.validateAccessCode('00009');
      service.purgeData();
      await expectAsync(service.spoilBallotCryptograms()).toBeResolved();
    });
  });
});
