import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { SearchResultsComponent } from './features/search-results/search-results.component';
import { MovieDetailComponent } from './features/movie-detail/movie-detail.component';
import { WatchlistComponent } from './features/watchlist/watchlist.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search', component: SearchResultsComponent },
  { path: 'movie/:id', component: MovieDetailComponent },
  { path: 'watchlist', component: WatchlistComponent},

  { path: '**', redirectTo: '' }
];
