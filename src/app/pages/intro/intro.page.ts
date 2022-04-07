import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro',
  styleUrls: ['./intro.page.scss'],
  template: `<ion-content scroll-y="false" class="nonepadding">
    <ion-slides (ionSlideReachEnd)="onSlideEnd()" [options]="slideOpts">
      <ion-slide>
        <img src="../../../assets/images/slides/slide-1.png" />
      </ion-slide>
      <ion-slide (click)="next()">
        <img src="../../../assets/images/slides/slide-2.png" />
      </ion-slide>
    </ion-slides>
  </ion-content>`,
})
export class IntroPage implements OnInit {
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    centeredSlides: true,
    autoplay: {
      delay: 2000,
      stopOnLastSlide: true,
    },
    pagination: false,
  };

  constructor(private router: Router) {}

  ngOnInit() {}

  next() {
    this.router.navigate(['/ballot']);
  }

  onSlideEnd() {
    setTimeout(() => {
      this.router.navigate(['/ballot']);
    }, 2000);
  }
}
