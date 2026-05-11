import { bootstrapApplication } from '@angular/platform-browser';
import { configureSupabase } from '@neighborhub/shared';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { environment } from './environments/environment';

configureSupabase({
  url: environment.supabaseUrl,
  anonKey: environment.supabaseAnonKey,
});

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err),
);
