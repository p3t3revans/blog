import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { PostEditComponent } from './post-edit.component';
import { LoggerService } from '../core/services/logger.service';

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<PostEditComponent> {

  constructor(private logger: LoggerService) {}

  canDeactivate(
    component: PostEditComponent,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    this.logger.log(`PostId: ${route.parent.params['_id']} URL: ${state.url}`);

    // Check with component to see if we're able to deactivate
    return component.canDeactivate();
  }
}
