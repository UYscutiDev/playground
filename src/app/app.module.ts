import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpinningGlobeTextComponent } from './spinning-globe-text/spinning-globe-text.component';

@NgModule({
  declarations: [AppComponent, SpinningGlobeTextComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
