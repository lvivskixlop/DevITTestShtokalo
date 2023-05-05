import { Component, OnInit } from '@angular/core';
import { Post, PostsRequestParams } from '../interfaces/common';
import { AdminService } from '../services/admin.service';
import { PostService } from '../services/api/post.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { PostDetailsComponent } from '../post-details/post-details.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  public posts: Post[] = [];
  public postsCount: number = 0;
  public pageIndex: number = 0;
  public postsPerPage: number = 20;

  constructor(
    public adminService: AdminService,
    public postService: PostService,
    private dialog: MatDialog
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

  public deletePost(post: Post): void {}

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
}
