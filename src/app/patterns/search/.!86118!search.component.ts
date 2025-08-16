import { Component } from '@angular/core';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: string;
  url: string;
  icon?: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchQuery = '';
  isSearchFocused = false;
  showResults = false;
  selectedIndex = -1;

  allResults: SearchResult[] = [
    {
      id: '1',
      title: 'Accordion Menu Pattern',
      description: 'Expandable content sections with smooth animations',
      category: 'Navigation',
      url: '/patterns/accordion-menu',
