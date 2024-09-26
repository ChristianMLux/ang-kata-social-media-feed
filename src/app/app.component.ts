import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AuthService } from './auth.service';
import { PostCreationComponent } from './post-creation/post-creation.component';
import { PostListComponent } from './post-list/post-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, PostCreationComponent, PostListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-tpl-3-christian-lux';
  authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }
}
