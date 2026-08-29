import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Loading } from '../../services/loading';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  providers: [],
  imports: [CommonModule, MatProgressBarModule],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class HeaderComponent implements OnInit {

  loading = inject(Loading);

  ngOnInit() {

  }

  get isLoading() {
    return this.loading.getLoading();
  }
}
