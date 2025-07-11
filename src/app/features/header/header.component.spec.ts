import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { WatchlistService } from '../../core/service/watchlist.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;

  const mockWatchlistService = {
    watchlist$: of([{ id: 1 }, { id: 2 }]),
    getWatchlist: () => [{ id: 1 }, { id: 2 }],
    isInWatchlist: (id: number) => true,
    toggleMovie: () => {}
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HeaderComponent,
        FormsModule,
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [
        { provide: WatchlistService, useValue: mockWatchlistService },
        { provide: ActivatedRoute, useValue: { queryParams: of({}) } }
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
    spyOn(router, 'navigate'); // ✅ Spy on actual injected router

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should navigate to search page with query on form submit', () => {
    component.searchQuery = 'batman';
    const event = new Event('submit');
    spyOn(event, 'preventDefault');
    component.onSearch(event);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/search'], {
      queryParams: { q: 'batman' }
    });
    expect(component.searchQuery).toBe('');
  });

  it('should navigate to mood category when goToCategory is called', () => {
    component.goToCategory('thriller');
    expect(router.navigate).toHaveBeenCalledWith(['/search'], {
      queryParams: { category: 'thriller' }
    });
  });

  it('should not navigate if search query is empty or only whitespace', () => {
    component.searchQuery = '   ';
    const event = new Event('submit');
    spyOn(event, 'preventDefault');
    component.onSearch(event);
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should update watchlistCount from localStorage', () => {
    localStorage.setItem(
      'watchlist',
      JSON.stringify([{ id: 1 }, { id: 2 }, { id: 3 }])
    );
    component.updateWatchlistCount();
    expect(component.watchlistCount).toBe(3);
  });

  it('should update watchlistCount on init from watchlist$', () => {
    expect(component.watchlistCount).toBe(2);
  });
});
