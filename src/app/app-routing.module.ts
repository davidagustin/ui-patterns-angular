import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
import { FilterSortComponent } from './patterns/filter-sort/filter-sort.component';
import { FormsComponent } from './patterns/forms/forms.component';
import { ImageGalleryComponent } from './patterns/image-gallery/image-gallery.component';
import { ImageUploadComponent } from './patterns/image-upload/image-upload.component';
import { JumpingHierarchyComponent } from './patterns/jumping-hierarchy/jumping-hierarchy.component';
import { LoadingStatesComponent } from './patterns/loading-states/loading-states.component';
import { ModalComponent } from './patterns/modal/modal.component';
import { NavbarComponent } from './patterns/navbar/navbar.component';
import { NotificationsComponent } from './patterns/notifications/notifications.component';
import { PaginationComponent } from './patterns/pagination/pagination.component';
import { PasswordStrengthComponent } from './patterns/password-strength/password-strength.component';
import { PatternsListComponent } from './patterns/patterns-list/patterns-list.component';
import { ProgressiveDisclosureComponent } from './patterns/progressive-disclosure/progressive-disclosure.component';
import { RangeSliderComponent } from './patterns/range-slider/range-slider.component';
import { RatingInputComponent } from './patterns/rating-input/rating-input.component';
import { SearchComponent } from './patterns/search/search.component';
import { SelectDropdownComponent } from './patterns/select-dropdown/select-dropdown.component';
import { SidebarComponent } from './patterns/sidebar/sidebar.component';
import { TablesComponent } from './patterns/tables/tables.component';
import { TabsComponent } from './patterns/tabs/tabs.component';

const routes: Routes = [
  { path: '', redirectTo: '/patterns', pathMatch: 'full' },
  { path: 'patterns', component: PatternsListComponent },
  { path: 'patterns/accordion-menu', component: AccordionMenuComponent },
  { path: 'patterns/adaptable-view', component: AdaptableViewComponent },
  { path: 'patterns/alternating-rows', component: AlternatingRowsComponent },
  { path: 'patterns/archive', component: ArchiveComponent },
  { path: 'patterns/article-list', component: ArticleListComponent },
  { path: 'patterns/autocomplete', component: AutocompleteComponent },
  { path: 'patterns/autosave', component: AutosaveComponent },
  { path: 'patterns/bottom-navigation', component: BottomNavigationComponent },
  { path: 'patterns/breadcrumbs', component: BreadcrumbsComponent },
  { path: 'patterns/calendar-picker', component: CalendarPickerComponent },
  { path: 'patterns/captcha', component: CaptchaComponent },
  { path: 'patterns/cards', component: CardsComponent },
  { path: 'patterns/carousel', component: CarouselComponent },
  { path: 'patterns/categorization', component: CategorizationComponent },
  { path: 'patterns/color-picker', component: ColorPickerComponent },
  { path: 'patterns/completeness-meter', component: CompletenessMeterComponent },
  { path: 'patterns/continuous-scrolling', component: ContinuousScrollingComponent },
  { path: 'patterns/copy-box', component: CopyBoxComponent },
  { path: 'patterns/dashboard', component: DashboardComponent },
  { path: 'patterns/data-grid', component: DataGridComponent },
  { path: 'patterns/dropdown-menu', component: DropdownMenuComponent },
  { path: 'patterns/file-upload', component: FileUploadComponent },
  { path: 'patterns/filter-sort', component: FilterSortComponent },
  { path: 'patterns/forms', component: FormsComponent },
  { path: 'patterns/image-gallery', component: ImageGalleryComponent },
  { path: 'patterns/image-upload', component: ImageUploadComponent },
  { path: 'patterns/jumping-hierarchy', component: JumpingHierarchyComponent },
  { path: 'patterns/loading-states', component: LoadingStatesComponent },
  { path: 'patterns/modal', component: ModalComponent },
  { path: 'patterns/navbar', component: NavbarComponent },
  { path: 'patterns/notifications', component: NotificationsComponent },
  { path: 'patterns/pagination', component: PaginationComponent },
  { path: 'patterns/password-strength', component: PasswordStrengthComponent },
  { path: 'patterns/progressive-disclosure', component: ProgressiveDisclosureComponent },
  { path: 'patterns/range-slider', component: RangeSliderComponent },
  { path: 'patterns/rating-input', component: RatingInputComponent },
  { path: 'patterns/search', component: SearchComponent },
  { path: 'patterns/select-dropdown', component: SelectDropdownComponent },
  { path: 'patterns/sidebar', component: SidebarComponent },
  { path: 'patterns/tables', component: TablesComponent },
  { path: 'patterns/tabs', component: TabsComponent },
  { path: '**', redirectTo: '/patterns' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
