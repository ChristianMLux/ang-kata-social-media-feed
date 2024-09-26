import { Component, Input, inject, signal, computed, effect } from '@angular/core';
import { PostService } from '../post.service';
import { Comment } from '../models/comment.model';
import { NgFor, NgIf, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [NgFor, NgIf, DatePipe, FormsModule],
  templateUrl: './comment-list.component.html',
  styleUrl: './comment-list.component.scss'
})
export class CommentListComponent {
  @Input() postId!: number;
  
  private postService = inject(PostService);
  comments = signal<Comment[]>([]);

  private _newCommentContent = signal('');
  private _newCommentAuthor = signal('');

  get newCommentContent(): string {
    return this._newCommentContent();
  }

  set newCommentContent(value: string) {
    this._newCommentContent.set(value);
  }

  get newCommentAuthor(): string {
    return this._newCommentAuthor();
  }

  set newCommentAuthor(value: string) {
    this._newCommentAuthor.set(value);
  }

  contentLength = computed(() => this._newCommentContent().length);
  authorLength = computed(() => this._newCommentAuthor().length);

  updateContent(value: string) {
    this._newCommentContent.set(value.slice(0, 250));
  }

  updateAuthor(value: string) {
    this._newCommentAuthor.set(value.slice(0, 30));
  }

  isValid = computed(() => {
    return this._newCommentContent().trim().length > 0 &&
           this._newCommentContent().length <= 250 &&
           this._newCommentAuthor().trim().length > 0 &&
           this._newCommentAuthor().length <= 30;
  });

  constructor() {
    effect(() => {
      this.comments.set(this.postService.getCommentsForPost(this.postId));
    });
  }

  addComment() {
    if (this.isValid()) {
      this.postService.addComment(this.postId, this._newCommentContent(), this._newCommentAuthor());
      this._newCommentContent.set('');
      this._newCommentAuthor.set('');
    }
  }
}