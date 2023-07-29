import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { FormsModule, PatternValidator, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Article } from '../../../class/article';
import { BlogService } from '../../../services/blog.service';
import { FileManagerService } from '../../../services/file-manager.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { LocalStorage } from 'ngx-webstorage';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss'],
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
export class AddArticleComponent implements OnInit {

  article: Article;
  articles: Article[];
  txtFile: String = 'Choose file';
  errorsFile: String[];
  preview: any;
  articleForm: FormGroup; // ArticleForm is of type FormGroup
  fileToUpload: File = null;
  formMsg: FormControl;

  @LocalStorage('user')
  storage;

  constructor(
    private location: Location,
    private blogService: BlogService,
    private fb: FormBuilder,
    private fileManagerService: FileManagerService
  ) {
    this.buildForm(); // inject FormBuilder
    this.formMsg = <FormControl>this.articleForm.get('content');
  }
  ngOnInit() {
    this.article = {
      title: null,
      author: this.storage.name,
      picture: File = null,
      content: null,
      dateCreated: new Date().toLocaleDateString('fr-FR'),
      comments: []
    };
    this.articleForm.controls.title.valueChanges.subscribe((v) => {
      this.article.picture = v;
    });
    console.log('aF', this.articleForm);
  }

  // Formulaire
  buildForm() {
    this.articleForm = this.fb.group({
    // tslint:disable-next-line:max-line-length
    title: ['', Validators.compose([Validators.required, Validators.maxLength(200), Validators.pattern('^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ!?$€:;,=+()\' ]+$')])],
      picture: [null, Validators.required],
      content: ['', Validators.compose([Validators.required, Validators.minLength(100)])]
    });
  }
  addFile(event) {
    const files = event.srcElement.files;
    this.fileToUpload = event.target.files.item(0);
    this.errorsFile = this.fileManagerService.fileChange(event)['errors']; // check errors
    this.txtFile = files[0].name; // display file name
    this.preview = this.fileManagerService.generatePreview(event); // generate preview
    this.article.picture = this.preview;
  }
  addArticle(): void {
    if (this.article === null) {
      console.log('Form not valid');
      return;
    }
    this.getArticles();
    this.blogService.addArticle(
      {
        title: this.article.title,
        author: this.article.author,
        picture: this.article.picture,
        content: this.article.content,
        dateCreated: this.article.dateCreated,
        comments: this.article.comments
      } as Article)
        .subscribe(article => {
          this.articles.push(article);
        });
    this.getArticles();
    this.goBack();
  }
  // vue methods
  goBack() {
    this.location.back();
  }
  getArticles(): void {
    this.blogService.getArticles()
      .subscribe(articles => this.articles = articles);
  }
}
