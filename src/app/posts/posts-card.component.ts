import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { IPost } from '../shared/interfaces';
import { TrackByService } from '../core/services/trackby.service';

@Component({
  selector: 'cm-posts-card',
  templateUrl: './posts-card.component.html',
  styleUrls: [ './posts-card.component.css' ],
  // When using OnPush detectors, then the framework will check an OnPush
  // component when any of its input properties changes, when it fires
  // an event, or when an observable fires an event ~ Victor Savkin (Angular Team)
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsCardComponent implements OnInit {

  @Input() posts: IPost[] = [];

  constructor(public trackbyService: TrackByService) { }

  ngOnInit() {

  }

}

