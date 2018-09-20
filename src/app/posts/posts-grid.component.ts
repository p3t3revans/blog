import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { SorterService } from '../core/services/sorter.service';
import { TrackByService } from '../core/services/trackby.service';
import { IPost } from '../shared/interfaces';

@Component({
  selector: 'cm-posts-grid',
  templateUrl: './posts-grid.component.html',
  styleUrls: ['./posts-grid.component.css'],
  // When using OnPush detectors, then the framework will check an OnPush
  // component when any of its input properties changes, when it fires
  // an event, or when an observable fires an event ~ Victor Savkin (Angular Team)
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsGridComponent implements OnInit {

  @Input() posts: IPost[] = [];

  constructor(private sorterService: SorterService, public trackbyService: TrackByService) { }

  ngOnInit() {

  }

  sort(prop: string) {
    this.sorterService.sort(this.posts, prop);
  }

}
