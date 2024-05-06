import {
  HttpClient,
  HttpEventType,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject, catchError, map, tap, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostsService {
  error = new Subject<string>();

  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    const postData: Post = { title: title, content: content };
    this.http
      .post<{ name: string }>(
        'https://jes-angular-default-rtdb.firebaseio.com/posts.json',
        postData,
        {
          // observe: 'body',
          observe: 'response',
        }
      )
      .subscribe(
        (responseData) => {
          // console.log(responseData.body);
          console.log(responseData);
        },
        (error) => {
          this.error.next(error.message);
        }
      );
  }

  fetchPosts() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'key');
    return (
      this.http
        // .get
        .get<{ [key: string]: Post }>(
          'https://jes-angular-default-rtdb.firebaseio.com/posts.json',
          {
            headers: new HttpHeaders({ 'Custom-Header': 'Hello' }),
            // params: new HttpParams().set('print', 'pretty'),
            params: searchParams,
            responseType: 'json',
            // responseType: 'text',
          }
        )
        .pipe(
          map((responseData) => {
            const postArray: Post[] = [];
            for (const key in responseData) {
              if (responseData.hasOwnProperty(key)) {
                postArray.push({ ...responseData[key], id: key });
              }
            }
            return postArray;
          }),
          catchError((errorRes) => {
            //send to analytics server
            return throwError(errorRes);
          })
        )
    );
    // .subscribe((posts) => {
    // console.log(posts);
    // this.isFetching = false;
    // this.loadedPosts = posts;
    // });
  }

  deletePosts() {
    return this.http
      .delete('https://jes-angular-default-rtdb.firebaseio.com/posts.json', {
        observe: 'events',
        responseType: 'text',
      })
      .pipe(
        tap((event) => {
          console.log(event);
          if (event.type === HttpEventType.Sent) {
            // console.log(event);
            //..
          }
          if (event.type === HttpEventType.Response) {
            console.log(event.body);
          }
        })
      );
  }
}
