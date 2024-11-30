import {Category} from './category';

export interface Book {
  id: string,
  title: string,
  author: string,
  numberOfPages: number,
  description: string,
  imageUrl: string,
  rating: number,
  category?: Category,
}


