import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Shared Components
import { CodeTabsComponent } from './shared/components/code-tabs/code-tabs.component';
import { PatternHeaderComponent } from './shared/components/pattern-header/pattern-header.component';

// Pattern Components - Alphabetically organized
import { AccordionMenuComponent } from './patterns/accordion-menu/accordion-menu.component';
import { AdaptableViewComponent } from './patterns/adaptable-view/adaptable-view.component';
import { AlternatingRowsComponent } from './patterns/alternating-rows/alternating-rows.component';
import { ArchiveComponent } from './patterns/archive/archive.component';
import { ArticleListComponent } from './patterns/article-list/article-list.component';
import { AutocompleteComponent } from './patterns/autocomplete/autocomplete.component';
import { AutosaveComponent } from './patterns/autosave/autosave.component';
import { BottomNavigationComponent } from './patterns/bottom-navigation/bottom-navigation.component';
import { BreadcrumbsComponent } from './patterns/breadcrumbs/breadcrumbs.component';
import { CalendarPickerComponent } from './patterns/calendar-picker/calendar-picker.component';
import { CaptchaComponent } from './patterns/captcha/captcha.component';
import { CardsComponent } from './patterns/cards/cards.component';
import { CarouselComponent } from './patterns/carousel/carousel.component';
import { CategorizationComponent } from './patterns/categorization/categorization.component';
import { ColorPickerComponent } from './patterns/color-picker/color-picker.component';
import { CompletenessMeterComponent } from './patterns/completeness-meter/completeness-meter.component';
import { ContinuousScrollingComponent } from './patterns/continuous-scrolling/continuous-scrolling.component';
import { CopyBoxComponent } from './patterns/copy-box/copy-box.component';
import { DashboardComponent } from './patterns/dashboard/dashboard.component';
import { DataGridComponent } from './patterns/data-grid/data-grid.component';
import { DropdownMenuComponent } from './patterns/dropdown-menu/dropdown-menu.component';
import { FileUploadComponent } from './patterns/file-upload/file-upload.component';
import { FormsComponent } from './patterns/forms/forms.component';
import { ImageGalleryComponent } from './patterns/image-gallery/image-gallery.component';
import { JumpingHierarchyComponent } from './patterns/jumping-hierarchy/jumping-hierarchy.component';
import { ModalComponent } from './patterns/modal/modal.component';
import { NavbarComponent } from './patterns/navbar/navbar.component';
import { NotificationsComponent } from './patterns/notifications/notifications.component';
import { PaginationComponent } from './patterns/pagination/pagination.component';
import { PatternsListComponent } from './patterns/patterns-list/patterns-list.component';
import { RangeSliderComponent } from './patterns/range-slider/range-slider.component';
import { SearchComponent } from './patterns/search/search.component';
import { SelectDropdownComponent } from './patterns/select-dropdown/select-dropdown.component';
import { SidebarComponent } from './patterns/sidebar/sidebar.component';
import { TabsComponent } from './patterns/tabs/tabs.component';
import { TablesComponent } from './patterns/tables/tables.component';

@NgModule({
  declarations: [
    AppComponent,
    // Shared Components
    CodeTabsComponent,
    PatternHeaderComponent,
    // Pattern Components
    AccordionMenuComponent,
    AdaptableViewComponent,
    AlternatingRowsComponent,
    ArchiveComponent,
    ArticleListComponent,
    AutocompleteComponent,
    AutosaveComponent,
    BottomNavigationComponent,
    BreadcrumbsComponent,
    CalendarPickerComponent,
    CaptchaComponent,
    CardsComponent,
    CarouselComponent,
    CategorizationComponent,
    ColorPickerComponent,
    CompletenessMeterComponent,
    ContinuousScrollingComponent,
    CopyBoxComponent,
    DashboardComponent,
    DataGridComponent,
    DropdownMenuComponent,
    FileUploadComponent,
    FormsComponent,
    ImageGalleryComponent,
    JumpingHierarchyComponent,
    ModalComponent,
    NavbarComponent,
    NotificationsComponent,
    PaginationComponent,
    PatternsListComponent,
    RangeSliderComponent,
    SearchComponent,
    SelectDropdownComponent,
    SidebarComponent,
    TablesComponent,
    TabsComponent
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
