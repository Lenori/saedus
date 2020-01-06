import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CurrencyMaskModule } from 'ng2-currency-mask';

import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { HeaderComponent } from './views/header/header.component';
import { FooterComponent } from './views/footer/footer.component';
import { SearchComponent } from './includes/search/search.component';
import { HomeCategoriesComponent } from './includes/home-categories/home-categories.component';
import { HowWorksComponent } from './includes/how-works/how-works.component';
import { BulletsComponent } from './includes/bullets/bullets.component';
import { SearchResultsComponent } from './views/search-results/search-results.component';
import { ResultsComponent } from './includes/results/results.component';
import { CreateProjectComponent } from './includes/create-project/create-project.component';
import { NewProjectComponent } from './views/new-project/new-project.component';
import { MyProjectsComponent } from './views/my-projects/my-projects.component';
import { BidsComponent } from './views/bids/bids.component';
import { ProfileComponent } from './views/profile/profile.component';
import { SignInComponent } from './views/sign-in/sign-in.component';
import { LoginFormComponent } from './includes/login-form/login-form.component';
import { SignUpComponent } from './views/sign-up/sign-up.component';
import { AccountFormComponent } from './includes/account-form/account-form.component';
import { CategoriesComponent } from './views/categories/categories.component';
import {FormsModule} from '@angular/forms';
import { ProjectComponent } from './views/project/project.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { BidComponent } from './views/bid/bid.component';
import { MilestonesComponent } from './includes/milestones/milestones.component';

const appRoutes = [

  { path: '', component: HomeComponent },
  { path: 'search/:q', component: SearchResultsComponent },
  { path: 'new-project', component: NewProjectComponent },
  { path: 'my-projects', component: MyProjectsComponent },
  { path: 'bids/:id', component: BidsComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'project/:id', component: ProjectComponent },

];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SearchComponent,
    HomeCategoriesComponent,
    HowWorksComponent,
    BulletsComponent,
    SearchResultsComponent,
    ResultsComponent,
    CreateProjectComponent,
    NewProjectComponent,
    MyProjectsComponent,
    BidsComponent,
    ProfileComponent,
    SignInComponent,
    LoginFormComponent,
    SignUpComponent,
    AccountFormComponent,
    CategoriesComponent,
    ProjectComponent,
    BidComponent,
    MilestonesComponent,
  ],
  entryComponents: [BidComponent],
  imports: [
    BrowserModule,
    RouterModule,
    CurrencyMaskModule,
    HttpClientModule,
    MatDialogModule,

    RouterModule.forRoot(
      appRoutes,
      {enableTracing: false} // <-- debugging purposes only
    ),
    FormsModule,
    BrowserAnimationsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
