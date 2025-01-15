import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { authFeature } from '../../store/reducers/auth.reducers';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { of } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import * as AuthActions from "../../store/actions/auth.actions";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [RouterModule]
})

export class HeaderComponent implements OnInit, OnDestroy {
  store = inject(Store);
  authService = inject(AuthService);
  isAuthenticated$ = this.store.select(authFeature.selectIsAuthenticated);
  username = this.authService.getUsername();

  logout() {
    this.store.dispatch(AuthActions.logOut());
  }

  ngOnInit(): void {
    this.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.username = this.authService.getUsername();
      }
    });
  }

  ngOnDestroy(): void {
    // this.isAuthenticated$.unsubscribe();
    // this.isAuthenticated$.next();
    //     this.isAuthenticated$.complete();
  }
}
