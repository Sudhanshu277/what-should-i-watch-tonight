import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { HomeComponent } from "./features/home/home.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TmdbService } from './core/service/tmdb.service';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "./features/header/header.component";
import { FooterComponent } from "./features/footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, FormsModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'What Should I Watch Tonight?';



}
