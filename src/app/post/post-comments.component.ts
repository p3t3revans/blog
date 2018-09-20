import { Component, OnInit } from '@angular/core';
import {FormArray,FormControl,FormGroup} from '@angular/forms';
//import { ActivatedRoute, Params } from '@angular/router';

//import { DataService } from '../core/services/data.service';
//import { IPost, IComment} from '../shared/interfaces';

@Component({
  selector: 'cm-post-comments',
  templateUrl: './post-comments.component.html'
})
export class PostCommentsComponent implements OnInit {

  form = new FormGroup({
    cities:new FormArray([
      new FormControl('Canberra'),
      new FormControl('Melbourne')

    ])
  })

  //comments: IComment[] = [];
  //post: IPost;

  //constructor(private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
      // Subscribe to params so if it changes we pick it up.  Could use this.route.parent.snapshot.params["id"] to simplify it.
      //this.route.parent.params.subscribe((params: Params) => {
       // const id = params['id'];
       // this.dataService.getPost(id).subscribe((post: IPost) => {
        //  this.post = post;
       // });
     // });
  }

 // commentsTrackBy(index: number, commentItem: any) {
 //   return index;
 // }

}
