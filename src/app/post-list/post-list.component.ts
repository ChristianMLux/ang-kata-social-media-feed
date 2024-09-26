import { Component, inject } from '@angular/core';
import { PostService } from '../post.service';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { CommentListComponent } from '../comment-list/comment-list.component';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [NgFor, NgIf, DatePipe, CommentListComponent],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent {
  private postService = inject(PostService);
  posts = this.postService.getPosts();

  likePost(postId: number) {
    this.postService.likePost(postId);
  }
}