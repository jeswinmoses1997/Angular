// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { enableProdMode, importProvidersFrom } from '@angular/core';
import { environment } from './environments/environment.prod';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app/app-routing.module';

// import { AppModule } from './app/app.module';

// platformBrowserDynamic()
//   .bootstrapModule(AppModule)
//   .catch((err) => console.error(err));

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    // AnalyticsService
    importProvidersFrom(AppRoutingModule),
  ],
});
