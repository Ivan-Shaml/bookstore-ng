import CreateOwnershipDto from './create-ownership.dto';
import {Book} from './book';

export default interface ReadOwnership extends CreateOwnershipDto {
  id: number;
  book: Book;
}
