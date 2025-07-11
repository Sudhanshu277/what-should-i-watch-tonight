import { TestBed } from '@angular/core/testing';
import { WatchlistService } from './watchlist.service';

describe('WatchlistService', () => {
  let service: WatchlistService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(WatchlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an empty watchlist initially', () => {
    expect(service.getWatchlist()).toEqual([]);
  });

  it('should add a movie to the watchlist', () => {
    const movie = { id: 1, title: 'Test Movie' };
    service.toggleMovie(movie);
    expect(service.getWatchlist()).toContain(movie);
  });

  it('should remove a movie from the watchlist if already added', () => {
    const movie = { id: 2, title: 'Another Movie' };
    service.toggleMovie(movie);
    service.toggleMovie(movie);
    expect(service.getWatchlist()).not.toContain(movie);
  });

  it('should check if movie is in watchlist', () => {
    const movie = { id: 3, title: 'Check Movie' };
    service.toggleMovie(movie);
    expect(service.isInWatchlist(3)).toBeTrue();
    expect(service.isInWatchlist(999)).toBeFalse();
  });

  it('should emit updated watchlist through BehaviorSubject', (done) => {
    const movie = { id: 4, title: 'Observable Movie' };
    service.watchlist$.subscribe(list => {
      if (list.find(m => m.id === 4)) {
        expect(list.length).toBe(1);
        done();
      }
    });
    service.toggleMovie(movie);
  });
});
