import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import {
  PRECINCT_1_CVR,
  PRECINCT_1_BALLOT,
  PRECINCT_1_AFFIDAVIT,
  PRECINCT_2_CVR,
  PRECINCT_2_BALLOT,
  PRECINCT_2_AFFIDAVIT,
  PRECINCT_3_CVR,
  PRECINCT_3_BALLOT,
  PRECINCT_3_AFFIDAVIT,
  PRECINCT_4_CVR,
  PRECINCT_4_BALLOT,
  PRECINCT_4_AFFIDAVIT,
  AV_SAMPLE_CVR,
} from './artifacts';

@Injectable({
  providedIn: 'root',
})
export class VoterartifactsService {
  precinctId: string;
  precinct: string;
  cvrfile: string;
  affidavitfile: string;
  ballotfile: string;

  constructor() {}

  initialize(lastName: string): string {
    const key = lastName.substring(0, 1).toUpperCase();
    switch (key) {
      case 'A':
        this.precinctId = 'precinct_1';
        this.precinct = 'Precinct 1 Spaceport';
        this.cvrfile = PRECINCT_1_CVR;
        this.affidavitfile = PRECINCT_1_AFFIDAVIT;
        this.ballotfile = PRECINCT_1_BALLOT;
        break;
      case 'B':
        this.precinctId = 'precinct_2';
        this.precinct = 'Precinct 2 Bedrock';
        this.cvrfile = PRECINCT_2_CVR;
        this.affidavitfile = PRECINCT_2_AFFIDAVIT;
        this.ballotfile = PRECINCT_2_BALLOT;
        break;
      case 'C':
        this.precinctId = 'precinct_3';
        this.precinct = 'Precinct 3 Downtown';
        this.cvrfile = PRECINCT_3_CVR;
        this.affidavitfile = PRECINCT_3_AFFIDAVIT;
        this.ballotfile = PRECINCT_3_BALLOT;
        break;
      default:
        this.precinctId = 'precinct_4';
        this.precinct = 'Precinct 4 Spacetown';
        this.cvrfile = environment.production ? AV_SAMPLE_CVR : PRECINCT_4_CVR;
        this.affidavitfile = PRECINCT_4_AFFIDAVIT;
        this.ballotfile = PRECINCT_4_BALLOT;
        break;
    }
    return this.precinct;
  }

  public get precinctName(): string {
    return this.precinct;
  }

  public get cvr(): string {
    return this.cvrfile;
  }

  public get affidavit(): string {
    return this.affidavitfile;
  }

  public get ballot(): string {
    return this.ballotfile;
  }
}
