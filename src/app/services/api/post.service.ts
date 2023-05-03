import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  public create(post: any): Observable<any> {
    return this.http.post<any>('', post);
  }

  public get(id: string): Observable<any> {
    return this.http.get<any>('' + id);
  }

  public update(post: any): Observable<any> {
    return this.http.put<any>('', post);
  }

  public delete(id: string): Observable<any> {
    return this.http.delete<any>('' + id);
  }

}
