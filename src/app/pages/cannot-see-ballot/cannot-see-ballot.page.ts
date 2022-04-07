import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cannot-see-ballot',
  templateUrl: './cannot-see-ballot.page.html',
  styleUrls: ['./cannot-see-ballot.page.scss'],
})
export class CannotSeeBallotPage implements OnInit {
  results = [];
  constructor(private route: Router) {}

  ngOnInit() {
    fetch('./assets/inputFile/input.json')
      .then((res) => res.json())
      .then((json) => {
        this.results = json[0].cannot_see_ballot_page;
        console.log(this.results);
      });
  }

  backbtn() {
    this.route.navigate(['/test-results']);
  }
}
