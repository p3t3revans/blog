import { sandboxOf } from 'angular-playground';
import { SharedModule } from '../shared/shared.module';
import { PostsCardComponent } from './posts-card.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '../core/core.module';
import { posts } from '../shared/mocks';

const sandboxConfig = {
  imports: [ SharedModule, CoreModule, RouterTestingModule ],
  label: 'Posts Card Component'
};

export default sandboxOf(PostsCardComponent, sandboxConfig)
  .add('With Many Posts', {
    template: `<cm-posts-card [posts]="posts"></cm-posts-card>`,
    context: {
      posts: posts
    }
  })
  .add('With 10 Posts', {
    template: `<cm-posts-card [posts]="posts"></cm-posts-card>`,
    context: {
      posts: posts.slice(0, 10)
    }
  })
  .add('With 4 Posts', {
    template: `<cm-posts-card [posts]="posts"></cm-posts-card>`,
    context: {
      posts: posts.slice(0, 4)
    }
  })
  .add('Without Posts', {
    template: `<cm-posts-card></cm-posts-card>`
  });

