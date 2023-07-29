import { Component, OnInit, Input } from '@angular/core';
import {Location} from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

import { BlogService } from '../../../services/blog.service';
import { Observable } from 'rxjs/Observable';
import { LocalStorage } from 'ngx-webstorage';
import { Article } from '../../../class/article';
import { UserService } from '../../../services/user.service';
import { User } from '../../../class/user';
import { FileManagerService } from '../../../services/file-manager.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
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
export class ArticleDetailComponent implements OnInit {
  private sub: any;
  article$: Observable<Article>;
  users$: Observable<User[]>;
  comments: Object[];
  @LocalStorage('user')
  storage;

  isAdmin: boolean = this.storage.role === 'admin' ? true : false;
  edit: Boolean = false;
  preview: any;
  fileToUpload: File = null;
  errorsFile: String[];
  txtFile: String = 'Click here to update the picture below';
  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private location: Location,
    private users: UserService,
    private fileManagerService: FileManagerService

  ) {}

  ngOnInit() {
    this.getArticle();
    this.getUsers();
  }

  getArticle(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.article$ = this.blogService.getArticle(id);
  }
  getUsers() {
    this.users$ = this.users.getAll();
  }
  goBack() {
    this.location.back();
  }
  onEdit(article) {
    this.edit = !this.edit;
    this.preview = article.picture ;
  }
  deleteArticle(article: Article): void {
    this.blogService.deleteArticle(article).subscribe();
    this.goBack();
  }
  addFile(event) {
    const files = event.srcElement.files;
    this.fileToUpload = event.target.files.item(0);
    this.errorsFile = this.fileManagerService.fileChange(event)['errors']; // check errors
    this.txtFile = files[0].name; // display file name
    this.preview = this.fileManagerService.generatePreview(event); // generate preview
  }
  save(article: Article): void {
    article.picture = !this.preview ? article.picture : this.preview;
    this.blogService.updateArticle(article)
    .subscribe(() => this.goBack());
  }
}
