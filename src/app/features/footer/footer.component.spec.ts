import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the footer component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the brand name', () => {
    const brandText = fixture.nativeElement.querySelector('h5');
    expect(brandText?.textContent).toContain('What Should I Watch Tonight');
  });

  it('should contain quick links with correct routerLinks', () => {
    const links = fixture.debugElement.queryAll(By.css('a[routerLink]'));
    const linkRoutes = links.map(el => el.attributes['routerLink']);
    expect(linkRoutes).toContain('/');
    expect(linkRoutes).toContain('/watchlist');
  });

  it('should contain category links', () => {
    const categoryLinks = fixture.debugElement.queryAll(By.css('a[routerLink="/trending"], a[routerLink="/popular"], a[routerLink="/top-rated"]'));
    expect(categoryLinks.length).toBe(3);
  });

  it('should display copyright text', () => {
    const text = fixture.nativeElement.querySelector('.text-center span');
    expect(text?.textContent).toContain('Powered by TMDB API');
  });
});
