import { sandboxOf } from 'angular-playground';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { DataService } from '../core/services/data.service';
import { PostCommentsComponent } from './post-comments.component';
import { MockDataService, MockActivatedRoute, getActivatedRouteWithParent } from '../shared/mocks';
import { ActivatedRoute } from '@angular/router';

const sandboxConfig = {
  imports: [ SharedModule, CoreModule ],
  providers: [
      { provide: DataService, useClass: MockDataService },
      { provide: ActivatedRoute, useFactory: () => {
        const route = getActivatedRouteWithParent([{ id: '1' }]);
        return route;
      }}
  ],
  label: 'Post Comments Component'
};

export default sandboxOf(PostCommentsComponent, sandboxConfig)
  .add('With Comments', {
    template: `<cm-post-comments></cm-post-comments>`
  })
  .add('Without Comments', {
    template: `<cm-post-comments></cm-post-comments>`,
    providers: [ { provide: ActivatedRoute, useFactory: () => {
      const route = getActivatedRouteWithParent([{ id: null }]);
      return route;
    }}]
  });
