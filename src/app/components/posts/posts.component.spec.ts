import { Post } from 'src/app/models/Post';
import { PostsComponent } from './posts.component';
import { of } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostService } from 'src/app/services/Post/post.service';
import { PostComponent } from '../post/post.component';
import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

// class mockPostService {
//   getPosts() {}
//   deletePost(post: Post) {
//     return of(true);
//   }
// }

describe('Posts Component', () => {
  let POSTS: Post[] = [];
  let component: PostsComponent;
  let mockPostService: any;
  let postService: any;
  let fixture: ComponentFixture<PostsComponent>;

  @Component({
    selector: 'app-post',
    template: '<div></div>',
  })
  class FakePostComponent {
    @Input() post!: Post;
  }

  beforeEach(() => {
    POSTS = [
      {
        id: 1,
        body: 'body 1',
        title: 'title 1',
        userId: 1,
      },
      {
        id: 2,
        body: 'body 2',
        title: 'title 2',
        userId: 2,
      },
      {
        id: 3,
        body: 'body 3',
        title: 'title 3',
        userId: 3,
      },
    ];

    mockPostService = jasmine.createSpyObj('PostService', [
      'getPosts',
      'deletePost',
    ]);

    TestBed.configureTestingModule({
      declarations: [PostsComponent, PostComponent],
      providers: [
        {
          provide: PostService,
          useValue: mockPostService,
        },
      ],
    });
    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    // postService = TestBed.inject(PostService);
  });

  it('should create exact same number of Post component with posts', () => {
    mockPostService.getPosts.and.returnValue(of(POSTS));
    // This will call ngOnInit for PostsComponent and their child components
    fixture.detectChanges();
    const postComponentDEs = fixture.debugElement.queryAll(
      By.directive(PostComponent)
    );

    expect(postComponentDEs.length).toBe(POSTS.length);
  });
  it('should check whether exact post is sending to PostComponent', () => {
    mockPostService.getPosts.and.returnValue(of(POSTS));
    fixture.detectChanges();
    const postComponentDEs = fixture.debugElement.queryAll(
      By.directive(PostComponent)
    );

    postComponentDEs.forEach((postComponentDE, index) => {
      expect(postComponentDE.componentInstance.post.title).toEqual(
        POSTS[index].title
      );
    });
  });

  it('should set posts from the service directly', () => {
    mockPostService.getPosts.and.returnValue(of(POSTS));
    fixture.detectChanges();
    expect(component.posts.length).toBe(3);
  });

  it('should create one post child element for each post', () => {
    mockPostService.getPosts.and.returnValue(of(POSTS));
    fixture.detectChanges();
    const debugElement = fixture.debugElement;
    const postsElement = debugElement.queryAll(By.css('.posts'));

    expect(postsElement.length).toBe(POSTS.length);
  });

  describe('delete', () => {
    beforeEach(() => {
      mockPostService.deletePost.and.returnValue(of(true));
      component.posts = POSTS;
    });
    it('should delete a post', () => {
      const postToDelete = POSTS[0];
      component.delete(postToDelete);
      const deletedPost = component.posts.find((p) => p.id === postToDelete.id);
      expect(deletedPost).toBeUndefined();
    });

    it('should delete the actual selected post in Posts', () => {
      component.delete(POSTS[0]);
      expect(component.posts[0].id).toBe(2);
    });

    it('should call delete method in Post Service once', () => {
      component.delete(POSTS[0]);
      expect(mockPostService.deletePost).toHaveBeenCalledTimes(1);
    });
  });
});
