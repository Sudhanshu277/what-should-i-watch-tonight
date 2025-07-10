import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { SearchResultsComponent } from './features/search-results/search-results.component';
import { MovieDetailComponent } from './features/movie-detail/movie-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search', component: SearchResultsComponent },
  // { path: 'category/:mood', component: CategoryComponent },
  { path: 'movie/:id', component: MovieDetailComponent },
  { path: '**', redirectTo: '' }
];
