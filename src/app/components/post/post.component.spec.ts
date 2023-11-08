import { Post } from 'src/app/models/Post';
import { PostComponent } from './post.component';
import { first } from 'rxjs/operators';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('Post component', () => {
  let fixture: ComponentFixture<PostComponent>;
  let comp: PostComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostComponent],
    });
    const fixture = TestBed.createComponent(PostComponent);
    comp = fixture.componentInstance;
  });
  it('should create post component using TestBed', () => {
    expect(comp).toBeDefined();
  });
  it('should raise an event when the delete post is clicked', () => {
    const post: Post = {
      id: 1,
      title: 'Test Post',
      body: 'Test Body',
      userId: 5,
    };
    comp.post = post;
    comp.delete.pipe(first()).subscribe((p) => {
      expect(p).toEqual(post);
    });

    comp.onDeletePost(new MouseEvent('click'));
  });
});
