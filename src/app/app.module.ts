import { BrowserModule } from '@angular/platform-browser';
import {EventEmitter, NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { NgChatModule } from 'ng-chat';

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
import { MilestoneComponent } from './views/milestone/milestone.component';
import { ProjectsComponent } from './views/projects/projects.component';
import { EditComponent } from './views/edit/edit.component';
import { EditProfileComponent } from './includes/edit-profile/edit-profile.component';
import { EditProjectComponent } from './includes/edit-project/edit-project.component';
import {RecoverPasswordComponent} from './views/recover-password/recover-password.component';
import {RecoverPasswordFormComponent} from './includes/recover-password-form/recover-password-form.component';
import {ChangePasswordComponent} from './views/change-password/change-password.component';
import {ChangePasswordFormComponent} from './includes/change-password-form/change-password-form.component';
import {ConfirmEmailComponent} from './views/confirm-email/confirm-email.component';
import {NewCategoryComponent} from './includes/new-category/new-catergory.component';
import {ReviewFormComponent} from './includes/review-form/review-form.component';
import {ReviewComponent} from './includes/review/review.component';
import {NewCertificateComponent} from './includes/new-certificate/new-certificate.component';
import {ShowcaseComponent} from './views/showcase/showcase.component';
import {HowItWorksComponent} from './views/how-it-works/how-it-works.component';
import {QuotesComponent} from './views/quotes/quotes.component';
import {InvestorComponent} from './views/investor/investor.component';
import {ContactUsComponent} from './views/contact-us/contact-us.component';
import {SecurityComponent} from './views/security/security.component';
import {PrivacyPolicyComponent} from './views/privacy-policy/privacy-policy.component';
import {CopyrightPolicyComponent} from './views/copyright-policy/copyright-policy.component';
import {TermsAndConditionsComponent} from './views/terms-and-conditions/terms-and-conditions.component';
import {FeesAndChargesComponent} from './views/fees-and-charges/fees-and-charges.component';

const appRoutes = [

  { path: '', component: HomeComponent },
  { path: 'search/:q', component: SearchResultsComponent },
  { path: 'new-project', component: NewProjectComponent },
  { path: 'edit-project/:id', component: EditProjectComponent },
  { path: 'my-projects', component: MyProjectsComponent },
  { path: 'bids/:id', component: BidsComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'recover-password', component: RecoverPasswordComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'confirm-email', component: ConfirmEmailComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'project/:id', component: ProjectComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'edit/:type/:id', component: EditComponent },
  { path: 'showcase', component: ShowcaseComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'how-it-works', component: HowItWorksComponent },
  { path: 'security', component: SecurityComponent },
  { path: 'investor', component: InvestorComponent },
  { path: 'quotes', component: QuotesComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'terms-and-conditions', component: TermsAndConditionsComponent },
  { path: 'copyright-policy', component: CopyrightPolicyComponent },
  { path: 'fees-and-charges', component: FeesAndChargesComponent },

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
    RecoverPasswordComponent,
    AccountFormComponent,
    CategoriesComponent,
    ProjectComponent,
    BidComponent,
    NewCategoryComponent,
    MilestonesComponent,
    MilestoneComponent,
    ProjectsComponent,
    EditComponent,
    EditProfileComponent,
    EditProjectComponent,
    RecoverPasswordFormComponent,
    ChangePasswordComponent,
    ChangePasswordFormComponent,
    ConfirmEmailComponent,
    ReviewFormComponent,
    ReviewComponent,
    NewCertificateComponent,
    ShowcaseComponent,
    HowItWorksComponent,
    QuotesComponent,
    InvestorComponent,
    ContactUsComponent,
    SecurityComponent,
    PrivacyPolicyComponent,
    CopyrightPolicyComponent,
    TermsAndConditionsComponent,
    FeesAndChargesComponent
  ],
  entryComponents: [BidComponent, MilestoneComponent, NewCategoryComponent, NewCertificateComponent],
  imports: [
    BrowserModule,
    RouterModule,
    CurrencyMaskModule,
    HttpClientModule,
    MatDialogModule,
    NgChatModule,

    RouterModule.forRoot(
      appRoutes,
      {enableTracing: false} // <-- debugging purposes only
    ),
    FormsModule,
    BrowserAnimationsModule

  ],
  providers: [EventEmitter],
  bootstrap: [AppComponent]
})
export class AppModule { }
