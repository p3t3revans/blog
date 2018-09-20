import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';

import { DataService } from '../core/services/data.service';
import { ModalService, IModalContent } from '../core/modal/modal.service';
import { IPost, IState } from '../shared/interfaces';
import { GrowlerService, GrowlerMessageType } from '../core/growler/growler.service';
import { LoggerService } from '../core/services/logger.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
@Component({
  selector: 'cm-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostAddComponent implements OnInit {

  post: IPost =
    {
      id: '',
      title: '',
      content: '',
      author: 'user',
      comments: [],
      createDate: new Date(Date.now()),
      tags: ['news'],
      likes:0,
      dislikes:0
    };
  //states: IState[];
  errorMessage: string;
  deleteMessageEnabled: boolean;
  operationText = 'Insert';
  @ViewChild('addForm') addForm: NgForm;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private growler: GrowlerService,
    private modalService: ModalService,
    private logger: LoggerService) { }

  ngOnInit() {
    // Subscribe to params so if it changes we pick it up. Don't technically need that here
    // since param won't be changing while component is alive.
    // Could use this.route.parent.snapshot.params["id"] to simplify it.
    /*  this.route.parent.params.subscribe((params: Params) => {
       const id = params['id'];
       if (id !== 'x') {
         this.operationText = 'Update';
         this.getPost(id);
       } 
     });*/

    //this.dataService.getStates().subscribe((states: IState[]) => this.states = states);
  }

  /* getPost(id: string) {
    this.dataService.getPost(id).subscribe((post: IPost) => {
      this.post = post;
    });
  } */

  submit() {

    this.dataService.insertPost(this.post)
      .subscribe((insertedPost: IPost) => {
        if (insertedPost) {
          // Mark form as pristine so that CanDeactivateGuard won't prompt before navigation
          this.addForm.form.markAsPristine();
          this.router.navigate(['/posts']);
        } else {
          const msg = 'Unable to insert post';
          this.growler.growl(msg, GrowlerMessageType.Danger);
          this.errorMessage = msg;
        }
      },
        (err: any) => this.logger.log(err));

  }

  cancel(event: Event) {
    event.preventDefault();
    // Route guard will take care of showing modal dialog service if data is dirty
    this.router.navigate(['/posts']);
  }

 

  canDeactivate(): Promise<boolean> | boolean {
    if (!this.addForm.dirty) {
      return true;
    }

    // Dirty show display modal dialog to user to confirm leaving
    const modalContent: IModalContent = {
      header: 'Lose Unsaved Changes?',
      body: 'You have unsaved changes! Would you like to leave the page and lose them?',
      cancelButtonText: 'Cancel',
      OKButtonText: 'Leave'
    };
    return this.modalService.show(modalContent);
  }

}
