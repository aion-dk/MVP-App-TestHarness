import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-test-results',
  templateUrl: './test-results.page.html',
  styleUrls: ['./test-results.page.scss'],
})
export class TestResultsPage implements OnInit {
  results = [];
  constructor(private route: Router) {}

  ngOnInit() {
    fetch('./assets/inputFile/input.json').then(res => res.json()).then(json => {

      this.results = json[0]['test_result_page'];
    
    });
  }
  nextbtn() {
    this.route.navigate(['/new-ballot-fingerprint']);
  }
  passbtn() {
    this.route.navigate(['/copy-confirmed']);
  }

}
