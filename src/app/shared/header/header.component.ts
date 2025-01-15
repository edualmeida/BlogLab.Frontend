import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { authFeature } from '../../store/reducers/auth.reducers';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { of } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [RouterModule, AsyncPipe]
})
export class HeaderComponent implements OnInit {
  store = inject(Store);
  isAuthenticated$ = this.store.select(authFeature.selectIsAuthenticated);
  user$ = this.store.select(authFeature.selectUser);

  ngOnInit(): void {
  }
}
