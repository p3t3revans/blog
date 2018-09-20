import { RouterTestingModule } from '@angular/router/testing';
import { sandboxOf } from 'angular-playground';

import { SharedModule } from '../shared/shared.module';
import { PostsComponent } from './posts.component';
import { PostsCardComponent } from './posts-card.component';
import { PostsGridComponent } from './posts-grid.component';
import { CoreModule } from '../core/core.module';
import { posts, MockDataService } from '../shared/mocks';
import { DataService } from '../core/services/data.service';

const sandboxConfig = {
  imports: [ SharedModule, CoreModule, RouterTestingModule ],
  declarations: [ PostsCardComponent, PostsGridComponent ],
  providers: [
    { provide: DataService, useClass: MockDataService }
],
  label: 'Posts Component'
};

export default sandboxOf(PostsComponent, sandboxConfig)
  .add('With Posts', {
    template: `<cm-posts></cm-posts>`
  });
