import { Routes } from '@angular/router';
import { PostListComponent } from './post-list/post-list.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];