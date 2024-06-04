import { Actions, createEffect, ofType } from '@ngrx/effects';
import { decrement, increment, init, set } from './counter.actions';
import { count, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCount } from './counter.selectors';

@Injectable()
export class CounterEffects {
  loadCount = createEffect(() =>
    this.actions$.pipe(
      ofType(init),
      switchMap(() => {
        const storedCounter = localStorage.getItem('count');
        if (storedCounter) {
          return of(set({ value: +storedCounter }));
        }
        return of(set({ value: 0 }));
      })
    )
  );

  saveCount = createEffect(
    () =>
      this.actions$.pipe(
        ofType(increment, decrement),
        // ofType('[Counter Increment]'),
        // withLatestFrom(this.store.select('counter')),
        withLatestFrom(this.store.select(selectCount)),
        tap(([action, counter]) => {
          console.log(action);
          // localStorage.setItem('count', action.value.toString());
          localStorage.setItem('count', counter.toString());
        })
      ),
    { dispatch: false }

    // In Old Version of Effect

    //   @Effects({dispatch:false})
    // saveCount = this.actions$.pipe(
    //       ofType(increment, decrement),
    //       // ofType('[Counter Increment]'),
    //       tap((action) => {
    //         console.log(action);
    //         localStorage.setItem('count', action.value.toString());
    //       })
    //     )
  );

  constructor(
    private actions$: Actions,
    private store: Store<{ counter: number }>
  ) {}
}
