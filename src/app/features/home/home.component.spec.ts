import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { TmdbService } from '../../core/service/tmdb.service';
import { WatchlistService } from '../../core/service/watchlist.service';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let tmdbServiceSpy: jasmine.SpyObj<TmdbService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let watchlistServiceSpy: jasmine.SpyObj<WatchlistService>;
  let sanitizerSpy: jasmine.SpyObj<DomSanitizer>;

  beforeEach(async () => {
    tmdbServiceSpy = jasmine.createSpyObj('TmdbService', [
      'getTrendingMovies',
      'getPopularMovies',
      'getTopRatedMovies',
      'getMovieDetails',
      'getMoviesByMood',
      'searchMulti'
    ]);

    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    watchlistServiceSpy = jasmine.createSpyObj('WatchlistService', ['toggleMovie', 'isInWatchlist']);
    sanitizerSpy = jasmine.createSpyObj('DomSanitizer', ['bypassSecurityTrustResourceUrl']);

    await TestBed.configureTestingModule({
      imports: [HomeComponent], // HomeComponent must be marked `standalone: true`
      providers: [
        { provide: TmdbService, useValue: tmdbServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: WatchlistService, useValue: watchlistServiceSpy },
        { provide: DomSanitizer, useValue: sanitizerSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load trending, popular, and top rated movies on init', () => {
    tmdbServiceSpy.getTrendingMovies.and.returnValue(of({ results: [] }));
    tmdbServiceSpy.getPopularMovies.and.returnValue(of({ results: [] }));
    tmdbServiceSpy.getTopRatedMovies.and.returnValue(of({ results: [] }));

    fixture.detectChanges();

    expect(tmdbServiceSpy.getTrendingMovies).toHaveBeenCalled();
    expect(tmdbServiceSpy.getPopularMovies).toHaveBeenCalled();
    expect(tmdbServiceSpy.getTopRatedMovies).toHaveBeenCalled();
  });

  it('should set featured movie and trailer if found', fakeAsync(() => {
    const movie = { id: 1, backdrop_path: '/path.jpg' };
    const video = { type: 'Trailer', site: 'YouTube', key: 'abc123' };
    const safeUrl: SafeResourceUrl = 'https://www.youtube.com/embed/abc123' as any;

    tmdbServiceSpy.getMovieDetails.and.returnValue(of({ videos: { results: [video] } }));
    sanitizerSpy.bypassSecurityTrustResourceUrl.and.returnValue(safeUrl);

    component.setFeaturedMovie(movie);
    tick();

    expect(component.featuredMovie).toEqual(movie);
    expect(component.trailerUrl).toBe(safeUrl);
    expect(sanitizerSpy.bypassSecurityTrustResourceUrl).toHaveBeenCalledWith(
      'https://www.youtube.com/embed/abc123'
    );
  }));

  it('should fallback to poster if no trailer is found', fakeAsync(() => {
    const movie = { id: 2, backdrop_path: '/poster.jpg' };
    tmdbServiceSpy.getMovieDetails.and.returnValue(of({ videos: { results: [] } }));

    component.setFeaturedMovie(movie);
    tick(5000);

    expect(component.trailerUrl).toBeNull();
  }));

  it('should navigate to search results when searchMovies() is called', () => {
    component.searchQuery = 'Batman';
    component.searchMovies();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/search'], {
      queryParams: { q: 'Batman' }
    });
  });

  it('should navigate to movie details', () => {
    component.goToDetails(100);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/movie', 100]);
  });

  it('should toggle watchlist movie', () => {
    const mockMovie = { id: 10 };
    component.toggleWatchlist(mockMovie);
    expect(watchlistServiceSpy.toggleMovie).toHaveBeenCalledWith(mockMovie);
  });

  it('should return true if movie is in watchlist', () => {
    watchlistServiceSpy.isInWatchlist.and.returnValue(true);
    expect(component.isInWatchlist(1)).toBeTrue();
  });

  it('should return false if movie is not in watchlist', () => {
    watchlistServiceSpy.isInWatchlist.and.returnValue(false);
    expect(component.isInWatchlist(2)).toBeFalse();
  });
});
