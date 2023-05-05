import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Post } from '../interfaces/common';
import { Subscription } from 'rxjs';
import { PostService } from '../services/api/post.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css'],
})
export class PostDetailsComponent implements OnInit, OnDestroy {
  public postText = new FormControl('', [Validators.required]);
  public form: FormGroup;
  private subscriptions: Subscription[] = [];
  public isCreateMode: boolean = false;
  public post: Post;

  constructor(
    private dialog: MatDialogRef<PostDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Post,
    private fb: FormBuilder,
    public postService: PostService
  ) {
    this.post = data ? Object.assign({}, data) : <Post>{};
    this.isCreateMode = data.post ? false : true;
    this.postText.setValue(this.post.post || '');
    this.form = fb.group({
      postText: this.postText,
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
  }

  public cancel(): void {
    this.dialog.close(false);
  }

  public save(): void {
    this.post.post = this.postText.value || '';
    if (!this.isCreateMode) {
      this.subscriptions.push(
        this.postService.update(this.post).subscribe((result) => {
          this.dialog.close(true);
        })
      );
    } else {
      this.subscriptions.push(
        this.postService.create(this.post).subscribe((result) => {
          this.dialog.close(true);
        })
      );
    }
  }
}
