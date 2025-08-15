import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AccordionMenuComponent } from './patterns/accordion-menu/accordion-menu.component';
import { CardsComponent } from './patterns/cards/cards.component';
import { DropdownMenuComponent } from './patterns/dropdown-menu/dropdown-menu.component';
import { FormsComponent } from './patterns/forms/forms.component';
import { ModalComponent } from './patterns/modal/modal.component';
import { TabsComponent } from './patterns/tabs/tabs.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'patterns/accordion-menu', component: AccordionMenuComponent },
  { path: 'patterns/cards', component: CardsComponent },
  { path: 'patterns/dropdown-menu', component: DropdownMenuComponent },
  { path: 'patterns/forms', component: FormsComponent },
  { path: 'patterns/modal', component: ModalComponent },
  { path: 'patterns/tabs', component: TabsComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
