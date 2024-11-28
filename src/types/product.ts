import {Category} from './category';

export interface Product {
  id: string,
  title: string,
  author: string,
  numberOfPages: number,
  description: string,
  imageUrl: string,
  rating: number,
  category: Category,
}


