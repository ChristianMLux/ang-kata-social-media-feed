import { Injectable, signal } from '@angular/core';
import { Post } from './models/post.model';
import { Comment } from './models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts = signal<Post[]>([]);
  private comments = signal<Comment[]>([]);

  constructor() {}

  getPosts() {
    return this.posts.asReadonly();
  }

  addPost(content: string, author: string) {
    const newPost: Post = {
      id: this.posts().length + 1,
      content,
      author,
      createdAt: new Date(),
      likes: 0
    };
    this.posts.update(currentPosts => [...currentPosts, newPost]);
  }

  likePost(postId: number) {
    this.posts.update(currentPosts => 
      currentPosts.map(post => 
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  }

  getCommentsForPost(postId: number) {
    return this.comments().filter(comment => comment.postId === postId);
  }

  addComment(postId: number, content: string, author: string) {
    const newComment: Comment = {
      id: this.comments().length + 1,
      postId,
      content,
      author,
      createdAt: new Date()
    };
    this.comments.update(currentComments => [...currentComments, newComment]);
  }
}