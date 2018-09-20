import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostComponent } from './post.component';
import { PostCommentsComponent } from './post-comments.component';
import { PostDetailsComponent } from './post-details.component';
import { PostEditComponent } from './post-edit.component';
import { PostAddComponent } from './post-add.component';
import { CanActivateGuard } from './can-activate.guard';
import { CanDeactivateGuard } from './can-deactivate.guard';

const routes: Routes = [
  {
    path: '',
    component: PostComponent,
    children: [
/*       { path: 'comments', component: PostCommentsComponent }, */
      { path: 'details', component: PostDetailsComponent },
      {
        path: 'edit',
        component: PostEditComponent,
        canActivate: [CanActivateGuard],
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'add',
        component: PostAddComponent,
        canActivate: [CanActivateGuard],
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'comment',
        component: PostCommentsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CanActivateGuard, CanDeactivateGuard]
})
export class PostRoutingModule {
  static components = [PostComponent, PostCommentsComponent, PostDetailsComponent, PostEditComponent, PostAddComponent];
}

