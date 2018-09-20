import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules, NoPreloading } from '@angular/router';

import { PreloadModulesStrategy } from './core/strategies/preload-modules.strategy';

const app_routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/posts' },
  { path: 'posts/:id', loadChildren: 'app/post/post.module#PostModule' },
/*  { path: 'customers', loadChildren: 'app/customers/customers.module#CustomersModule' },
{ path: 'customers/:id', loadChildren: 'app/customer/customer.module#CustomerModule' },
{ path: 'orders', loadChildren: 'app/orders/orders.module#OrdersModule' }, */
 { path: 'post', loadChildren: 'app/post.add/post.module#PostModule' },
  { path: 'about', loadChildren: 'app/about/about.module#AboutModule' },
  { path: 'posts', loadChildren: 'app/posts/posts.module#PostsModule' },
  { path: 'post/comment', loadChildren: 'app/post/post.module#PostModule'},
  { path: '**', pathMatch: 'full', redirectTo: '/posts' } // catch any unfound routes and redirect to home page
];

@NgModule({
  imports: [ RouterModule.forRoot(app_routes, { preloadingStrategy: PreloadAllModules }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
