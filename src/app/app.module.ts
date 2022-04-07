import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { UserService } from './class/user/user.service';
import { LocalStorageRef } from './class/local-storage-ref/local-storage-ref.service';
// import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot({
      mode: 'ios',
    }),
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).....
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [
    UserService,
    LocalStorageRef,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    // InAppBrowser
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
