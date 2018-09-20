import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'cm-comments',
  templateUrl: './post.component.html'
})
export class PostComponent implements OnInit {

    //displayMode: PostDisplayModeEnum;
    //displayModeEnum = PostDisplayModeEnum;

    constructor(private router: Router) { }

    ngOnInit() {

      // No longer needed due to routerLinkActive feature in Angular
      /* const path = this.router.url.split('/')[3];
      switch (path) {
         case 'details':
          this.displayMode = PostDisplayModeEnum.Details;
           break;
         case 'comments':
           this.displayMode = PostDisplayModeEnum.Comments;
           break;
         case 'edit':
           this.displayMode = PostDisplayModeEnum.Edit;
           break;
       } */
    }

}

/* enum PostDisplayModeEnum {
 Details=0,
Comments=1,
 Edit=2
} */
