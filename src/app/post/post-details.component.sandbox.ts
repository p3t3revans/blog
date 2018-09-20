import { sandboxOf } from 'angular-playground';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { DataService } from '../core/services/data.service';
import { PostDetailsComponent } from './post-details.component';
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
  label: 'Post Details Component'
};

export default sandboxOf(PostDetailsComponent, sandboxConfig)
  .add('With a Post', {
    template: `<cm-post-details></cm-post-details>`
  })
  .add('Without a Post', {
    template: `<cm-post-details></cm-post-details>`,
    providers: [
      { provide: ActivatedRoute, useFactory: () => {
        const route = getActivatedRouteWithParent([{ id: null }]);
        return route;
      }}
    ]
  });
