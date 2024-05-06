import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';
import { PostsService } from './posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;
  private errorSub: Subscription;

  constructor(private http: HttpClient, private postsService: PostsService) {}

  ngOnInit() {
    this.errorSub = this.postsService.error.subscribe((errorMessage) => {
      this.error = errorMessage;
    });
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(
      (posts) => {
        this.isFetching = false;
        this.loadedPosts = posts;
      },
      (error) => {
        this.isFetching = false;
        this.error = error.message;
      }
    );
  }

  onCreatePost(postData: Post) {
    // Send Http request
    // console.log(postData);

    // this.http
    //   .post<{ name: string }>(
    //     'https://jes-angular-default-rtdb.firebaseio.com/posts.json',
    //     postData
    //   )
    //   .subscribe((responseData) => {
    //     console.log(responseData);
    //   });

    this.postsService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    // Send Http request
    // this.postsService.fetchPosts();

    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(
      (posts) => {
        this.isFetching = false;
        this.loadedPosts = posts;
      },
      (error) => {
        this.isFetching = false;
        this.error = error.message;
        console.log(error);
      }
    );
  }

  onClearPosts() {
    // Send Http request
    this.postsService.deletePosts().subscribe(() => {
      this.loadedPosts = [];
    });
  }

  // private fetchPosts() {
  //   this.isFetching = true;
  // this.http
  //   .get<{ [key: string]: Post }>(
  //     'https://jes-angular-default-rtdb.firebaseio.com/posts.json'
  //   )
  //   .pipe(
  //     map((responseData) => {
  //       const postArray: Post[] = [];
  //       for (const key in responseData) {
  //         if (responseData.hasOwnProperty(key)) {
  //           postArray.push({ ...responseData[key], id: key });
  //         }
  //       }
  //       return postArray;
  //     })
  //   )
  //   .subscribe((posts) => {
  //     // console.log(posts);
  //     this.isFetching = false;
  //     this.loadedPosts = posts;
  //   });
  // }

  onHandleError() {
    this.error = null;
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }
}
