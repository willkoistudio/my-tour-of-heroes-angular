/* SERVICE CONTROLE D'UPLOAD DE FICHIERS MULTIPLE - W.KRIEG */

import { Injectable } from '@angular/core';

@Injectable()
export class FileManagerService {

  constructor() { }

  // check size img
  public goodFileSize(size: number): boolean {
      let accept = false;
      const sizeAuth = 4194304; // Max 4Mo par image
      if (size <= sizeAuth) { accept = true; }
      return accept;
  }
  // check size video
  public goodFileSizeWithVideo(size: number): boolean {
      let  accept = false;
      const sizeAuth = 15728640; // Max 15Mo
      if (size <= sizeAuth) {accept = true; }
      return accept;
  }
  // get size extension
  public getFileExtension(filename: string): string {
      const parts = filename.split('.');
      return parts[parts.length - 1];
  }
  // check extension
  public acceptFileExtension(extension: string): boolean {
      let accept = false;
      switch (extension.toLowerCase()) {
          case 'jpg':
          case 'jpeg':
          case 'png':
        //   case 'bmp':
        //   case 'gif':

              accept = true;
      }
      return accept;
  }
  // check extension video
  public acceptFileExtensionVideo(extension: string): boolean {
      let accept = false;
      switch (extension.toLowerCase()) {
          case 'mp4':
              accept = true;
      }
      return accept;
  }

  public fileChange(event: any): any[] {
      const arrayFile = [];
      arrayFile['files'] = [];
      arrayFile['errors'] = [];
      if (event.target.files.length) {
          for (let i = 0; i < event.target.files.length; i++) {
              const data = event.target.files[i];
              if (this.acceptFileExtension(this.getFileExtension(data.name))) {
                  if (this.goodFileSize(+data.size)) {
                      // const file = new FormData();
                      arrayFile['files'].push(event.target.files[i]);
                  } else {
                      arrayFile['errors'].push('Le fichier ' + data.name + ' est trop volumineux, max 4Mo');
                  }
              } else {
                  // tslint:disable-next-line:max-line-length
                  arrayFile['errors'].push('Le fichier ' + data.name + ' n\'est pas autorisé, extensions acceptées : jpg, jpeg, png');
              }
          }
          if (arrayFile['errors'].length) { // Si il y a des erreurs
              arrayFile['files'] = []; // On ecrase le tableau car l'ensemble des document n'est pas valide;
          }
          return arrayFile;
      } else {
          arrayFile['errors'].push('Aucun fichier sélectionné');
      }
      return arrayFile;
  }

  public fileChangeMultipleFormat(event: any, allowed_extensions: string [] = null): any[] {
      const arrayFile = [];
      arrayFile['files'] = [];
      arrayFile['errors'] = [];

      let allowedExtensionsString: String = 'jpg, jpeg, png, bmp, gif, mp4';
      if (allowed_extensions) {
          allowedExtensionsString = allowed_extensions.join(', ');
      }

      if (event.target.files.length) {
          for (let i = 0; i < event.target.files.length; i++) {
              const data = event.target.files[i];
              const extension: string = this.getFileExtension(data.name);
              let extensionOk: Boolean = false;

              if (allowed_extensions) {
                  extensionOk = allowed_extensions.includes(extension);
              } else {
                  extensionOk = (this.acceptFileExtension(extension) || this.acceptFileExtensionVideo(extension));
              }

              if (extensionOk) {
                  if (this.goodFileSizeWithVideo(+data.size)) {
                      // const file = new FormData();
                      arrayFile['files'].push(event.target.files[i]);
                  } else {
                      arrayFile['errors'].push('Le fichier ' + data.name + ' est trop volumineux, max 15Mo');
                  }
              } else {
                  // tslint:disable-next-line:max-line-length
                  arrayFile['errors'].push('Le fichier ' + data.name + ' n\'est pas autorisé, extensions acceptées : ' + allowedExtensionsString);
              }
          }
          if (arrayFile['errors'].length) { // Si il y a des erreurs
              arrayFile['files'] = []; // On ecrase le tableau car l'ensemble des document n'est pas valide;
          }
          return arrayFile;
      } else {
          arrayFile['errors'].push('Aucun fichier sélectionné');
      }
      return arrayFile;
  }

  public getBase64(file) {
      return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
      });
   }

  public generatePreview(event: any): string[] {
      const base64: string[] =  [];
      for (let i = 0 ; i < event.target.files.length; i++) {
          this.getBase64(event.target.files[i]).then( (data: string) => base64.push(data));
      }
      return base64;
  }
}
