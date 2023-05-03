import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  public posts: any[] = [];
  public postsCount: number = 0;
  public pageIndex: number = 0;
  public postsPerPage: number = 20;

  public pageChanged(event: any): void {
    this.pageIndex = event.pageIndex;
  }
}
