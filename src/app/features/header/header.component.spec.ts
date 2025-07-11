import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header.component';
import { WatchlistService } from '../../core/service/watchlist.service';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

class MockWatchlistService {
  watchlist$ = of([{ id: 1 }, { id: 2 }]);
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, FormsModule, HttpClientModule],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: WatchlistService, useClass: MockWatchlistService },
        { provide: ActivatedRoute, useValue: { queryParams: of({}) } } // ✅ mock ActivatedRoute
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should update watchlistCount on init from watchlist$', () => {
    expect(component.watchlistCount).toBe(2);
  });

  it('should navigate to search page with query on form submit', () => {
    component.searchQuery = 'batman';
    const event = new Event('submit');
    spyOn(event, 'preventDefault');
    component.onSearch(event);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/search'], { queryParams: { q: 'batman' } });
    expect(component.searchQuery).toBe('');
  });

  it('should not navigate if search query is empty or only whitespace', () => {
    component.searchQuery = '   ';
    const event = new Event('submit');
    spyOn(event, 'preventDefault');
    component.onSearch(event);
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should navigate to mood category when goToCategory is called', () => {
    component.goToCategory('thriller');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/search'], { queryParams: { category: 'thriller' } });
  });

  it('should update watchlistCount from localStorage', () => {
    localStorage.setItem('watchlist', JSON.stringify([{ id: 1 }, { id: 2 }, { id: 3 }]));
    component.updateWatchlistCount();
    expect(component.watchlistCount).toBe(3);
  });
});
