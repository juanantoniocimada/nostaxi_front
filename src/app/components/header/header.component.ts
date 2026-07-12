import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  providers: [],
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class HeaderComponent implements OnInit {

  ngOnInit() {
  }
}
