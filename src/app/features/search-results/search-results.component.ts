import { Component , Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TmdbService } from '../../core/service/tmdb.service';
import { WatchlistService } from '../../core/service/watchlist.service';

@Component({
  selector: 'app-search-results',
  imports: [CommonModule],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent {
  // @Input() results: any[] = [];
   results: any[] = [];
  groupedResults: any = {};
  movies: any[] = [];
  selectedMood: string = '';
  query: string = '';
showFilters = true;
activeCategory: string = 'all';
fallbackImage = 'assets/placeholder.jpg';
  constructor(
    private route: ActivatedRoute,
    private tmdbService: TmdbService,
        private router: Router,
            public watchlistService: WatchlistService
  ) {}

 ngOnInit(): void {
  this.route.queryParams.subscribe(params => {
    const query = params['q'];
    const category = params['category'];

    if (query) {
      this.query = query;
      this.selectedMood = '';
      this.movies = [];
      this.fetchSearchResults(query);
    } else if (category) {
      this.selectedMood = category;
      this.query = '';
      this.results = [];
      this.groupedResults = {};
      this.fetchMoodMovies(category);
    }
  });
}

fetchSearchResults(query: string) {
  this.tmdbService.searchMulti(query).subscribe((res: any) => {
    this.results = res.results;
    this.groupResultsByType();
  });
}

fetchMoodMovies(mood: string) {
  this.tmdbService.getMoviesByMood(mood).subscribe((res: any) => {
    this.movies = res.results;
  });
}

  groupResultsByType() {
    this.groupedResults = {
      movie: this.results.filter(r => r.media_type === 'movie'),
      tv: this.results.filter(r => r.media_type === 'tv'),
      person: this.results.filter(r => r.media_type === 'person'),
      collection: this.results.filter(r => r.media_type === 'collection'),
    };
  }


  goToDetails(id: number) {
    this.router.navigate(['/movie', id]);
  }

  setCategory(category: string) {
  this.activeCategory = category;
}

toggleWatchlist(movie: any) {
  this.watchlistService.toggleMovie(movie);
}

isInWatchlist(id: number): boolean {
  return this.watchlistService.isInWatchlist(id);
}

}
