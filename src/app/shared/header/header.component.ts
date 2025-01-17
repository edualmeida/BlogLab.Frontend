import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { authFeature } from '../../store/reducers/auth.reducers';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import * as AuthActions from "../../store/actions/auth.actions";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [RouterModule, AsyncPipe]
})

export class HeaderComponent implements OnInit, OnDestroy {
  store = inject(Store);
  authService = inject(AuthService);
  //isAuthenticated$ = this.store.select(authFeature.selectIsAuthenticated);
  username$: any;
  //username$;

  constructor() {
   // console.log('getUsername:' + this.authService.getUsername('constructor'));
    //this.username$ = new BehaviorSubject(this.authService.getUsername('constructor'));
  }
  
  logout() {
    this.store.dispatch(AuthActions.logOut());
  }

  ngOnInit(): void {    
    this.username$ = this.store.select(authFeature.selectUsername);
    // this.isAuthenticated$.subscribe((isAuthenticated) => {
    //   console.log('ngOnInit getUsername:' + this.authService.getUsername('ngOnInit'));
    //   if (isAuthenticated) {
    //     this.username$.next(this.authService.getUsername('ngOnInit'));
    //   }
    // });
  }

  ngOnDestroy(): void {
    // this.isAuthenticated$.unsubscribe();
    // this.isAuthenticated$.next();
    //     this.isAuthenticated$.complete();
  }
}
