/** This section contains imports for code modules */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { WebService } from './web.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

/** This section contains componets so they can be declared and used in URL paths */
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { LoginComponent } from './login/login.component';
import { UploadsComponent } from './uploads/uploads.component';
import { SignUpComponent } from './sign-up/sign-up.component';


/** Currently unsued imports for code display/editing */
import { MsalModule } from '@azure/msal-angular';
import { PublicClientApplication } from '@azure/msal-browser';


const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

var routes: any = [
  {
    path: '',
    component: HomeComponent
    },
    {
    path: 'upload',
    component: UploadsComponent
    },
    {
    path: 'profile',
    component: ProfilesComponent
    },
    {
    path: 'login',
    component: LoginComponent
    },
    {
      path: 'sign-up',
      component: SignUpComponent
      },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    ProfilesComponent,
    LoginComponent,
    UploadsComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [WebService],
  bootstrap: [AppComponent]
})
export class AppModule { }
