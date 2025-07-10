import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private apiUrl = 'https://api.themoviedb.org/3';
  private apiKey = environment.tmdbApiKey;

  constructor(private http: HttpClient) {}


   getMoviesByMood(mood: string) {
    const genreMap: any = {
      'feel-good': 35,
      'action-fix': 28,
      'mind-benders': 9648,
      'romantic': 10749,
      'thriller': 53,
      'animation': 16
    };
    return this.http.get(`${this.apiUrl}/discover/movie`, {
      params: {
        api_key: this.apiKey,
        with_genres: genreMap[mood],
        sort_by: 'popularity.desc'
      }
    });
  }

  searchMulti(query: string) {
    return this.http.get(`${this.apiUrl}/search/multi`, {
      params: {
        api_key: this.apiKey,
        query
      }
    });
  }

  getMovieDetails(id: string) {
    return this.http.get(`${this.apiUrl}/movie/${id}`, {
      params: {
        api_key: this.apiKey,
        append_to_response: 'videos,credits,similar'
      }
    });
  }

  getTrendingMovies() {
    return this.http.get(`${this.apiUrl}/trending/movie/week`, {
      params: {
        api_key: this.apiKey
      }
    });
  }

  getPopularMovies() {
  return this.http.get(`${this.apiUrl}/movie/popular`, { params: { api_key: this.apiKey } });
}

getTopRatedMovies() {
  return this.http.get(`${this.apiUrl}/movie/top_rated`, { params: { api_key: this.apiKey } });
}
}
