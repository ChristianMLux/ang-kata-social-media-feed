import { Component, inject, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../post.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-post-creation',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './post-creation.component.html',
  styleUrl: './post-creation.component.scss'
})
export class PostCreationComponent {
  private postService = inject(PostService);
  authService = inject(AuthService);
  private router = inject(Router);

  private _content = signal('');

  get content(): string {
    return this._content();
  }

  set content(value: string) {
    this._content.set(value);
  }

  contentLength = computed(() => this._content().length);

  updateContent(value: string) {
    this._content.set(value.slice(0, 250));
  }

  isValid = computed(() => {
    return this._content().trim().length > 0 && this._content().length <= 250;
  });

  createPost() {
    if (this.isValid() && this.authService.isLoggedIn()) {
      const currentUser = this.authService.getCurrentUser();
      if (currentUser) {
        this.postService.addPost(this._content(), currentUser.email);
        this._content.set('');
      }
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}