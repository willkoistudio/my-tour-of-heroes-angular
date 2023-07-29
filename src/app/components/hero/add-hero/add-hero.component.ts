import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { FormsModule, PatternValidator, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Hero } from '../../../class/hero';
import { HeroService } from '../../../services/hero.service';
import { FileManagerService } from '../../../services/file-manager.service';
import { trigger, transition, style, animate } from '@angular/animations';
@Component({
  selector: 'app-add-hero',
  templateUrl: './add-hero.component.html',
  styleUrls: ['./add-hero.component.scss'],
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
export class AddHeroComponent implements OnInit {

  heroes: Hero[];
  hero: Hero;
  families: String[] = [
    'U.A. High Staff',
    'Class 1-A',
    'Class 1-B',
    'Class 3-B',
    'Other Students',
    'Pro Heroes',
    'Former Pro Heroes',
    'Villains',
    'Vigilante',
    'Police Force',
    'Civilians'
  ];
  txtFile: String = 'Choose file';
  errorsFile: String[];
  preview: any;
  heroForm: FormGroup; // HeroForm is of type FormGroup
  fileToUpload: File = null;
  formDesc: FormControl;

  constructor(
    private location: Location,
    private heroService: HeroService,
    private fb: FormBuilder,
    private fileManagerService: FileManagerService
  ) {
    this.buildForm(); // inject FormBuilder
    this.formDesc = <FormControl>this.heroForm.get('description');
  }

  ngOnInit() {
    this.hero = {
      name: null,
      nickName: null,
      avatar: File = null,
      family: null,
      alter: null,
      description: null
    };
    this.heroForm.controls.name.valueChanges.subscribe((v) => {
      this.hero.avatar = v;
    });
  }

  // Formulaire
  buildForm() {
    this.heroForm = this.fb.group({
    name: ['', Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern('^[a-zA-Z0-9 ]+$')])],
    nickName: ['', Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern('^[a-zA-Z0-9 ]+$')])],
    avatar: [null, Validators.required],
    family: ['', Validators.compose([Validators.required])],
    alter: ['', Validators.compose([Validators.required, Validators.maxLength(20)])],
    description: ['', Validators.compose([Validators.required, Validators.minLength(100)])]
    });
  }
  changeFamily(event) {
    if (this.hero.family === 'undefined') {
      // this.hero.family = undefined;
      console.log('fem', this.hero);
    }
  }
  addFile(event) {
    const files = event.srcElement.files;
    this.fileToUpload = event.target.files.item(0);
    this.errorsFile = this.fileManagerService.fileChange(event)['errors']; // check errors
    this.txtFile = files[0].name; // display file name
    this.preview = this.fileManagerService.generatePreview(event); // generate preview
    this.hero.avatar = this.preview;

  }
  addHero(): void {
    if (this.hero === null) {
      console.log('Form not valid  ');
      return;
    }
    this.getHeroes();
    this.heroService.addHero(
      {
        name: this.hero.name,
        nickName: this.hero.nickName,
        avatar: this.hero.avatar,
        family: this.hero.family,
        alter: this.hero.alter,
        description: this.hero.description
      } as Hero)
        .subscribe(hero => {
          this.heroes.push(hero);
        });
    this.getHeroes();
    this.goBack();
  }
  // vue methods
  goBack() {
    this.location.back();
  }
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }
}
