import { Injectable } from '@angular/core';

@Injectable()
export class SearchService {

  constructor() { }

  public research(data: any[], research: string): any[] {
    let rows = [...data];
    if (research === undefined || research === null || research === '') {
      return rows;
    } else {
      const searchTerms = research.split(' ');
      for (let i = 0; i < searchTerms.length; i++) {
        rows = this.loopSearch(searchTerms[i], rows);
      }
      return rows;
    }
  }

  loopSearch(term: string, data) {
    let rows = [...data];
    rows = rows.filter( item => {
      let conditionResult = false; // Valeurs initial
      // tslint:disable-next-line:forin
      for (const prop in item) {
        let row = item[prop];
        if (typeof row  === 'object') {
          row = JSON.stringify(row);
        }
        if (row.toString().toLowerCase().indexOf(term.toLowerCase()) !== -1) { conditionResult = true; }
      }
      return conditionResult;
    });
    return rows;
  }

}
