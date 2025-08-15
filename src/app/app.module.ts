import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Shared Components
import { CodeTabsComponent } from './shared/components/code-tabs.component';
import { PatternHeaderComponent } from './shared/components/pattern-header.component';

// Pattern Components
import { AccordionMenuComponent } from './patterns/accordion-menu/accordion-menu.component';
import { CardsComponent } from './patterns/cards/cards.component';
import { DropdownMenuComponent } from './patterns/dropdown-menu/dropdown-menu.component';
import { FormsComponent } from './patterns/forms/forms.component';
import { ModalComponent } from './patterns/modal/modal.component';
import { TabsComponent } from './patterns/tabs/tabs.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    CodeTabsComponent,
    PatternHeaderComponent,
    AccordionMenuComponent,
    CardsComponent,
    DropdownMenuComponent,
    FormsComponent,
    ModalComponent,
    TabsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
