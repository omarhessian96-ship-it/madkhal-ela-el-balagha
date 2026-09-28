import React, { useState } from 'react';
import { ExamQuestion, QuestionType } from '../types';
import { ALL_EXAM_QUESTIONS, MOCK_EXAM_METADATA, PROFESSOR_EXAM_TIPS } from '../data/examQuestionsData';
import { CHAPTER_EXERCISES_DATA } from '../data/chapterExercisesData';
import {
  FileCheck2,
  HelpCircle,
  Award,
  CheckCircle2,
  XCircle,
  Bookmark,
  RefreshCw,
  Eye,
  AlertTriangle,
  Lightbulb,
  Printer,
  BookOpen,
  GraduationCap,
  Sparkles,
  ChevronDown,
  ChevronUp,
  AlertCircle
} from 'lucide-react';

interface ExamViewProps {
  fontSize: number;
  selectedChapterForQuiz: number | null;
  setSelectedChapterForQuiz: (chapterId: number | null) => void;
  bookmarkedIds: string[];
  toggleBookmark: (id: string) => void;
  showBookmarksOnly: boolean;
}

export const ExamView: React.FC<ExamViewProps> = ({
  fontSize,
  selectedChapterForQuiz,
  setSelectedChapterForQuiz,
  bookmarkedIds,
  toggleBookmark,
  showBookmarksOnly,
}) => {
  const [examSubTab, setExamSubTab] = useState<'mock_exam' | 'bank' | 'chapter_exercises' | 'tips'>('bank');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterChapter, setFilterChapter] = useState<number>(selectedChapterForQuiz || 0);
  const [showChapterExercisesInBank, setShowChapterExercisesInBank] = useState<boolean>(true);

  // Interactive Quiz state
  const [userAnswers, setUserAnswers] = useState<Record<string, number | boolean>>({});
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});

  // Mock Exam state
  const [showMockModelAnswers, setShowMockModelAnswers] = useState(false);

  // Sync if selectedChapterForQuiz changed
  React.useEffect(() => {
    if (selectedChapterForQuiz) {
      setFilterChapter(selectedChapterForQuiz);
      setExamSubTab('bank');
    }
  }, [selectedChapterForQuiz]);

  const handleSelectOption = (questionId: string, optionIdx: number) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionIdx,
    }));
  };

  const handleSelectTrueFalse = (questionId: string, value: boolean) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const toggleRevealAnswer = (questionId: string) => {
    setRevealedAnswers((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const resetQuiz = () => {
    setUserAnswers({});
    setRevealedAnswers({});
  };

  // Filter questions
  const displayedQuestions = ALL_EXAM_QUESTIONS.filter((q) => {
    if (showBookmarksOnly && !bookmarkedIds.includes(q.id)) return false;
    if (filterChapter !== 0 && q.chapterId !== filterChapter) return false;
    if (filterType !== 'all' && q.type !== filterType) return false;
    return true;
  });

  // Calculate score for MCQs & True/False that user answered
  const objectiveQuestions = displayedQuestions.filter(
    (q) => q.type === 'mcq' || q.type === 'true_false'
  );
  let correctCount = 0;
  let answeredCount = 0;

  objectiveQuestions.forEach((q) => {
    if (userAnswers[q.id] !== undefined) {
      answeredCount++;
      if (q.type === 'mcq' && userAnswers[q.id] === q.correctAnswerIndex) {
        correctCount++;
      } else if (q.type === 'true_false' && userAnswers[q.id] === q.isTrue) {
        correctCount++;
      }
    }
  });

  return (
    <div className="space-y-6">
      {/* Student Creator & Course Banner */}
      <div className="bg-linear-to-r from-stone-900 via-stone-850 to-stone-900 text-white p-3.5 sm:p-4 rounded-xl shadow-xs border border-stone-700 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
            <GraduationCap className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-white flex items-center gap-2">
              <span>منصة بنك الأسئلة والتدريبات الامتحانية المقننة</span>
              <span className="bg-amber-400 text-stone-950 text-[10px] font-black px-2 py-0.5 rounded-full">
                صنع الطالب: عمر حسين محمد
              </span>
            </div>
            <p className="text-[11px] text-stone-300">
              شامل لجميع أسئلة وأنشطة الكتاب المقرر + تدريبات وامتحانات أ.د. أحمد سعد محمد سعد (كلية التربية - جامعة عين شمس)
            </p>
          </div>
        </div>
      </div>

      {/* Sub Tabs Selector */}
      <div className="bg-white p-2 rounded-xl border border-stone-200 shadow-sm flex items-center justify-between gap-2 overflow-x-auto">
        <div className="flex items-center gap-1.5 min-w-max">
          <button
            onClick={() => setExamSubTab('bank')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              examSubTab === 'bank'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>بنك الأسئلة التفاعلي الشامل</span>
            <span className="text-[10px] bg-stone-700 text-white px-1.5 py-0.2 rounded-full">
              {ALL_EXAM_QUESTIONS.length}
            </span>
          </button>

          <button
            onClick={() => setExamSubTab('chapter_exercises')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              examSubTab === 'chapter_exercises'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-300" />
            <span>أنشطة وتدريبات الكتاب لكل فصل</span>
            <span className="text-[10px] bg-amber-800 text-white px-1.5 py-0.2 rounded-full">
              {CHAPTER_EXERCISES_DATA.length}
            </span>
          </button>

          <button
            onClick={() => setExamSubTab('mock_exam')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              examSubTab === 'mock_exam'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>ورقة الامتحان النهائي الفصلي (60 درجة)</span>
          </button>

          <button
            onClick={() => setExamSubTab('tips')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              examSubTab === 'tips'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            <span>توجيهات أستاذ المادة</span>
          </button>
        </div>

        {examSubTab === 'bank' && answeredCount > 0 && (
          <button
            onClick={resetQuiz}
            className="text-stone-500 hover:text-stone-800 text-xs flex items-center gap-1 shrink-0 px-2 py-1 rounded hover:bg-stone-100"
          >
            <RefreshCw className="w-3 h-3" />
            <span className="hidden sm:inline">إعادة تعيين</span>
          </button>
        )}
      </div>

      {/* VIEW 1: INTERACTIVE QUESTION BANK */}
      {examSubTab === 'bank' && (
        <div className="space-y-4">
          {/* Filters Bar */}
          <div className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-sm space-y-3">
            {/* Filter by Chapter */}
            <div>
              <div className="text-[11px] font-bold text-stone-500 mb-1.5">
                تصفية حسب الفصل:
              </div>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                <button
                  onClick={() => {
                    setFilterChapter(0);
                    setSelectedChapterForQuiz(null);
                  }}
                  className={`px-2.5 py-1 text-xs rounded-md whitespace-nowrap font-medium transition-colors ${
                    filterChapter === 0
                      ? 'bg-stone-900 text-white'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  جميع الفصول
                </button>
                {[1, 2, 3, 4, 5, 6].map((chNum) => (
                  <button
                    key={chNum}
                    onClick={() => {
                      setFilterChapter(chNum);
                      setSelectedChapterForQuiz(chNum);
                    }}
                    className={`px-2.5 py-1 text-xs rounded-md whitespace-nowrap font-medium transition-colors ${
                      filterChapter === chNum
                        ? 'bg-amber-600 text-white'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    الفصل {chNum}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter by Type */}
            <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1 overflow-x-auto">
                <span className="text-[11px] font-bold text-stone-500 ml-1">النوع:</span>
                {[
                  { id: 'all', label: 'الكل' },
                  { id: 'mcq', label: 'اختيار من متعدد' },
                  { id: 'true_false', label: 'صح وخطأ مع التعليل' },
                  { id: 'taaleel', label: 'علل وبم تفسر' },
                  { id: 'essay', label: 'مقالي وتحليلي' },
                ].map((typeItem) => (
                  <button
                    key={typeItem.id}
                    onClick={() => setFilterType(typeItem.id)}
                    className={`px-2.5 py-1 text-xs rounded-md whitespace-nowrap font-medium transition-colors ${
                      filterType === typeItem.id
                        ? 'bg-stone-800 text-white'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {typeItem.label}
                  </button>
                ))}
              </div>

              {/* Score indicator */}
              {objectiveQuestions.length > 0 && (
                <div className="text-xs text-stone-600 font-semibold bg-stone-100 px-2.5 py-1 rounded-md">
                  النتيجة التفاعلية: <span className="text-amber-700 font-bold">{correctCount}</span> من{' '}
                  <span>{answeredCount}</span> تمت إجابته
                </div>
              )}
            </div>
          </div>

          {/* Chapter Activities Highlight Banner (When a chapter is selected) */}
          {filterChapter > 0 && (
            (() => {
              const chapterExs = CHAPTER_EXERCISES_DATA.filter((ex) => ex.chapterId === filterChapter);
              if (chapterExs.length === 0) return null;
              return (
                <div className="bg-amber-50/90 border border-amber-200 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-amber-700 shrink-0" />
                      <h4 className="text-xs sm:text-sm font-bold text-amber-950">
                        أنشطة وتدريبات الكتاب المقرر المعتمد الخاصة بالفصل {filterChapter} ({chapterExs.length} أنشطة محلولة بالنقاط)
                      </h4>
                    </div>
                    <button
                      onClick={() => setShowChapterExercisesInBank(!showChapterExercisesInBank)}
                      className="text-xs text-amber-800 hover:text-amber-950 font-bold flex items-center gap-1 shrink-0"
                    >
                      <span>{showChapterExercisesInBank ? 'إخفاء أنشطة الكتاب' : 'عرض أنشطة الكتاب'}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform ${showChapterExercisesInBank ? 'rotate-180' : ''}`}
                      />
                    </button>
                  </div>

                  {showChapterExercisesInBank && (
                    <div className="space-y-3 pt-2 border-t border-amber-200/80">
                      {chapterExs.map((ex, exIdx) => (
                        <div
                          key={ex.id}
                          className="bg-white p-3.5 rounded-lg border border-amber-200/90 space-y-2 text-xs"
                        >
                          <div className="font-bold text-stone-900 flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-amber-600 text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                              {exIdx + 1}
                            </span>
                            <span>{ex.title}</span>
                          </div>
                          <div className="text-stone-700 whitespace-pre-line leading-relaxed pr-7">
                            {ex.questionText}
                          </div>
                          <div className="bg-stone-50 p-3 rounded-md border border-stone-200 space-y-1">
                            <div className="font-bold text-emerald-800 flex items-center gap-1 text-[11px]">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              <span>عناصر الإجابة النموذجية بالنقاط:</span>
                            </div>
                            {ex.modelAnswerPoints.map((pt, pIdx) => (
                              <div key={pIdx} className="text-stone-800 leading-relaxed pr-1">
                                {pt}
                              </div>
                            ))}
                          </div>
                          {ex.professorExamAlert && (
                            <div className="text-[11px] text-rose-800 bg-rose-50 p-2 rounded border border-rose-200 flex items-start gap-1.5">
                              <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                              <div>
                                <strong>تنبيه دكتور المادة في الامتحان: </strong>
                                <span>{ex.professorExamAlert}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })()
          )}

          {/* Question Cards List */}
          {displayedQuestions.length === 0 ? (
            <div className="bg-white p-8 rounded-xl border border-stone-200 text-center text-stone-500">
              لا توجد أسئلة تطابق معايير التصفية الحالية.
            </div>
          ) : (
            <div className="space-y-4">
              {displayedQuestions.map((q, idx) => {
                const isBookmarked = bookmarkedIds.includes(q.id);
                const isRevealed = revealedAnswers[q.id] || false;
                const userAnswer = userAnswers[q.id];

                return (
                  <div
                    key={q.id}
                    className="bg-white rounded-xl border border-stone-200 p-4 sm:p-5 shadow-xs transition-all hover:border-stone-300"
                  >
                    {/* Question Card Header */}
                    <div className="flex items-center justify-between gap-2 pb-2.5 mb-3 border-b border-stone-100 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold bg-stone-100 text-stone-800 px-2 py-0.5 rounded">
                          س {idx + 1}
                        </span>
                        <span className="text-stone-500">الفصل {q.chapterId}</span>
                        <span className="text-stone-300">·</span>
                        <span
                          className={`font-medium ${
                            q.difficulty === 'سؤال امتحان متوقع'
                              ? 'text-rose-600 font-bold'
                              : 'text-stone-500'
                          }`}
                        >
                          {q.difficulty}
                        </span>
                      </div>

                      <button
                        onClick={() => toggleBookmark(q.id)}
                        className={`p-1.5 rounded transition-colors ${
                          isBookmarked
                            ? 'text-amber-600 bg-amber-50'
                            : 'text-stone-400 hover:text-stone-600'
                        }`}
                        title="حفظ للمراجعة"
                      >
                        <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500' : ''}`} />
                      </button>
                    </div>

                    {/* Question Text */}
                    <h3
                      className="font-bold text-stone-900 leading-snug mb-3.5"
                      style={{ fontSize: `${fontSize}px` }}
                    >
                      {q.question}
                    </h3>

                    {/* MCQ Options */}
                    {q.type === 'mcq' && q.options && (
                      <div className="space-y-2 mb-4">
                        {q.options.map((option, optIdx) => {
                          const isSelected = userAnswer === optIdx;
                          const isCorrect = optIdx === q.correctAnswerIndex;
                          const hasAnswered = userAnswer !== undefined;

                          let btnStyle = 'bg-stone-50 hover:bg-stone-100 text-stone-800 border-stone-200';
                          if (hasAnswered) {
                            if (isCorrect) {
                              btnStyle = 'bg-emerald-50 text-emerald-900 border-emerald-400 font-semibold';
                            } else if (isSelected && !isCorrect) {
                              btnStyle = 'bg-rose-50 text-rose-900 border-rose-400 line-through';
                            } else {
                              btnStyle = 'bg-stone-50 text-stone-400 border-stone-200 opacity-60';
                            }
                          }

                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleSelectOption(q.id, optIdx)}
                              className={`w-full text-right p-3 rounded-lg border transition-all text-xs sm:text-sm flex items-center justify-between gap-2 ${btnStyle}`}
                            >
                              <span>{option}</span>
                              {hasAnswered && isCorrect && (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                              )}
                              {hasAnswered && isSelected && !isCorrect && (
                                <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* True / False Selection */}
                    {q.type === 'true_false' && (
                      <div className="flex items-center gap-3 mb-4">
                        <button
                          onClick={() => handleSelectTrueFalse(q.id, true)}
                          className={`flex-1 p-3 rounded-lg border text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                            userAnswer === true
                              ? q.isTrue
                                ? 'bg-emerald-50 text-emerald-900 border-emerald-400'
                                : 'bg-rose-50 text-rose-900 border-rose-400'
                              : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                          }`}
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>صحيح</span>
                        </button>
                        <button
                          onClick={() => handleSelectTrueFalse(q.id, false)}
                          className={`flex-1 p-3 rounded-lg border text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                            userAnswer === false
                              ? !q.isTrue
                                ? 'bg-emerald-50 text-emerald-900 border-emerald-400'
                                : 'bg-rose-50 text-rose-900 border-rose-400'
                              : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                          }`}
                        >
                          <XCircle className="w-4 h-4 text-rose-600" />
                          <span>خطأ</span>
                        </button>
                      </div>
                    )}

                    {/* Essay & Taaleel Reveal Controls */}
                    <div className="flex items-center justify-between pt-2">
                      <button
                        onClick={() => toggleRevealAnswer(q.id)}
                        className="text-xs text-amber-700 hover:text-amber-800 font-bold flex items-center gap-1.5 py-1 px-2 rounded hover:bg-amber-50 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>{isRevealed ? 'إخفاء الإجابة النموذجية' : 'إظهار الإجابة النموذجية وتوزيع الدرجات'}</span>
                      </button>

                      {q.totalMarks && (
                        <span className="text-[11px] font-bold text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                          {q.totalMarks} درجات
                        </span>
                      )}
                    </div>

                    {/* Revealed Model Answer & Rubric */}
                    {isRevealed && (
                      <div className="mt-3.5 pt-3.5 border-t border-stone-200 space-y-3 bg-stone-50/70 p-3.5 rounded-lg">
                        <div>
                          <div className="text-xs font-bold text-emerald-800 mb-1 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>الإجابة النموذجية المعتمدة:</span>
                          </div>
                          <div className="text-xs sm:text-sm text-stone-800 leading-relaxed whitespace-pre-line font-amiri">
                            {q.modelAnswer}
                          </div>
                        </div>

                        {/* Correction if false */}
                        {q.type === 'true_false' && !q.isTrue && q.correctionIfFalse && (
                          <div className="text-xs text-rose-800 bg-rose-50 p-2.5 rounded border border-rose-200">
                            <span className="font-bold">تصويب الخطأ: </span>
                            {q.correctionIfFalse}
                          </div>
                        )}

                        {/* Rubric Points with Marks (عناصر الإجابة وتوزيع الدرجات) */}
                        {q.rubricPoints && q.rubricPoints.length > 0 && (
                          <div className="bg-white p-3 rounded border border-stone-200 space-y-1.5">
                            <div className="text-[11px] font-bold text-stone-600 flex items-center gap-1">
                              <Award className="w-3.5 h-3.5 text-amber-600" />
                              <span>توزيع درجات السؤال (عناصر التقييم في التصحيح):</span>
                            </div>
                            <div className="space-y-1">
                              {q.rubricPoints.map((rubric, rIdx) => (
                                <div
                                  key={rIdx}
                                  className="flex items-center justify-between text-xs text-stone-700 py-0.5 border-b border-stone-100 last:border-0"
                                >
                                  <span>{rubric.point}</span>
                                  <span className="font-bold font-mono text-amber-700 shrink-0 mr-2">
                                    {rubric.mark} درجات
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Textbook Explanation */}
                        {q.explanation && (
                          <div className="text-[11px] text-stone-500 pt-1 border-t border-stone-200">
                            <span className="font-semibold text-stone-600">سند الإجابة من الكتاب: </span>
                            {q.explanation}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* VIEW: CHAPTER EXERCISES & ACTIVITIES (TEXTBOOK) */}
      {examSubTab === 'chapter_exercises' && (
        <div className="space-y-6">
          {/* Header Banner */}
          <div className="bg-linear-to-r from-stone-900 to-stone-800 text-white p-4 sm:p-6 rounded-2xl shadow-sm space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="text-amber-400 font-bold flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" />
                <span>أنشطة وتدريبات نهاية الفصول من الكتاب المقرر المعتمد</span>
              </span>
              <span className="bg-amber-400 text-stone-950 font-black px-2.5 py-0.5 rounded-full text-[10px]">
                صنع وتطوير الطالب: عمر حسين محمد
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white">
              الحلول النموذجية لأنشطة وتدريبات فصول الكتاب الستة
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-3xl">
              إجابات مفصلة ومحررة في نقاط محددة وفق المنهج المعتمد للأستاذ الدكتور أحمد سعد محمد سعد (كلية التربية - جامعة عين شمس)، مع سلم الدرجات وتنبيهات أستاذ المادة.
            </p>

            {/* Chapter Selector Filter */}
            <div className="pt-3 border-t border-stone-700/80 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              <button
                onClick={() => setFilterChapter(0)}
                className={`px-3 py-1.5 text-xs rounded-lg whitespace-nowrap font-bold transition-all ${
                  filterChapter === 0
                    ? 'bg-amber-500 text-stone-950 shadow-xs'
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-700 border border-stone-700'
                }`}
              >
                جميع الفصول (1 - 6)
              </button>
              {[1, 2, 3, 4, 5, 6].map((ch) => (
                <button
                  key={ch}
                  onClick={() => setFilterChapter(ch)}
                  className={`px-3 py-1.5 text-xs rounded-lg whitespace-nowrap font-bold transition-all ${
                    filterChapter === ch
                      ? 'bg-amber-500 text-stone-950 shadow-xs'
                      : 'bg-stone-800 text-stone-300 hover:bg-stone-700 border border-stone-700'
                  }`}
                >
                  الفصل {ch}
                </button>
              ))}
            </div>
          </div>

          {/* Exercises List */}
          <div className="space-y-6">
            {CHAPTER_EXERCISES_DATA.filter(
              (ex) => filterChapter === 0 || ex.chapterId === filterChapter
            ).map((exercise, exIndex) => (
              <div
                key={exercise.id}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:border-stone-300 transition-all"
              >
                {/* Exercise Header */}
                <div className="bg-amber-50/70 p-4 sm:p-5 border-b border-amber-200/70 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-amber-600 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-2xs">
                      {exercise.chapterId}.{exercise.exerciseNumber}
                    </span>
                    <div>
                      <span className="text-[11px] font-bold text-amber-900 bg-amber-200/60 px-2 py-0.5 rounded">
                        الفصل {exercise.chapterId}: {exercise.chapterTitle}
                      </span>
                      <h4 className="font-bold text-sm sm:text-base text-stone-900 mt-1">
                        {exercise.title}
                      </h4>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setFilterChapter(exercise.chapterId);
                      setExamSubTab('bank');
                    }}
                    className="text-xs bg-stone-900 hover:bg-stone-800 text-amber-400 font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 shrink-0"
                  >
                    <span>حل أسئلة الفصل في البنك</span>
                    <HelpCircle className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Exercise Body */}
                <div className="p-4 sm:p-6 space-y-4">
                  {/* Original Textbook Question Text */}
                  <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 text-xs sm:text-sm">
                    <div className="font-bold text-stone-900 text-xs mb-1.5 flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-stone-700" />
                      <span>نص النشاط والتكليف كما ورد في الكتاب المقرر:</span>
                    </div>
                    <p className="text-stone-800 leading-relaxed font-semibold whitespace-pre-line pr-2 border-r-2 border-amber-500">
                      {exercise.questionText}
                    </p>
                  </div>

                  {/* Bulleted Model Answer Points */}
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>عناصر الإجابة النموذجية المحددة في نقاط دقيقة:</span>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-2.5 text-xs sm:text-sm text-stone-800 leading-relaxed shadow-2xs">
                      {exercise.modelAnswerPoints.map((point, ptIdx) => (
                        <div key={ptIdx} className="leading-relaxed">
                          {point}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Doctor's Exam Alert */}
                  {exercise.professorExamAlert && (
                    <div className="bg-rose-50 p-3.5 rounded-xl border border-rose-200 text-rose-950 text-xs sm:text-sm flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <div className="leading-relaxed">
                        <strong className="text-rose-900">تنبيه دكتور المادة في ورقة الامتحان: </strong>
                        <span>{exercise.professorExamAlert}</span>
                      </div>
                    </div>
                  )}

                  {/* Rubric Points */}
                  {exercise.rubricPoints && exercise.rubricPoints.length > 0 && (
                    <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center gap-2 text-xs">
                      <span className="font-bold text-stone-700">سلم توزيع الدرجات المقترح:</span>
                      {exercise.rubricPoints.map((rb, rIdx) => (
                        <span
                          key={rIdx}
                          className="bg-stone-100 text-stone-800 px-2.5 py-1 rounded-md border border-stone-200 text-[11px]"
                        >
                          {rb.item}: <strong className="text-amber-700">{rb.mark} درجات</strong>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 2: FULL MOCK EXAM (60 MARKS) */}
      {examSubTab === 'mock_exam' && (
        <div className="bg-white rounded-xl border border-stone-300 shadow-md p-4 sm:p-8 space-y-8">
          {/* Printable Header */}
          <div className="text-center pb-6 border-b-2 border-stone-900 space-y-2">
            <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-stone-600 gap-1">
              <span className="font-bold">{MOCK_EXAM_METADATA.university}</span>
              <span className="font-bold">{MOCK_EXAM_METADATA.department}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
              امتحان الفصل الدراسي الأول في مادة: {MOCK_EXAM_METADATA.course}
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-stone-700 pt-1">
              <span>أستاذ المادة: {MOCK_EXAM_METADATA.professor}</span>
              <span>·</span>
              <span>الزمن: {MOCK_EXAM_METADATA.duration}</span>
              <span>·</span>
              <span className="font-bold text-amber-800">الدرجة الكلية: {MOCK_EXAM_METADATA.totalMarks} درجة</span>
            </div>
          </div>

          {/* Exam Instructions */}
          <div className="bg-amber-50/70 p-3.5 rounded-lg border border-amber-200 text-xs text-amber-900 space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
              <span>تعليمات الامتحان:</span>
            </div>
            <ul className="list-disc list-inside space-y-0.5 text-stone-700 pr-2">
              {MOCK_EXAM_METADATA.instructions.map((inst, iIdx) => (
                <li key={iIdx}>{inst}</li>
              ))}
            </ul>
          </div>

          {/* Question 1: Objective (15 Marks) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <h3 className="font-bold text-base text-stone-900">
                السؤال الأول: (موضوعي - 15 درجة)
              </h3>
              <span className="text-xs font-bold bg-stone-100 text-stone-700 px-2.5 py-1 rounded">
                15 درجة
              </span>
            </div>
            <p className="text-xs text-stone-600">
              أ) اختر الإجابة الصحيحة من بين البدائل، وب) بيّن الصواب والخطأ مع تصويب الخطأ:
            </p>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="p-3 bg-stone-50 rounded-lg">
                <span className="font-bold ml-1">1.</span>
                ينتهي المدلول اللغوي لمادة (بلغ) إلى: (الظهور والكشف / الوصول والانتهاء والحسن والجودة / النظم والتأليف).
              </div>
              <div className="p-3 bg-stone-50 rounded-lg">
                <span className="font-bold ml-1">2.</span>
                أول من أفرد وجوه تحسين الكلام وسمّاها صراحة بـ "علم البديع" كعلم ثالث مستقل هو: (السكاكي / ابن الناظم بدر الدين بن مالك / الخطيب القزويني).
              </div>
              <div className="p-3 bg-stone-50 rounded-lg">
                <span className="font-bold ml-1">3.</span>
                (ضع علامة صواب أو خطأ مع تصويب الخطأ): يصح في الاصطلاح البلاغي الدقيق أن نصف الكلمة المفردة المعزولة بأنها كلمة بليغة.
              </div>
            </div>
          </div>

          {/* Question 2: Taaleel (15 Marks) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <h3 className="font-bold text-base text-stone-900">
                السؤال الثاني: (علل وبم تفسر - 15 درجة)
              </h3>
              <span className="text-xs font-bold bg-stone-100 text-stone-700 px-2.5 py-1 rounded">
                15 درجة (لكل جزئية 5 درجات)
              </span>
            </div>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="p-3.5 bg-stone-50 rounded-lg space-y-1">
                <span className="font-bold ml-1">1.</span>
                براءة ساحة الإمام السكاكي مما رماه به بعض المؤرخين والباحثين المحدثين من إدخال العقم والجمود في البلاغة العربية.
              </div>
              <div className="p-3.5 bg-stone-50 rounded-lg space-y-1">
                <span className="font-bold ml-1">2.</span>
                ورود كلمتي ﴿اثَّاقَلْتُمْ﴾ و﴿يَصْطَرِخُونَ﴾ في القرآن الكريم يُعد في قمة الفصاحة والإعجاز رغم ما فيهما من ثقل في النطق.
              </div>
              <div className="p-3.5 bg-stone-50 rounded-lg space-y-1">
                <span className="font-bold ml-1">3.</span>
                رفض القاضي أبو بكر الباقلاني في كتابه «إعجاز القرآن» أن يكون البديع هو وجه إعجاز القرآن الكريم.
              </div>
            </div>
          </div>

          {/* Question 3: Shawahid & Rhetorical Defects (15 Marks) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <h3 className="font-bold text-base text-stone-900">
                السؤال الثالث: (تطبيق وشواهد - 15 درجة)
              </h3>
              <span className="text-xs font-bold bg-stone-100 text-stone-700 px-2.5 py-1 rounded">
                15 درجة
              </span>
            </div>
            <p className="text-xs text-stone-600">
              بيّن العيب البلاغي أو اللطيفة البيانية في الشواهد الآتية مع الشرح والتوجيه:
            </p>
            <div className="space-y-3 text-xs sm:text-sm font-amiri">
              <div className="p-3.5 bg-stone-50 rounded-lg">
                <span className="font-bold ml-1 font-sans">1.</span>
                قول الفرزدق: «وَمَا مِثْلُهُ فِي النَّاسِ إِلَّا مُمَلَّكًا ... أَبُو أُمِّهِ حَيٌّ أَبُوهُ يُقَارِبُهُ»
              </div>
              <div className="p-3.5 bg-stone-50 rounded-lg">
                <span className="font-bold ml-1 font-sans">2.</span>
                قول العباس بن الأحنف: «سَأَطْلُبُ بُعْدَ الدَّارِ عَنْكُمْ لِتَقْرَبُوا ... وَتَسْكُبُ عَيْنَايَ الدُّمُوعَ لِتَجْمُدَا»
              </div>
              <div className="p-3.5 bg-stone-50 rounded-lg">
                <span className="font-bold ml-1 font-sans">3.</span>
                قوله تعالى: ﴿الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ... إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ﴾ (وجه الالتفات عند ابن جني).
              </div>
            </div>
          </div>

          {/* Question 4: Essay Comparison (15 Marks) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <h3 className="font-bold text-base text-stone-900">
                السؤال الرابع: (مقارنة مقالية - 15 درجة)
              </h3>
              <span className="text-xs font-bold bg-stone-100 text-stone-700 px-2.5 py-1 rounded">
                15 درجة
              </span>
            </div>
            <div className="p-4 bg-stone-50 rounded-lg text-xs sm:text-sm leading-relaxed">
              «أحدث الإفراط في صنعة البديع ما سُمي بـ "ظاهرة الركام البديعي" في عصر البديعيات».
              <br />
              <strong className="block mt-2">المطلوب:</strong>
              اكتب مقالاً نقدياً محكماً تتناول فيه: مفهوم هذه الظاهرة وأسبابها، وأثر التكلف في تهميش البديع، ثم وضح كيف رد حذاق البلاغيين والنقاد (كالجرجاني وابن جني ويحيى العلوي) الاعتبار لهذا الفن.
            </div>
          </div>

          {/* Model Answer Toggle for Mock Exam */}
          <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={() => setShowMockModelAnswers(!showMockModelAnswers)}
              className="w-full sm:w-auto px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Eye className="w-4 h-4 text-amber-400" />
              <span>{showMockModelAnswers ? 'إخفاء نموذج الإجابة وتوزيع الدرجات' : 'عرض نموذج الإجابة الرسمي وتوزيع الدرجات'}</span>
            </button>

            <button
              onClick={() => window.print()}
              className="w-full sm:w-auto px-4 py-2 border border-stone-300 hover:bg-stone-50 text-stone-700 text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              <Printer className="w-4 h-4 text-stone-500" />
              <span>طباعة ورقة الامتحان</span>
            </button>
          </div>

          {/* Full Model Answers Section */}
          {showMockModelAnswers && (
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 sm:p-6 space-y-6">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm border-b border-emerald-200 pb-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>نموذج الإجابة المعتمد وسلم تصحيح الدرجات (أ.د. أحمد سعد)</span>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-stone-800">
                <div>
                  <h4 className="font-bold text-stone-900 mb-1">إجابة السؤال الأول (15 درجة):</h4>
                  <p>1. الوصول والانتهاء، والحسن والجودة (5 درجات).</p>
                  <p>2. ابن الناظم بدر الدين بن مالك في كتاب المصباح (5 درجات).</p>
                  <p>3. العبارة خطأ؛ لأن المفرد لا يوصف بالبلاغة لكونها وصفاً للكلام المركب مع معناه بمطابقة مقتضى الحال، وإنما يوصف بالفصاحة فقط (5 درجات).</p>
                </div>

                <div>
                  <h4 className="font-bold text-stone-900 mb-1">إجابة السؤال الثاني (15 درجة):</h4>
                  <p>1. براءة السكاكي: لأن تقسيمه كان لازمة تعليمية اقتضاها تراكم المعرفة لضبط العلم لطلابه، ولم يكن بدعاً بل أخذ من سلفه (الجرجاني والزمخشري)، والجمود طرأ على اللاحقين وشراح التلخيص (5 درجات).</p>
                  <p>2. (اثاقلتم ويصطرخون): لأن الثقل الصوتي مقصود فصيح يتجاوب إعجازياً مع المعنى، فـ (اثاقلتم) تصور التثاقل للخلود بالأرض، و(يصطرخون) تجسد صراخ أهل النار الغليظ (5 درجات).</p>
                  <p>3. الباقلاني: لأن البديع صنعة بشرية يمكن حذقها بالدربة والتعلم، بينما إعجاز القرآن خارق للعادة البشرية (5 درجات).</p>
                </div>

                <div>
                  <h4 className="font-bold text-stone-900 mb-1">إجابة السؤال الثالث (15 درجة):</h4>
                  <p>1. بيت الفرزدق: تعقيد لفظي بسبب الفصل بأجنبي (حي) بين المبتدأ (أبو أمه) وخبره (أبوه)، والفصل بين الموصوف والصفة، وتقديم المستثنى (5 درجات).</p>
                  <p>2. بيت العباس: تعقيد معنوي في (لتجمدا)؛ لأن جمود العين في عرف العرب بخل بالدمع وقت الحزن لا سرور (5 درجات).</p>
                  <p>3. سورة الفاتحة: الالتفات من الغيبة (الحمد لله) إلى الخطاب (إياك نعبد)؛ لأن الحمد دون العبادة، فلما ترقى العبد في أقصى أمد الطاعة استحق الحضور ومخاطبة الرب مباشرة (5 درجات).</p>
                </div>

                <div>
                  <h4 className="font-bold text-stone-900 mb-1">إجابة السؤال الرابع (15 درجة):</h4>
                  <p>مفهوم الركام البديعي وأسبابه (4 درجات) + أثر التكلف في تهميش البديع والقصيدة البديعية (4 درجات) + رد الاعتبار للبديع عند الجاحظ وعبد القاهر ويحيى العلوي (7 درجات).</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* VIEW 3: PROFESSOR'S EXAM TIPS */}
      {examSubTab === 'tips' && (
        <div className="space-y-4">
          <div className="bg-stone-900 text-white p-5 rounded-xl">
            <h3 className="text-base font-bold flex items-center gap-2 text-amber-400">
              <Lightbulb className="w-5 h-5" />
              <span>توجيهات أستاذ المادة وتنبيهات الحصول على تقدير "امتياز"</span>
            </h3>
            <p className="text-xs text-stone-300 mt-1">
              مجموعة من الملاحظات الذهبية جمعها دكتور المادة لتفادي أخطاء التصحيح الشائعة.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PROFESSOR_EXAM_TIPS.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs space-y-2"
              >
                <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
                  <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span>{item.title}</span>
                </div>
                <p className="text-xs text-stone-700 leading-relaxed">
                  {item.tip}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
