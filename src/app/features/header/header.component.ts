import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TmdbService } from '../../core/service/tmdb.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WatchlistService } from '../../core/service/watchlist.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
watchlistCount: number = 0;
     searchQuery = '';
  constructor(private router: Router,  private tmdbService: TmdbService, private watchlistService: WatchlistService) {}

  ngOnInit() {
      this.watchlistService.watchlist$.subscribe((list:any) => {
    this.watchlistCount = list.length;
  });

}

  onSearch(event: Event) {
    event.preventDefault();
    const trimmed = this.searchQuery.trim();
    if (trimmed) {
      this.router.navigate(['/search'], { queryParams: { q: trimmed } });
      this.searchQuery = '';
    }
  }

 goToCategory(mood: string) {
  this.router.navigate(['/search'], { queryParams: { category: mood } });
}

updateWatchlistCount() {
  const list = JSON.parse(localStorage.getItem('watchlist') || '[]');
  this.watchlistCount = list.length;
}
}
