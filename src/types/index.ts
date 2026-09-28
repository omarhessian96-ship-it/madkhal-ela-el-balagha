export type TabType = 'full_book' | 'summary' | 'exam' | 'comparisons' | 'scholars' | 'shawahid' | 'terms';

export interface SimplifiedTerm {
  term: string;
  originalTextSnippet?: string;
  simplifiedMeaning: string;
  exampleOrClarification: string;
}

export interface TextBlockItem {
  id: string;
  originalText: string; // نص الكلام الأصلي بالكتاب
  simplifiedExplanation: string; // نص الشرح وتفكيك العبارة
  keywords: string[]; // كلمات مفتاحية لتسهيل الحفظ
  academicNotes?: string; // لفتة بيانية أو امتحانية
}

export interface ChapterSection {
  id: string;
  title: string;
  subheading?: string;
  content?: string[];
  textBlocks: TextBlockItem[]; // نص الكلام + الشرح تحته + الكلمات المفتاحية
  keyTakeaways: string[];
  simplifiedTerms?: SimplifiedTerm[];
  scholarsMentioned?: string[];
  doctorFocusNotes?: string[];
}

export interface Chapter {
  id: number;
  title: string;
  pages: string;
  brief: string;
  sections: ChapterSection[];
  shawahidHighlights: {
    text: string;
    source: string;
    rhetoricalPoint: string;
    type: 'quran' | 'hadith' | 'poetry' | 'prose';
  }[];
  questions: ExamQuestion[];
}

export interface Scholar {
  id: string;
  name: string;
  deathYear?: string;
  century?: string;
  books: string[];
  school: string;
  mainStance: string;
  detailedRole: string;
  keyQuotes: string[];
  examSignificance: string;
}

export interface ComparisonItem {
  id: string;
  title: string;
  category: string;
  sideA: {
    name: string;
    points: string[];
    scholarsOrExamples?: string;
  };
  sideB: {
    name: string;
    points: string[];
    scholarsOrExamples?: string;
  };
  synthesis: string;
  doctorExamTip: string;
}

export interface Shahid {
  id: string;
  text: string;
  author: string;
  chapterId: number;
  chapterTitle: string;
  category: 'تنافر حروف' | 'مخالفة قياس' | 'غرابة' | 'تنافر كلمات' | 'ضعف تأليف' | 'تعقيد لفظي' | 'تعقيد معنوي' | 'فصاحة وإعجاز' | 'بديع وبلاغة';
  diagnosis: string;
  defectOrBeautyExplanation: string;
  doctorQuestionPattern: string;
}

export type QuestionType = 'mcq' | 'true_false' | 'taaleel' | 'essay' | 'extract';

export interface ExamQuestion {
  id: string;
  chapterId: number;
  type: QuestionType;
  question: string;
  options?: string[]; // for MCQ
  correctAnswerIndex?: number; // for MCQ
  isTrue?: boolean; // for True/False
  correctionIfFalse?: string; // for True/False
  modelAnswer: string;
  rubricPoints?: { point: string; mark: number }[]; // for Essay/Analysis
  totalMarks?: number;
  explanation: string;
  difficulty: 'مباشر' | 'متوسط' | 'دقيق ومتقدم' | 'سؤال امتحان متوقع';
  doctorAdvice?: string;
}
