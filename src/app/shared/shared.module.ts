import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Components
import { MessagesComponent } from '../components/messages/messages.component';

// Services
import { MessageService } from '../services/message.service';
import { FileManagerService } from '../services/file-manager.service';
import { SearchService } from '../services/search.service';
import { AuthGuard } from '../guards/auth.guard';
import { HeroService } from '../services/hero.service';

// Plugins
import { AngularFontAwesomeModule } from 'angular-font-awesome';

// Directives
import { FileInputValueAccessorDirective } from '../directives/file-input-value-accessor.directive';
import { ErrorMsgFormDirective } from '../directives/error-msg-form.directive';
import { ErrorTypeFormDirective } from '../directives/error-type-form.directive';

// Pipe
import { ExcerptPipe } from '../pipes/excerpt.pipe';
import { SortPipe } from '../pipes/sort.pipe';


@NgModule({
  imports: [
    CommonModule,
    AngularFontAwesomeModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    MessagesComponent,
    FileInputValueAccessorDirective,
    ErrorMsgFormDirective,
    ErrorTypeFormDirective,
    ExcerptPipe,
    SortPipe
  ],
  exports: [
    MessagesComponent,
    FileInputValueAccessorDirective,
    ErrorMsgFormDirective,
    ErrorTypeFormDirective,
    ExcerptPipe,
    SortPipe
  ],
  providers: [
    AuthGuard,
    MessageService,
    FileManagerService,
    SearchService,
    HeroService
  ]
})
export class SharedModule { }
