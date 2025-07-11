import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-watchlist',
  imports: [CommonModule],
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.css'
})
export class WatchlistComponent {
 watchlist: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
  }

  goToDetails(id: number) {
    this.router.navigate(['/movie', id]);
  }

  removeFromWatchlist(id: number) {
    this.watchlist = this.watchlist.filter(m => m.id !== id);
    localStorage.setItem('watchlist', JSON.stringify(this.watchlist));
  }
}
