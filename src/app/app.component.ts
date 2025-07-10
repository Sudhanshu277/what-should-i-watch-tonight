import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { HomeComponent } from "./features/home/home.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TmdbService } from './core/service/tmdb.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, FormsModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'What Should I Watch Tonight?';
  movies: any[] = [];
  trendingMovies: any[] = [];
  selectedMood: string = '';

     searchResults: any[] = [];
   searchQuery = '';

  constructor(private router: Router,  private tmdbService: TmdbService) {}

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

}
