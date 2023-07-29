// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

// Plugins
import { AngularFontAwesomeModule } from 'angular-font-awesome';

// Components
import { AddArticleComponent } from './add-article/add-article.component';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { CommentComponent } from './comment/comment.component';

// Services
import { BlogService } from '../../services/blog.service';

// Route
import { blogRouting } from './blog-routing';
import { NgMasonryGridModule } from 'ng-masonry-grid';

@NgModule({
  imports: [
    CommonModule,
    blogRouting,
    AngularFontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgMasonryGridModule,
  ],
  declarations: [
    AddArticleComponent,
    ArticlesComponent,
    ArticleDetailComponent,
    CommentComponent
  ],
  exports: [
    AddArticleComponent,
    ArticlesComponent,
    ArticleDetailComponent,
    CommentComponent,
  ],
  providers: [
    BlogService,
  ]
})
export class BlogModule { }
