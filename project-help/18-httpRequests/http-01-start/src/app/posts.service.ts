import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject, catchError, map, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostsService {
  error = new Subject<string>();

  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    const postData: Post = { title: title, content: content };
    this.http
      .post<{ name: string }>(
        'https://jes-angular-default-rtdb.firebaseio.com/posts.json',
        postData
      )
      .subscribe(
        (responseData) => {
          console.log(responseData);
        },
        (error) => {
          this.error.next(error.message);
        }
      );
  }
  fetchPosts() {
    return this.http
      .get<{ [key: string]: Post }>(
        'https://jes-angular-default-rtdb.firebaseio.com/posts.json'
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
      );
    // .subscribe((posts) => {
    // console.log(posts);
    // this.isFetching = false;
    // this.loadedPosts = posts;
    // });
  }

  deletePosts() {
    return this.http.delete(
      'https://jes-angular-default-rtdb.firebaseio.com/posts.json'
    );
  }
}
