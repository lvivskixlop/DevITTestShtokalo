import { Injectable } from '@angular/core';
import { Post } from '../interfaces/common';
import { PostService } from './api/post.service';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private subscriptions: Subscription[] = [];

  constructor(public postService: PostService) {}
}
