import { sandboxOf } from 'angular-playground';
import { SharedModule } from '../shared/shared.module';
import { PostsGridComponent } from './posts-grid.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '../core/core.module';
import { posts } from '../shared/mocks';

const sandboxConfig = {
  imports: [ SharedModule, CoreModule, RouterTestingModule ],
  label: 'Posts Grid Component'
};

export default sandboxOf(PostsGridComponent, sandboxConfig)
  .add('With Many Posts', {
    template: `<cm-posts-grid [posts]="posts"></cm-posts-grid>`,
    context: {
      posts: posts
    }
  })
  .add('With 10 Posts', {
    template: `<cm-posts-grid [posts]="posts"></cm-posts-grid>`,
    context: {
      posts: posts.slice(0, 10)
    }
  })
  .add('With 4 Posts', {
    template: `<cm-posts-grid [posts]="posts"></cm-posts-grid>`,
    context: {
      posts: posts.slice(0, 4)
    }
  })
  .add('Without Posts', {
    template: `<cm-posts-grid></cm-posts-grid>`
  });

