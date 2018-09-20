import { NgModule } from '@angular/core';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { SharedModule } from '../shared/shared.module';
import { PostRoutingModule } from './post-routing.module';

@NgModule({
  imports: [PostRoutingModule, 
          SharedModule,
          AngularEditorModule
          ],
  declarations: [PostRoutingModule.components]
})
export class PostModule { }
