import { Component, OnInit, Input } from '@angular/core';
import {Location} from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

import { Hero } from '../../../class/hero';
import { HeroService } from '../../../services/hero.service';

import { Observable } from 'rxjs/Observable';
import { LocalStorage } from 'ngx-webstorage';
import { FileManagerService } from '../../../services/file-manager.service';

@Component({
  selector: 'app-hero-infos',
  templateUrl: './hero-infos.component.html',
  styleUrls: ['./hero-infos.component.scss'],
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
export class HeroInfosComponent implements OnInit {
  private sub: any;
  hero$: Observable<Hero>;

  @LocalStorage('user')
  storage;

  isAdmin: boolean = this.storage.role === 'admin' ? true : false;
  edit: Boolean = false;
  preview: any;
  fileToUpload: File = null;
  errorsFile: String[];
  txtFile: String = 'Click here to update avatar';

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private fileManagerService: FileManagerService
  ) {}

  ngOnInit() {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.hero$ = this.heroService.getHero(id);
  }
  goBack() {
    this.location.back();
  }
  save(hero: Hero): void {
    hero.avatar = !this.preview ? hero.avatar : this.preview;
    console.log('avatar', hero.avatar);
    this.heroService.updateHero(hero)
    .subscribe(() => this.goBack());
  }
  deleteHero(hero: Hero): void {
    this.heroService.deleteHero(hero).subscribe();
    this.goBack();
  }
  onEdit(hero: Hero) {
    this.edit = !this.edit;
    this.preview = hero.avatar;
  }

  addFile(event) {
    const files = event.srcElement.files;
    this.fileToUpload = event.target.files.item(0);
    this.errorsFile = this.fileManagerService.fileChange(event)['errors']; // check errors
    this.txtFile = files[0].name; // display file name
    this.preview = this.fileManagerService.generatePreview(event); // generate preview
  }
}
