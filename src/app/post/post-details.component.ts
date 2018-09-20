import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params } from '@angular/router';
import { FormArray, Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { IPost, IComment } from '../shared/interfaces';
import { GrowlerService, GrowlerMessageType } from '../core/growler/growler.service';
import { DataService } from '../core/services/data.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { LoggerService } from '../core/services/logger.service';
@Component({
  selector: 'cm-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  editorConfig: AngularEditorConfig = {
    editable: false,
    spellcheck: true,
    height: '100rem',
    minHeight: '5rem',
    placeholder: 'Tekst leggur hér',
    translate: 'yes',
    uploadUrl: '/api/images',
    customClasses: []
  };
  post: IPost;
  comment: IComment =
    {
      text: '',
      createUser: 'user',
      commentDate: new Date(Date.now()),
      likes:0,
      dislikes:0
    };
  mapEnabled: boolean;
  detailForm :FormGroup;
  errorMessage:string;
  

  /* commentForm = this.fb.group({
    comments: this.fb.array([
      this.fb.control('')
    ])
  }); */
  constructor(private route: ActivatedRoute, 
              private dataService: DataService, 
              private fb: FormBuilder,
              private growler: GrowlerService,
              private router: Router,
              private logger: LoggerService
            ) { }

  ngOnInit() {
    this.detailForm = this.fb.group({
      comments: this.fb.array([])
    })
  

    // Subscribe to params so if it changes we pick it up. Could use this.route.parent.snapshot.params["id"] to simplify it.
    this.route.parent.params.subscribe((params: Params) => {
      const id = params['id'];
      if (id) {
        this.dataService.getPost(id)
          .subscribe((post: IPost) => {
            this.post = post;
            this.post.id = id;
            if(!this.post.likes) this.post.likes = 0;
            if(!this.post.dislikes) this.post.dislikes = 0;
            this.mapEnabled = true;
          });
      }
    });
  }

  get commentFroms (){
    return this.detailForm.get('comments') as FormArray
  }

  addComment() {
    const comment = this.fb.group({
        text:[],
    })
    this.commentFroms.push(comment);
  }

  deleteComment(i){
    this.commentFroms.removeAt(i);
  }
  
  saveComment(i) {
    var item = this.commentFroms.at(i).value;
    this.comment.text = item.text;
    this.dataService.insertComment(this.post,this.comment)
         .subscribe((status: boolean)=>
           {
             if (status){
              this.growler.growl('Comment Inserted', GrowlerMessageType.Success);
              this.errorMessage = 'Comment Inserted';
              this.mapEnabled = true;
              this.post.comments.push(this.comment);
              this.deleteComment(i);
             }
             else{
              this.growler.growl('Unable to insert comment', GrowlerMessageType.Danger);
             }
           }
        )
    
  }
  likePost() {

    this.dataService.likePost(this.post)
         .subscribe((status: boolean)=>
           {
             if (status){
              this.growler.growl('I liked it. \\\(^.^)/', GrowlerMessageType.Success);
              this.errorMessage = 'I liked it';
              ++this.post.likes;
              this.mapEnabled = true;
             }
             else{
              this.growler.growl('Unable to insert comment', GrowlerMessageType.Danger);
             }
           }
        )
    
  }
  dislikePost() {

    this.dataService.dislikePost(this.post)
         .subscribe((status: boolean)=>
           {
             if (status){
              this.growler.growl('I disliked it. /(^.^)\\', GrowlerMessageType.Success);
              this.errorMessage = 'I disliked it';
              ++this.post.dislikes;
              this.mapEnabled = true;
             }
             else{
              this.growler.growl('Unable to insert dislike', GrowlerMessageType.Danger);
             }
           }
        )
    
  }
  likeComment(id,index) {

    this.dataService.likeComment(this.post.id,id)
         .subscribe((status: boolean)=>
           {
             if (status){
              this.growler.growl('I liked the comment. \\\(^.^)/', GrowlerMessageType.Success);
              this.errorMessage = 'I liked it';
              ++this.post.comments[index].likes;
              this.mapEnabled = true;
             }
             else{
              this.growler.growl('Unable to insert comment', GrowlerMessageType.Danger);
             }
           }
        )
    
  }
  dislikeComment(id,index) {

    this.dataService.dislikeComment(this.post.id,id)
         .subscribe((status: boolean)=>
           {
             if (status){
              this.growler.growl('I disliked the comment. /(^.^)\\', GrowlerMessageType.Success);
              this.errorMessage = 'I disliked it';
              ++this.post.comments[index].dislikes;
              this.mapEnabled = true;
             }
             else{
              this.growler.growl('Unable to insert dislike', GrowlerMessageType.Danger);
             }
           }
        )
    
  }
  onSubmit(){}
}
