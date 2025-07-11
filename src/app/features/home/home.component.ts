import { Component } from '@angular/core';
import { TmdbService } from '../../core/service/tmdb.service';
import { CommonModule } from "@angular/common";
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { WatchlistService } from '../../core/service/watchlist.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
 movies: any[] = [];
  trendingMovies: any[] = [];
  popularMovies: any[] = [];
topRatedMovies: any[] = [];
  featuredMovie: any = null;
  trailerUrl: SafeResourceUrl | null = null;
  posterUrl: string = '';
  selectedMood: string = '';
  searchQuery: string = '';
  searchResults: any[] = [];
  isMuted: boolean = true;
  currentTrailerIndex: number = 0;
  posterTimeout: any;

  constructor(
    private tmdbService: TmdbService,
    private router: Router,
    private sanitizer: DomSanitizer,
     public watchlistService: WatchlistService
  ) {}

  ngOnInit(): void {
    this.loadTrending();
     this.loadPopular();
  this.loadTopRated();
  }

  loadTrending() {
    if (typeof window === 'undefined') return;

    this.tmdbService.getTrendingMovies().subscribe({
      next: (res: any) => {
        this.trendingMovies = res.results;
        this.playRandomTrailer();
      },
      error: (err) => {
        console.error('TMDB trending fetch failed:', err);
      }
    });
  }

  loadPopular() {
  this.tmdbService.getPopularMovies().subscribe((res:any) => this.popularMovies = res.results);
}
loadTopRated() {
  this.tmdbService.getTopRatedMovies().subscribe((res:any) => this.topRatedMovies = res.results);
}

  playRandomTrailer() {
    const randomIndex = Math.floor(Math.random() * this.trendingMovies.length);
    this.currentTrailerIndex = randomIndex;
    this.setFeaturedMovie(this.trendingMovies[this.currentTrailerIndex]);
  }

  setFeaturedMovie(movie: any) {
    this.featuredMovie = movie;
    this.posterUrl = 'https://image.tmdb.org/t/p/original' + movie.backdrop_path;

    this.posterUrl = movie.backdrop_path
  ? 'https://image.tmdb.org/t/p/original' + movie.backdrop_path
  : 'https://lh6.googleusercontent.com/proxy/gzG8eECQ-37TFxxR6Nwwcpr4ZeJwnrwglpTlGRs-ZkUponMNr24cSbN_th0Q5mXXmVyh-UCnupb2P7PUApVfyFSK0p6bkg3ZANBBdBzD3oqH2Cb_IRJSNKC6mwE';

    if (this.posterTimeout) {
      clearTimeout(this.posterTimeout);
    }

    this.tmdbService.getMovieDetails(movie.id).subscribe((detail: any) => {
      const trailer = detail.videos.results.find(
        (v: any) => v.type === 'Trailer' && v.site === 'YouTube'
      );
      if (trailer) {
        this.trailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          `https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=${this.isMuted ? '1' : '0'}&enablejsapi=1&controls=0`
        );
      } else {
        this.trailerUrl = null;
        this.posterTimeout = setTimeout(() => this.playNextTrailer(), 5000);
      }
    });
  }

  playNextTrailer() {
    this.currentTrailerIndex = (this.currentTrailerIndex + 1) % this.trendingMovies.length;
    this.setFeaturedMovie(this.trendingMovies[this.currentTrailerIndex]);
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    const currentMovie = this.trendingMovies[this.currentTrailerIndex];
    if (currentMovie) {
      this.setFeaturedMovie(currentMovie);
    }
  }

  chooseMood(mood: string) {
    this.selectedMood = mood;
    this.searchResults = [];
    this.tmdbService.getMoviesByMood(mood).subscribe((res: any) => {
      this.movies = res.results;
    });
  }

  // searchMovies() {
  //   if (!this.searchQuery.trim()) return;
  //   this.selectedMood = '';
  //   this.tmdbService.searchMulti(this.searchQuery).subscribe((res: any) => {
  //     this.searchResults = res.results.filter((item: any) => item.media_type === 'movie');
  //   });
  // }

//    searchMovies() {
//   if (!this.searchQuery.trim()) return;

//   this.selectedMood = '';
//   this.tmdbService.searchMulti(this.searchQuery).subscribe((res: any) => {
//     this.searchResults = res.results.filter((item: any) =>
//       item.media_type === 'movie' || item.media_type === 'person'
//     );
//   });
// }

searchMovies() {
  if (!this.searchQuery.trim()) return;

  this.router.navigate(['/search'], {
    queryParams: { q: this.searchQuery.trim() }
  });
}


isMovie(item: any): boolean {
  return item.media_type === 'movie';
}

isPerson(item: any): boolean {
  return item.media_type === 'person';
}


  goToDetails(id: number) {
    this.router.navigate(['/movie', id]);
  }



toggleWatchlist(movie: any) {
  this.watchlistService.toggleMovie(movie);
}

isInWatchlist(id: number): boolean {
  return this.watchlistService.isInWatchlist(id);
}

}
