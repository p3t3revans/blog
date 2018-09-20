import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '25rem',
    minHeight: '5rem',
    placeholder: 'Add New Blog Content',
    translate: 'yes',
    uploadUrl: '/api/images',
    customClasses : []
  }
 addForm: FormGroup;
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

  

 // @ViewChild('addForm') addForm: NgForm;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private dataService: DataService,
    private growler: GrowlerService,
    private modalService: ModalService,
    private logger: LoggerService) { }

  ngOnInit() {

    this.operationText = 'Add Post';
    this.buildForm(); 



    //this.dataService.getStates().subscribe((states: IState[]) => this.states = states);
  }
  buildForm() {
    this.addForm = this.formBuilder.group({
      title: ['', [Validators.required]]
      //content: ['', [Validators.required]]
    });
  };
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
          //this.addForm.form.markAsPristine();
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
    /*  if (!this.addForm.dirty) {
       return true;
     } */
    return true;
    // Dirty show display modal dialog to user to confirm leaving
    /* const modalContent: IModalContent = {
      header: 'Lose Unsaved Changes?',
      body: 'You have unsaved changes! Would you like to leave the page and lose them?',
      cancelButtonText: 'Cancel',
      OKButtonText: 'Leave'
    };
    return this.modalService.show(modalContent); */
  }

}
