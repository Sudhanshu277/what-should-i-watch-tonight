import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { TmdbService } from '../../core/service/tmdb.service';
import { CommonModule } from '@angular/common';
import { WatchlistService } from '../../core/service/watchlist.service';

@Component({
  selector: 'app-movie-detail',
  imports: [CommonModule],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css'
})
export class MovieDetailComponent {
    movie: any;
  trailerUrl: SafeResourceUrl | null = null;

    constructor(
    private route: ActivatedRoute,
    private tmdbService: TmdbService,
    private sanitizer: DomSanitizer,
    public watchlistService: WatchlistService,
     private router: Router
  ) {}

 ngOnInit(): void {
  this.route.paramMap.subscribe(paramMap => {
    const movieId = paramMap.get('id');
    if (movieId) {
      this.tmdbService.getMovieDetails(movieId).subscribe((res: any) => {
        this.movie = res;


        const trailer = res.videos?.results?.find(
          (v: any) => v.type === 'Trailer' && v.site === 'YouTube'
        );

        if (trailer) {
          this.trailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            `https://www.youtube.com/embed/${trailer.key}`
          );
        } else {
          this.trailerUrl = null;
        }
      });
    }
  });
}



toggleWatchlist(movie: any) {
  this.watchlistService.toggleMovie(movie);
}

isInWatchlist(id: number): boolean {
  return this.watchlistService.isInWatchlist(id);
}


playTrailer() {
  const trailer = this.movie.videos?.results?.find((v:any) => v.type === 'Trailer' && v.site === 'YouTube');
  if (trailer) {
    window.open(`https://www.youtube.com/watch?v=${trailer.key}`, '_blank');
  }
}

  goToDetails(id: number) {
    this.router.navigate(['/movie', id]);
  }
}
