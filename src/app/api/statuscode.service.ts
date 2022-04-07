import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StatuscodeService {
  constructor() {}

  statusCode(statusCode) {
    if (statusCode === 'VoterRecordNotFound') {
      return 'voter record not found';
    } else if (statusCode === 'NetworkError') {
      return 'network code';
    } else if (statusCode === 'InvalidStateError') {
      return 'call out of order error';
    } else if (statusCode === 'AccessCodeExpired') {
      return 'access code expired';
    } else if (statusCode === 'AccessCodeInvalid') {
      return 'access code invalid';
    } else if (statusCode === 'CorruptCVRError') {
      return 'corrupt CVR';
    } else if (statusCode === 'ServerCommitmentError') {
      return 'server commitment error';
    } else if (statusCode === 'Initialized') {
      return 'initialized';
    } else if (statusCode === 'Uninitialized') {
      return 'uninitialized';
    } else if (statusCode === 'OK') {
      return 'ok';
    }
  }
}
