import { FormsModule } from '@angular/forms';
 import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
 import { CoreModule } from './core/core.module';
import { JwtModule } from '@auth0/angular-jwt';
 import { HomeComponent } from './pages/home/home.component';
import { RecordVideoComponent } from './pages/record-video/record-video.component';
 import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgModule } from '@angular/core';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './shared/shared.module';
 
   export function tokenGetter() {
  return localStorage.getItem('token');
}
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');}
@NgModule({ 
  declarations: [
    AppComponent,
     RecordVideoComponent,
      
 
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
     BrowserAnimationsModule,
    FormsModule,
    CoreModule, 
    HttpClientModule, 
    LoadingBarModule,
    SharedModule,
    ToastrModule.forRoot(

      { preventDuplicates: false,
        maxOpened:1,
        timeOut:2000,
        progressBar :true,
        positionClass :'toast-top-center'
      
      }
    ),
     TranslateModule.forRoot({
      defaultLanguage:'en',
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        skipWhenExpired: true,
        allowedDomains: ['localhost:5000'],
        disallowedRoutes: ['localhost:5000/api/auth']
      }
    }),
 
 
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
  