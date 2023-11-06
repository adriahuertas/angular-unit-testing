import { Post } from 'src/app/models/Post';
import { PostComponent } from './post.component';
import { first } from 'rxjs/operators';

describe('Post component', () => {
  it('should raise an event when the delete post is clicked', () => {
    const component = new PostComponent();
    const post: Post = {
      id: 1,
      title: 'Test Post',
      body: 'Test Body',
      userId: 5,
    };
    component.post = post;
    component.delete.pipe(first()).subscribe((p) => {
      expect(p).toEqual(post);
    });

    component.onDeletePost(new MouseEvent('click'));
  });
});
