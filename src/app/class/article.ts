export interface Article {
    id?: number;
    author: string;
    dateCreated: string;
    picture: string;
    title: string;
    content: string;
    comments: Comment[];
  }
