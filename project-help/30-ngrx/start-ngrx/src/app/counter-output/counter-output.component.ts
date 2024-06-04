import { Component } from '@angular/core';
import { Observable } from 'rxjs';

// import { CounterService } from '../counter.service';
import { Store } from '@ngrx/store';
import { selectCount, selectDoubleCount } from '../store/counter.selectors';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.css'],
})
export class CounterOutputComponent {
  // counter = 0;
  // counterServiceSub?: Subscription;
  count$: Observable<number>;
  doubleCount$: Observable<number>;

  constructor(private store: Store<{ counter: number }>) {
    this.count$ = store.select(selectCount);
    // this.count$ = store.select('counter');
    // this.count$.subscribe();
    this.doubleCount$ = store.select(selectDoubleCount);
  }

  //   ngOnInit(): void {
  //     this.counterServiceSub = this.counterService.counterChanged.subscribe(
  //       (newVal) => (this.counter = newVal)
  //     );
  //   }

  //   ngOnDestroy(): void {
  //     if (this.counterServiceSub) {
  //       this.counterServiceSub.unsubscribe();
  //     }
  //   }
}
