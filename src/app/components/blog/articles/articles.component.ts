import { Component, OnInit } from '@angular/core';
import { Article } from '../../../class/article';

import { BlogService } from '../../../services/blog.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';
import { debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import { SearchService } from '../../../services/search.service';
import { Masonry, MasonryGridItem } from 'ng-masonry-grid'; // import necessary datatypes

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  animations: [
    trigger(
      'fadeRight', [
        transition(':enter', [
          style({transform: 'translateX(100%)', opacity: 0}),
          animate('500ms', style({transform: 'translateY(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('300ms', style({transform: 'translateX(100%)', opacity: 0}))
        ])
      ]
    )
  ]
})
export class ArticlesComponent implements OnInit {

  articles: Article[]; // array des héros
  filteredArticles: Article[]; // array des héros filtrés
  listArticles: Article[]; // array des héros conditionné si filtrés ou normal
  selectedArticle: Article;
  msnry: Masonry;

  constructor(private blogService: BlogService, private searchService: SearchService) {}

  onSelect(article: Article): void {
    this.selectedArticle !== article ? this.selectedArticle = article : this.selectedArticle = undefined;
  }

  ngOnInit(): void {
      this.getArticles();
  }
  onNgMasonryInit($event: Masonry) {
    this.msnry = $event;
  }
  getArticles(): void {
    this.blogService.getArticles()
    .subscribe(articles => this.articles = articles);
  }
  _articles() {
    if (!this.filteredArticles) {
      this.listArticles = this.articles;
      return this.listArticles;
    } else {
      this.listArticles = this.filteredArticles;
      return this.listArticles;
    }
  }
  onChange(value) {
      this.filteredArticles = this.searchService.research(this.articles, value);
      this.msnry.layout();
      this.msnry.reloadItems();
  }
  reset() {
    this.filteredArticles = this.searchService.research(this.articles, '');
    this.msnry.reloadItems();
  }

}
