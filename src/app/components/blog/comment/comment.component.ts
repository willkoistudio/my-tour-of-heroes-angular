import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '../../../class/comment';
import { LocalStorage } from 'ngx-webstorage';
import { BlogService } from '../../../services/blog.service';
import { Observable } from 'rxjs/Observable';
import { Article } from '../../../class/article';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @LocalStorage('user')
  storage;

  @Input() article: Article;

  newComment: Comment;
  txtComment: string;
  // article$: Observable<Article>;
  isAdmin: Boolean = this.storage.role === 'admin' ? true : false;

  constructor(private blogService: BlogService, private route: ActivatedRoute) { }

  ngOnInit() {
    // this.getArticle();
  }

  // getArticle(): void {
  //   const id = +this.route.snapshot.paramMap.get('id');
  //   this.article$ = this.blogService.getArticle(id);
  // }

  createComment() {
    this.newComment = {
      author: this.storage.name,
      dateCreated: new Date().toLocaleDateString('fr-FR'),
      message: this.txtComment
    };
  }
  sendCom(article) {
    this.createComment();
    if (!this.newComment.message) {
      return;
    } else {
      article.comments.push(this.newComment);
      this.blogService.updateArticle(article)
      .subscribe(() => this.txtComment = '');
    }
  }

  delComment(article, i): void {
    article.comments.splice(i, 1);
    this.blogService.updateArticle(article)
    .subscribe();
  }
}
