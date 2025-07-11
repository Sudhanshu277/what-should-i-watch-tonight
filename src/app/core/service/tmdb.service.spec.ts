import { TestBed } from '@angular/core/testing';
import { TmdbService } from './tmdb.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';

describe('TmdbService', () => {
  let service: TmdbService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TmdbService]
    });

    service = TestBed.inject(TmdbService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch trending movies', () => {
    service.getTrendingMovies().subscribe();

    const req = httpMock.expectOne(`${service['apiUrl']}/trending/movie/week?api_key=${environment.tmdbApiKey}`);
    expect(req.request.method).toBe('GET');
    req.flush({ results: [] });
  });

  it('should fetch movies by mood', () => {
    const mood = 'feel-good'; // mapped to genre 35
    service.getMoviesByMood(mood).subscribe();

    const req = httpMock.expectOne(r =>
      r.url === `${service['apiUrl']}/discover/movie` && r.params.get('with_genres') === '35'
    );

    expect(req.request.method).toBe('GET');
    req.flush({ results: [] });
  });

  it('should perform multi search', () => {
    service.searchMulti('batman').subscribe();

    const req = httpMock.expectOne(`${service['apiUrl']}/search/multi?api_key=${environment.tmdbApiKey}&query=batman`);
    expect(req.request.method).toBe('GET');
    req.flush({ results: [] });
  });

  it('should fetch movie details with appended data', () => {
    service.getMovieDetails('123').subscribe();

    const req = httpMock.expectOne(`${service['apiUrl']}/movie/123?api_key=${environment.tmdbApiKey}&append_to_response=videos,credits,similar`);
    expect(req.request.method).toBe('GET');
    req.flush({ id: 123 });
  });

  it('should fetch popular movies', () => {
    service.getPopularMovies().subscribe();

    const req = httpMock.expectOne(`${service['apiUrl']}/movie/popular?api_key=${environment.tmdbApiKey}`);
    expect(req.request.method).toBe('GET');
    req.flush({ results: [] });
  });

  it('should fetch top rated movies', () => {
    service.getTopRatedMovies().subscribe();

    const req = httpMock.expectOne(`${service['apiUrl']}/movie/top_rated?api_key=${environment.tmdbApiKey}`);
    expect(req.request.method).toBe('GET');
    req.flush({ results: [] });
  });
});
