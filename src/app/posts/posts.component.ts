import { Component, OnInit } from '@angular/core';

import { DataService } from '../core/services/data.service';
import { IPost, IPagedResults } from '../shared/interfaces';
import { FilterService } from '../core/services/filter.service';
import { LoggerService } from '../core/services/logger.service';

@Component({
  selector: 'cm-posts',
  templateUrl: './posts.component.html'
})
export class PostsComponent implements OnInit {

  title: string;
  filterText: string;
  posts: IPost[] = [];
  filteredPosts: IPost[] = [];
  displayMode: DisplayModeEnum;
  displayModeEnum = DisplayModeEnum;
  totalRecords = 0;
  pageSize = 10;

  constructor(private dataService: DataService,
    private filterService: FilterService,
    private logger: LoggerService) { }

  ngOnInit() {
    this.title = 'Posts';
    this.filterText = 'Filter Posts:';
    this.displayMode = DisplayModeEnum.Card;

    this.getPostsPage(1);
  }

  changeDisplayMode(mode: DisplayModeEnum) {
      this.displayMode = mode;
  }

  pageChanged(page: number) {
    this.getPostsPage(page);
  }

  getPostsPage(page: number) {
    this.dataService.getPostsPage((page - 1), this.pageSize)
        .subscribe((response: IPagedResults<IPost[]>)  => {
          this.posts = this.filteredPosts = response.results;
          this.totalRecords = response.totalRecords;
        },
        (err: any) => this.logger.log(err),
        () => this.logger.log('getPostsPage() retrieved posts for page: ' + page));
  }

  filterChanged(data: string) {
    if (data && this.posts) {
        data = data.toUpperCase();
        const props = ['Title', 'Author'];
        this.filteredPosts = this.filterService.filter<IPost>(this.posts, data, props);
    } else {
      this.filteredPosts = this.posts;
    }
  }
}

enum DisplayModeEnum {
  Card = 0,
  Grid = 1,
  Map = 2
}
