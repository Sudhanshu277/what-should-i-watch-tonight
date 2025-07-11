import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieDetailComponent } from './movie-detail.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { of } from 'rxjs';
import { TmdbService } from '../../core/service/tmdb.service';
import { WatchlistService } from '../../core/service/watchlist.service';


describe('MovieDetailComponent', () => {
  let component: MovieDetailComponent;
  let fixture: ComponentFixture<MovieDetailComponent>;
  let tmdbServiceSpy: jasmine.SpyObj<TmdbService>;
  let watchlistServiceSpy: jasmine.SpyObj<WatchlistService>;
  let sanitizerSpy: jasmine.SpyObj<DomSanitizer>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockRoute = {
    paramMap: of({ get: () => '123' })
  } as any;

  const mockMovieDetails = {
    id: 123,
    title: 'Inception',
    vote_count: 5000,
    release_date: '2010-07-16',
    runtime: 148,
    original_language: 'en',
    overview: 'A mind-bending thriller.',
    genres: [{ name: 'Sci-Fi' }],
    credits: {
      cast: [
        { name: 'Leonardo DiCaprio', character: 'Cobb', profile_path: '/leo.jpg' }
      ]
    },
    videos: {
      results: [
        { type: 'Trailer', site: 'YouTube', key: '8hP9D6kZseM' }
      ]
    },
    reviews: {
      results: [
        { author: 'John', content: 'Great movie!', created_at: '2023-01-01T00:00:00Z' }
      ]
    },
    similar: {
      results: [
        { id: 124, title: 'Interstellar', poster_path: '/interstellar.jpg', vote_average: 8.6, release_date: '2014-11-07' }
      ]
    }
  };

  beforeEach(async () => {
    tmdbServiceSpy = jasmine.createSpyObj('TmdbService', ['getMovieDetails']);
    watchlistServiceSpy = jasmine.createSpyObj('WatchlistService', ['toggleMovie', 'isInWatchlist']);
    sanitizerSpy = jasmine.createSpyObj('DomSanitizer', ['bypassSecurityTrustResourceUrl']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [MovieDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockRoute },
        { provide: TmdbService, useValue: tmdbServiceSpy },
        { provide: WatchlistService, useValue: watchlistServiceSpy },
        { provide: DomSanitizer, useValue: sanitizerSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MovieDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch movie details on init and set trailer URL', () => {
    tmdbServiceSpy.getMovieDetails.and.returnValue(of(mockMovieDetails));
    sanitizerSpy.bypassSecurityTrustResourceUrl.and.returnValue('safe_url' as any);

    component.ngOnInit();

    expect(tmdbServiceSpy.getMovieDetails).toHaveBeenCalledWith('123');
    expect(component.movie.title).toBe('Inception');
    expect(component.trailerUrl).toBe('safe_url' as any);
  });

  it('should fallback to null trailer if not found', () => {
    const movieWithoutTrailer = { ...mockMovieDetails, videos: { results: [] } };
    tmdbServiceSpy.getMovieDetails.and.returnValue(of(movieWithoutTrailer));

    component.ngOnInit();

    expect(component.trailerUrl).toBeNull();
  });

  it('should toggle movie in watchlist', () => {
    component.toggleWatchlist(mockMovieDetails);
    expect(watchlistServiceSpy.toggleMovie).toHaveBeenCalledWith(mockMovieDetails);
  });

  it('should check if movie is in watchlist', () => {
    watchlistServiceSpy.isInWatchlist.and.returnValue(true);
    expect(component.isInWatchlist(123)).toBeTrue();
  });

  it('should navigate to another movie details page', () => {
    component.goToDetails(124);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/movie', 124]);
  });

  it('should open trailer in new tab when playTrailer is called', () => {
    component.movie = mockMovieDetails;
    spyOn(window, 'open');
    component.playTrailer();
    expect(window.open).toHaveBeenCalledWith('https://www.youtube.com/watch?v=8hP9D6kZseM', '_blank');
  });
});
