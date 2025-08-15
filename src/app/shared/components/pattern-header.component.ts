import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pattern-header',
  templateUrl: './pattern-header.component.html',
  styleUrls: ['./pattern-header.component.scss']
})
export class PatternHeaderComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() icon: string = '';
}