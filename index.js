import { Observable, Subject, fromEvent, interval, of } from 'rxjs';
import {
  throttleTime,
  map,
  filter,
  debounceTime,
  distinctUntilChanged,
  reduce,
  scan,
} from 'rxjs/operators';

// Utils
const instantiateSubscriber = (observable) => {
  return observable.subscribe({
    next: (value) => console.log(value),
    error: (error) => console.log(error),
    completed: () => console.log('Completed!'),
  });
};

// Introduction
const btn1 = document.querySelector('.btn-1');
btn1.addEventListener('click', (e) => console.log(e));

fromEvent(btn1, 'click')
  .pipe(
    throttleTime(1000),
    scan((count) => count + 1, 0)
  )
  .subscribe((count) => console.log(`Clicked ${count} times`));

fromEvent(btn1, 'click')
  .pipe(map((data) => data.clientX))
  .subscribe((coordinate) => console.log(coordinate));

// Observers/Observables/Subscriptions
const btn2 = document.querySelector('.btn-2');

const observer2 = {
  next: (value) => console.log(value),
  error: (error) => console.log(error),
  complete: () => console.log('Completed!'),
};
fromEvent(btn2, 'click').subscribe(observer2);

const observable2 = new Observable((obs) => {
  obs.next('A value'),
    setTimeout(() => obs.complete(), 5000),
    obs.next('Second Value');
});

observable2.subscribe(observer2);

// Operators
const observable3 = interval(1000).pipe(
  map((value) => `Number: ${value}`),
  throttleTime(1900)
);
const subscription3 = observable3.subscribe((value) => console.log(value));

observable3.subscription3;

setTimeout(() => subscription3.unsubscribe(), 5000);

// Subjects
const subject = new Subject();

subject.subscribe({
  next: (value) => console.log(value),
  error: (error) => console.log(error),
  complete: () => console.log('Completed!'),
});
subject.subscribe({
  next: (value) => console.log(value),
});
subject.next('A new piece of data');
subject.complete();

// filter()
const observable5 = interval(1000).pipe(filter((value) => value % 2 === 0));

const subscription5 = observable5.subscribe({
  next: (value) => console.log(value),
  error: (error) => console.log(error),
});

setTimeout(() => subscription5.unsubscribe(), 5000);

// debounceTime() / distinctUnitChanged()
const input = document.querySelector('.input-7');
const observable6 = fromEvent(input, 'input').pipe(
  map((event) => event.target.value),
  debounceTime(2000),
  distinctUntilChanged()
);

const subscription6 = instantiateSubscriber(observable6);

// reduce() / scan()
const observable7_1 = of(1, 2, 3, 4, 5).pipe(
  reduce((total, currentValue) => total + currentValue, 0)
);
const observable7_2 = of(1, 2, 3, 4, 5).pipe(
  scan((total, currentValue) => total + currentValue, 0)
);

const subscription7_1 = instantiateSubscriber(observable7_1);
const subscription7_2 = observable7_2.subscribe({
  next: (value) => console.log(value),
});
