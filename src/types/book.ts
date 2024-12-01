import {Category} from './category';

export interface Book {
  id: number,
  title: string,
  author: string,
  numberOfPages: number,
  description: string,
  imageUrl: string,
  rating: number,
  yearOfPublishing: number,
  categoryId?: number;
  category?: Category,
}


