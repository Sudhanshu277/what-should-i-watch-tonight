import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SearchResultsComponent } from './search-results.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { TmdbService } from '../../core/service/tmdb.service';
import { WatchlistService } from '../../core/service/watchlist.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;
  let tmdbServiceSpy: jasmine.SpyObj<TmdbService>;
  let watchlistServiceSpy: jasmine.SpyObj<WatchlistService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockResults = {
    results: [
      { id: 1, media_type: 'movie', title: 'Batman Begins' },
      { id: 2, media_type: 'tv', name: 'Gotham' },
      { id: 3, media_type: 'person', name: 'Christian Bale' },
      { id: 4, media_type: 'collection', title: 'Batman Collection' }
    ]
  };

  beforeEach(async () => {
    tmdbServiceSpy = jasmine.createSpyObj('TmdbService', ['searchMulti', 'getMoviesByMood']);
    watchlistServiceSpy = jasmine.createSpyObj('WatchlistService', ['toggleMovie', 'isInWatchlist']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [SearchResultsComponent],
      providers: [
        { provide: TmdbService, useValue: tmdbServiceSpy },
        { provide: WatchlistService, useValue: watchlistServiceSpy },
        { provide: ActivatedRoute, useValue: { queryParams: of({ q: 'batman' }) } },
        { provide: Router, useValue: routerSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and group search results on init when query param is present', fakeAsync(() => {
    tmdbServiceSpy.searchMulti.and.returnValue(of(mockResults));
    component.ngOnInit();
    tick(); // simulate async
    fixture.detectChanges();

    expect(tmdbServiceSpy.searchMulti).toHaveBeenCalledWith('batman');
    expect(component.results.length).toBe(4);
    expect(component.groupedResults.movie.length).toBe(1);
    expect(component.groupedResults.tv.length).toBe(1);
    expect(component.groupedResults.person.length).toBe(1);
    expect(component.groupedResults.collection.length).toBe(1);
  }));

it('should fetch mood-based movies when category param is present', fakeAsync(() => {

  tmdbServiceSpy.getMoviesByMood.and.returnValue(of({ results: [{ id: 99, title: 'Feel Good Movie' }] }));


  TestBed.resetTestingModule();
  TestBed.configureTestingModule({
    imports: [SearchResultsComponent],
    providers: [
      { provide: TmdbService, useValue: tmdbServiceSpy },
      { provide: WatchlistService, useValue: watchlistServiceSpy },
      { provide: ActivatedRoute, useValue: { queryParams: of({ category: 'happy' }) } },
      { provide: Router, useValue: routerSpy }
    ],
    schemas: [NO_ERRORS_SCHEMA]
  }).compileComponents();

  fixture = TestBed.createComponent(SearchResultsComponent);
  component = fixture.componentInstance;

  component.ngOnInit();
  tick();
  fixture.detectChanges();

  expect(tmdbServiceSpy.getMoviesByMood).toHaveBeenCalledWith('happy');
  expect(component.results.length).toBeGreaterThan(0);
  expect(component.results[0].title).toBe('Feel Good Movie');
}));


  it('should navigate to movie detail page', () => {
    component.goToDetails(101);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/movie', 101]);
  });

  it('should toggle watchlist when called', () => {
    const movie = { id: 1, title: 'Movie Test' };
    component.toggleWatchlist(movie);
    expect(watchlistServiceSpy.toggleMovie).toHaveBeenCalledWith(movie);
  });

  it('should return correct watchlist status from service', () => {
    watchlistServiceSpy.isInWatchlist.and.returnValue(true);
    expect(component.isInWatchlist(1)).toBeTrue();
    expect(watchlistServiceSpy.isInWatchlist).toHaveBeenCalledWith(1);
  });

  it('should set active category correctly', () => {
    component.setCategory('tv');
    expect(component.activeCategory).toBe('tv');
  });

  it('should fallback to default image if poster is missing', () => {
    expect(component.fallbackImage).toContain('assets/placeholder.jpg');
  });
});
