// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Routes
import { mainRouting } from './app-routing.module';
import { heroRouting } from './components/hero/hero-routing';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/navigation/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { CheckLoginComponent } from './components/login/check-login/check-login.component';
import { FooterComponent } from './components/navigation/footer/footer.component';
import { HeroModule } from './components/hero/hero.module';
import { MessagesComponent } from './components/messages/messages.component';

// Services
import { LoginService } from './services/login.service';
import { CheckLoginService } from './services/check-login.service';
import { UserService } from './services/user.service';
import { MessageService } from './services/message.service';
import { FileManagerService } from './services/file-manager.service';
import { SearchService } from './services/search.service';
import { HeroService } from './services/hero.service';

// Directives
// import { FileInputValueAccessorDirective } from './directives/file-input-value-accessor.directive';
// import { ErrorMsgFormDirective } from './directives/error-msg-form.directive';
// import { ErrorTypeFormDirective } from './directives/error-type-form.directive';

// Others
import { AuthGuard } from './guards/auth.guard';

// Pipe
import { ShufflePipe } from './pipes/shuffle.pipe';

// Plugins Externes
import { Ng2Webstorage } from 'ngx-webstorage';
import { BlockUIModule } from 'ng-block-ui';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BlogModule } from './components/blog/blog.module';
import { SharedModule } from './shared/shared.module';
// import { ExcerptPipe } from './pipes/excerpt.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    LoginComponent,
    CheckLoginComponent,
    ShufflePipe,
    FooterComponent
    // ExcerptPipe
    ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    mainRouting,
    HttpClientModule,
    ReactiveFormsModule,
    BlockUIModule,
    Ng2Webstorage,
    CommonModule,
    AngularFontAwesomeModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    heroRouting,
    HeroModule,
    BlogModule,
    SharedModule
    // Ng2Webstorage.forRoot({ prefix: 'custom', separator: '.', caseSensitive:true })
    // The forRoot method allows to configure the prefix, the separator and the caseSensitive option used by the library
    // Default values:
    // prefix: "ng2-webstorage"
    // separator: "|"
    // caseSensitive: false
  ],
  providers: [
    LoginService,
    AuthGuard,
    CheckLoginService,
    UserService,
    HeroService,
    AuthGuard,
    MessageService,
    FileManagerService,
    SearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
