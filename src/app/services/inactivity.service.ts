import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, fromEvent, merge, timer } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InactivityService {
  private inactivityTime = 60 * 60 * 1000; // 60 minutos en ms
  private inactivitySubject = new Subject<void>();
  inactivity$: Observable<void> = this.inactivitySubject.asObservable();

  constructor(private ngZone: NgZone, private router: Router) {
    this.startWatching();
  }

  private startWatching() {
    this.ngZone.runOutsideAngular(() => {
      const activityEvents$ = merge(
        fromEvent(document, 'mousemove'),
        fromEvent(document, 'mousedown'),
        fromEvent(document, 'keydown'),
        fromEvent(document, 'scroll'),
        fromEvent(document, 'touchstart')
      );

      activityEvents$
        .pipe(
          switchMap(() => timer(this.inactivityTime)),
          tap(() => {
            this.ngZone.run(() => {
              this.logoutUser(); // Acción al expirar
            });
          })
        )
        .subscribe();
    });
  }

  private logoutUser() {
    localStorage.removeItem('token'); // o cualquier lógica para cerrar sesión
    this.router.navigate(['/login']);
    this.inactivitySubject.next();
  }
}
