import { Component, Input, OnInit } from '@angular/core';
import { Post, PostsRequestParams } from '../interfaces/common';
import { AdminService } from '../services/admin.service';
import { PostService } from '../services/api/post.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { PostDetailsComponent } from '../post-details/post-details.component';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  @Input() searchText: string = '';
  private subscriptions: Subscription[] = [];
  public posts: Post[] = [];
  public postsCount: number = 0;
  public pageIndex: number = 0;
  public postsPerPage: number = 20;
  public isDesc: boolean = true;
  public feedId: string = '';

  constructor(
    public adminService: AdminService,
    public postService: PostService,
    private dialog: MatDialog,
    private authService: AuthenticationService
  ) {}

  async ngOnInit(): Promise<void> {
    this.loadPosts();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
  }

  public async loadPosts(): Promise<void> {
    const params: PostsRequestParams = {
      link: 'https://lifehacker.com/rss',
      limit: this.postsPerPage,
      offset: this.pageIndex,
    };
    this.subscriptions.push(
      this.postService.get(params).subscribe((result) => {
        this.posts = result.rows;
        this.postsCount = result.count;
        this.loadFeedId();

        if (!result.count && this.pageIndex > 0) {
          this.pageIndex--;
          this.loadPosts();
          return;
        }
      })
    );
  }

  public pageChanged(event: any): void {
    this.pageIndex = event.pageIndex;
    this.loadPosts();
  }

  public createPost(): void {
    this.updatePost({ feedId: this.posts[0].feedId } as Post);
  }

  public deletePost(post: Post): void {
    this.subscriptions.push(
      this.postService.delete(post.id!).subscribe((result) => {
        this.loadPosts();
      })
    );
  }

  public updatePost(post?: Post): void {
    const dialogRef = this.dialog.open(PostDetailsComponent, {
      data: post,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadPosts();
      }
    });
  }

  public loadFeedId(): void {
    //TODO get feed and feed id in normal way
    this.feedId = this.posts[0].feedId || '';
  }

  public sort(): void {
    this.isDesc = !this.isDesc;
    this.posts = this.posts.reverse();
  }

  public performSearch(): void {
    const params: PostsRequestParams = {
      feedId: this.feedId,
      limit: this.postsPerPage,
      offset: 0,
      text: this.searchText,
    };
    this.subscriptions.push(
      this.postService.get(params).subscribe((result) => {
        if (result.count > 0) {
          this.posts = result.rows;
        }
      })
    );
  }

  public logout(): void {
    this.authService.logout();
  }
}
