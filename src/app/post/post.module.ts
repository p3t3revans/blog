import { NgModule } from '@angular/core';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { SharedModule } from '../shared/shared.module';
import { PostRoutingModule } from './post-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    PostRoutingModule, 
    SharedModule,
    AngularEditorModule,
    FormsModule,
    ReactiveFormsModule],
  declarations: [
    PostRoutingModule.components]
})
export class PostModule { }
