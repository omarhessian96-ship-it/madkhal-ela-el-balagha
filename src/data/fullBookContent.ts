import { BookPart } from './bookIntroduction';
import { BOOK_INTRODUCTION } from './bookIntroduction';
import { BOOK_CHAPTER_1 } from './bookChapter1';
import { BOOK_CHAPTER_2 } from './bookChapter2';
import { BOOK_CHAPTER_3 } from './bookChapter3';
import { BOOK_CHAPTER_4 } from './bookChapter4';
import { BOOK_CHAPTER_5 } from './bookChapter5';
import { BOOK_CHAPTER_6 } from './bookChapter6';
import { BOOK_REFERENCES, ReferenceItem } from './bookReferences';

export {
  BOOK_INTRODUCTION,
  BOOK_CHAPTER_1,
  BOOK_CHAPTER_2,
  BOOK_CHAPTER_3,
  BOOK_CHAPTER_4,
  BOOK_CHAPTER_5,
  BOOK_CHAPTER_6,
  BOOK_REFERENCES,
};

export type { BookPart, ReferenceItem };

export const ALL_BOOK_PARTS: BookPart[] = [
  BOOK_INTRODUCTION,
  BOOK_CHAPTER_1,
  BOOK_CHAPTER_2,
  BOOK_CHAPTER_3,
  BOOK_CHAPTER_4,
  BOOK_CHAPTER_5,
  BOOK_CHAPTER_6,
];
