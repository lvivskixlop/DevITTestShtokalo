import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Post,
  PostsRequestParams,
  PostsResponse,
} from 'src/app/interfaces/common';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  public create(post: Post): Observable<void> {
    return this.http.post<any>('api/rss', post);
  }

  public get(params?: PostsRequestParams): Observable<PostsResponse> {
    return this.http.get<any>('api/rss', { params: { ...params } });
  }

  public update(post: Post): Observable<void> {
    return this.http.put<any>('api/rss', post);
  }

  public delete(id: string): Observable<void> {
    return this.http.delete<any>('api/rss' + id);
  }
}
