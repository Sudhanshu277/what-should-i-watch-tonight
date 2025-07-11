import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WatchlistService {
  private watchlistKey = 'watchlist';
  public watchlist$ = new BehaviorSubject<any[]>(this.getWatchlistSafe());

  private getWatchlistSafe(): any[] {
    if (typeof window === 'undefined') return [];
    return JSON.parse(localStorage.getItem(this.watchlistKey) || '[]');
  }

  getWatchlist(): any[] {
    return this.getWatchlistSafe();
  }

  isInWatchlist(id: number): boolean {
    return this.getWatchlistSafe().some(movie => movie.id === id);
  }

  toggleMovie(movie: any) {
    if (typeof window === 'undefined') return;

    let list = this.getWatchlistSafe();
    const index = list.findIndex(m => m.id === movie.id);

    if (index >= 0) {
      list.splice(index, 1);
    } else {
      list.push(movie);
    }

    localStorage.setItem(this.watchlistKey, JSON.stringify(list));
    this.watchlist$.next(list);
  }
}
