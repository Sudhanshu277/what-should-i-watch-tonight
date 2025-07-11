import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WatchlistComponent } from './watchlist.component';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('WatchlistComponent', () => {
  let component: WatchlistComponent;
  let fixture: ComponentFixture<WatchlistComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockWatchlist = [
    { id: 1, title: 'Movie One', poster_path: '/poster1.jpg' },
    { id: 2, title: 'Movie Two', poster_path: '/poster2.jpg' }
  ];

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [WatchlistComponent],
      providers: [
        { provide: Router, useValue: routerSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA] // Ignores unknown tags and Angular directives like *ngFor
    }).compileComponents();

    fixture = TestBed.createComponent(WatchlistComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    // Reset localStorage before each test
    localStorage.clear();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load watchlist from localStorage on init', () => {
    localStorage.setItem('watchlist', JSON.stringify(mockWatchlist));

    component.ngOnInit();

    expect(component.watchlist.length).toBe(2);
    expect(component.watchlist[0].title).toBe('Movie One');
  });

  it('should navigate to movie details when goToDetails is called', () => {
    component.goToDetails(99);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/movie', 99]);
  });

  it('should remove movie from watchlist and update localStorage', () => {
    localStorage.setItem('watchlist', JSON.stringify(mockWatchlist));

    component.ngOnInit(); // load the list
    expect(component.watchlist.length).toBe(2);

    component.removeFromWatchlist(1);

    const updatedList = JSON.parse(localStorage.getItem('watchlist') || '[]');
    expect(component.watchlist.length).toBe(1);
    expect(updatedList.length).toBe(1);
    expect(updatedList[0].id).toBe(2);
  });

  it('should do nothing if trying to remove a non-existing movie', () => {
    localStorage.setItem('watchlist', JSON.stringify(mockWatchlist));
    component.ngOnInit();

    component.removeFromWatchlist(999); // ID not in list

    const updatedList = JSON.parse(localStorage.getItem('watchlist') || '[]');
    expect(updatedList.length).toBe(2);
  });
});
