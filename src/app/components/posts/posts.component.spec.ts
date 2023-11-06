import { Post } from 'src/app/models/Post';
import { PostsComponent } from './posts.component';
import { of } from 'rxjs';

describe('Posts Component', () => {
  let POSTS: Post[] = [];
  let component: PostsComponent;
  let mockPostService: any;

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
    component = new PostsComponent(mockPostService);
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
