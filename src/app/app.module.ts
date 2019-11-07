import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { HeaderComponent } from './views/header/header.component';
import { FooterComponent } from './views/footer/footer.component';
import { SearchComponent } from './includes/search/search.component';
import { HomeCategoriesComponent } from './includes/home-categories/home-categories.component';
import { HowWorksComponent } from './includes/how-works/how-works.component';
import { BulletsComponent } from './includes/bullets/bullets.component';

const appRoutes = [

  { path: '', component: HomeComponent }

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
    BulletsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,

    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
