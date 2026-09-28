import React, { useState } from 'react';
import { ALL_BOOK_PARTS, BOOK_REFERENCES, BookPart } from '../data/fullBookContent';
import { CHAPTER_EXERCISES_DATA } from '../data/chapterExercisesData';
import { ALL_EXAM_QUESTIONS } from '../data/examQuestionsData';
import {
  BookOpen,
  Sparkles,
  Key,
  Bookmark,
  FileText,
  ListOrdered,
  Search,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  HelpCircle,
  Award,
  CheckCircle2,
  GraduationCap,
  ArrowLeft,
  Lightbulb
} from 'lucide-react';

interface FullBookReaderViewProps {
  fontSize: number;
  searchQuery: string;
  onNavigateToQuiz?: (chapterNumber: number) => void;
}

export const FullBookReaderView: React.FC<FullBookReaderViewProps> = ({
  fontSize,
  searchQuery,
  onNavigateToQuiz,
}) => {
  const [selectedPartId, setSelectedPartId] = useState<string>('intro');
  const [showReferences, setShowReferences] = useState<boolean>(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});

  const currentPart = ALL_BOOK_PARTS.find((p) => p.id === selectedPartId) || ALL_BOOK_PARTS[0];

  const currentChapterExercises = CHAPTER_EXERCISES_DATA.filter(
    (ex) => ex.chapterId === currentPart.partNumber
  );

  const currentChapterQuestions = ALL_EXAM_QUESTIONS.filter(
    (q) => q.chapterId === currentPart.partNumber
  );

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [id]: prev[id] === undefined ? false : !prev[id],
    }));
  };

  const isSectionOpen = (id: string) => {
    return openSections[id] !== false; // open by default
  };

  const toggleAnswerReveal = (id: string) => {
    setRevealedAnswers((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-stone-900 text-white p-4 sm:p-6 rounded-xl shadow-md space-y-2">
        <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
          <BookOpen className="w-4 h-4" />
          <span>المتن الأصلي الكامل لكتاب مدخل إلى البلاغة العربية</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white">
          النص الكامل للكتاب دون حذف أو اختصار أي حرف
        </h2>
        <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-3xl">
          يُعرض هنا نص الكتاب التراثي والأكاديمي كاملاً بعباراته الأصلية وشواهده وهوامشه، وتحت كل مقطع نص للشرح والبيان متبوعاً بكلمات مفتاحية لتسهيل الحفظ.
        </p>
      </div>

      {/* Part Navigation Tabs (Mobile-friendly horizontal scroll) */}
      <div className="bg-white p-2 rounded-xl border border-stone-200 shadow-2xs">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {ALL_BOOK_PARTS.map((part) => {
            const isSelected = !showReferences && part.id === selectedPartId;
            return (
              <button
                key={part.id}
                onClick={() => {
                  setSelectedPartId(part.id);
                  setShowReferences(false);
                }}
                className={`px-3 py-2 text-xs font-bold rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-stone-50 text-stone-700 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                <span>{part.partNumber === 0 ? 'المقدمة' : `الفصل ${part.partNumber}`}</span>
                <span className="text-[10px] opacity-80 font-mono font-normal">
                  (ص {part.pages})
                </span>
              </button>
            );
          })}

          {/* References Button */}
          <button
            onClick={() => setShowReferences(true)}
            className={`px-3 py-2 text-xs font-bold rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5 ${
              showReferences
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-stone-50 text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <ListOrdered className="w-3.5 h-3.5 text-amber-400" />
            <span>قائمة المراجع (79 مرجعاً)</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: REFERENCES VIEW */}
      {showReferences ? (
        <div className="bg-white rounded-xl border border-stone-200 p-4 sm:p-6 shadow-xs space-y-4">
          <div className="border-b border-stone-200 pb-3">
            <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <ListOrdered className="w-5 h-5 text-amber-600" />
              <span>قائمة مراجع الكتاب كاملة ومحققة (ص 123 - 128)</span>
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              توثيق 79 مرجعاً ومصدراً اعتمد عليها أ.د. أحمد سعد محمد سعد في إعداد هذا المدخل.
            </p>
          </div>

          <div className="divide-y divide-stone-100">
            {BOOK_REFERENCES.map((ref) => (
              <div key={ref.number} className="py-2.5 flex items-start gap-3 text-xs sm:text-sm">
                <span className="w-6 h-6 rounded-full bg-stone-100 text-stone-700 font-mono font-bold flex items-center justify-center shrink-0 text-xs">
                  {ref.number}
                </span>
                <div className="leading-relaxed">
                  <span className="font-bold text-stone-900 ml-1">«{ref.book}»</span>
                  <span className="text-amber-800 font-medium ml-1">({ref.author})</span>
                  <span className="text-stone-500">{ref.details}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* VIEW 2: UNABRIDGED FULL BOOK TEXT + EXPLANATION UNDERNEATH + KEYWORDS */
        <div className="space-y-6">
          <div className="bg-stone-100/70 p-3.5 rounded-xl border border-stone-200 flex items-center justify-between text-xs text-stone-700">
            <div className="flex items-center gap-2 font-bold">
              <FileText className="w-4 h-4 text-amber-600" />
              <span>{currentPart.title}</span>
              <span className="text-stone-400">|</span>
              <span className="text-stone-500 font-normal">الصفحات من {currentPart.pages}</span>
            </div>
            <div className="text-[11px] text-stone-500">
              {currentPart.sections.length} مباحث تفصيلية
            </div>
          </div>

          {currentPart.sections.map((sec, secIdx) => {
            const isOpen = isSectionOpen(sec.id);
            return (
              <div
                key={sec.id}
                className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs"
              >
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(sec.id)}
                  className="w-full text-right p-4 bg-stone-50/80 hover:bg-stone-100/80 transition-colors flex items-center justify-between gap-3 border-b border-stone-200"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-stone-800 text-white text-xs font-bold flex items-center justify-center shrink-0">
                      {secIdx + 1}
                    </span>
                    <h3 className="font-bold text-sm sm:text-base text-stone-900 leading-snug">
                      {sec.title}
                    </h3>
                  </div>
                  <div className="text-stone-400">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="p-4 sm:p-6 space-y-6">
                    {/* 1. ORIGINAL UNABRIDGED TEXT */}
                    <div className="space-y-3 bg-stone-50/60 p-4 sm:p-5 rounded-xl border border-stone-200/90">
                      <div className="flex items-center justify-between border-b border-stone-200 pb-2 mb-3">
                        <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                          <BookOpen className="w-4 h-4 text-stone-700" />
                          <span>نص الكتاب الأصلي الكامل (دون نقصان حرف):</span>
                        </span>
                        <span className="text-[10px] text-stone-500 bg-white px-2 py-0.5 rounded border border-stone-200">
                          نص المحتوى المعتمد
                        </span>
                      </div>

                      <div
                        className="font-amiri text-stone-950 leading-relaxed text-justify space-y-3"
                        style={{ fontSize: `${fontSize + 2}px` }}
                      >
                        {sec.originalFullText.map((paragraph, pIdx) => (
                          <p key={pIdx} className="leading-loose">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>

                    {/* 2. EXPLANATION UNDERNEATH */}
                    <div className="bg-amber-50/50 p-4 sm:p-5 rounded-xl border border-amber-200 space-y-2.5">
                      <div className="flex items-center gap-1.5 text-amber-950 font-bold text-xs">
                        <Sparkles className="w-4 h-4 text-amber-600" />
                        <span>نص الشرح وتفكيك العبارة وتبسيط الألفاظ:</span>
                      </div>
                      <p
                        className="text-stone-800 leading-relaxed font-sans"
                        style={{ fontSize: `${fontSize}px` }}
                      >
                        {sec.simplifiedExplanation}
                      </p>
                    </div>

                    {/* 3. KEYWORDS TO FACILITATE MEMORIZATION */}
                    {sec.keywords && sec.keywords.length > 0 && (
                      <div className="bg-white p-3.5 rounded-xl border border-stone-200 space-y-2">
                        <div className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
                          <Key className="w-3.5 h-3.5 text-amber-600" />
                          <span>كلمات مفتاحية لتسهيل الحفظ السريع:</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {sec.keywords.map((kw, kwIdx) => (
                            <span
                              key={kwIdx}
                              className="text-xs bg-stone-100 hover:bg-amber-100 text-stone-900 font-semibold px-2.5 py-1 rounded-md border border-stone-200 transition-colors shadow-2xs"
                            >
                              🔑 {kw}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 4. ORIGINAL FOOTNOTES */}
                    {sec.footnotes && sec.footnotes.length > 0 && (
                      <div className="pt-3 border-t border-stone-200 text-xs text-stone-500 space-y-1">
                        <div className="font-bold text-[11px] text-stone-600">هوامش وتوثيقات الصفحة:</div>
                        <ul className="list-decimal list-inside space-y-0.5 pr-2">
                          {sec.footnotes.map((fn, fIdx) => (
                            <li key={fIdx}>{fn}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {/* DEDICATED CHAPTER EXERCISES & EXAM QUESTIONS SECTION */}
          {currentPart.partNumber > 0 && (
            <div className="mt-10 pt-6 border-t-2 border-stone-200 space-y-6">
              {/* Section Header Card */}
              <div className="bg-linear-to-r from-stone-900 via-stone-850 to-stone-900 text-white p-4 sm:p-6 rounded-2xl shadow-md border border-stone-800">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
                    <Award className="w-4 h-4" />
                    <span>أنشطة وتدريبات الكتاب المقرر وبنك أسئلة الدكتور</span>
                  </div>
                  <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                    عمل وتطوير الطالب: عمر حسين محمد
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-white">
                  أسئلة وتطبيقات نهاية الفصل {currentPart.partNumber}: «{currentPart.title.replace(/^الفصل \w+:\s*/, '')}»
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 mt-1 leading-relaxed">
                  يضم هذا القسم حلول أنشطة وتدريبات الكتاب المقرر المعتمد، ونماذج من أهم أسئلة الدكتور (أ.د. أحمد سعد) بالنقاط وسلم الدرجات، مع إمكانية الاختبار الفوري.
                </p>

                {/* Quick Chapter Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 pt-3 border-t border-stone-800 text-center text-xs">
                  <div className="bg-stone-800/70 p-2 rounded-xl border border-stone-700">
                    <div className="text-amber-400 font-bold text-base sm:text-lg">
                      {currentChapterExercises.length}
                    </div>
                    <div className="text-[11px] text-stone-300">أنشطة الكتاب المقرر</div>
                  </div>
                  <div className="bg-stone-800/70 p-2 rounded-xl border border-stone-700">
                    <div className="text-emerald-400 font-bold text-base sm:text-lg">
                      {currentChapterQuestions.filter((q) => q.type === 'mcq').length}
                    </div>
                    <div className="text-[11px] text-stone-300">اختيار من متعدد</div>
                  </div>
                  <div className="bg-stone-800/70 p-2 rounded-xl border border-stone-700">
                    <div className="text-sky-400 font-bold text-base sm:text-lg">
                      {currentChapterQuestions.filter((q) => q.type === 'true_false').length}
                    </div>
                    <div className="text-[11px] text-stone-300">صح وخطأ مع التعليل</div>
                  </div>
                  <div className="bg-stone-800/70 p-2 rounded-xl border border-stone-700">
                    <div className="text-rose-400 font-bold text-base sm:text-lg">
                      {currentChapterQuestions.filter((q) => q.type === 'taaleel' || q.type === 'essay').length}
                    </div>
                    <div className="text-[11px] text-stone-300">علل ومقالي تحليلي</div>
                  </div>
                </div>
              </div>

              {/* 1. OFFICIAL TEXTBOOK ACTIVITIES WITH BULLETED MODEL ANSWERS */}
              {currentChapterExercises.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-r-4 border-amber-600 pr-3">
                    <h4 className="text-base font-bold text-stone-900">
                      أولاً: أنشطة وتدريبات الكتاب المقرر (إجابات نموذجية بالنقاط)
                    </h4>
                    <span className="text-xs text-stone-500 font-normal">
                      (وفق صياغة أ.د. أحمد سعد محمد سعد)
                    </span>
                  </div>

                  <div className="space-y-4">
                    {currentChapterExercises.map((exercise, exIdx) => (
                      <div
                        key={exercise.id}
                        className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs"
                      >
                        <div className="bg-amber-50/70 p-4 border-b border-amber-200/70 flex items-start gap-3">
                          <span className="w-7 h-7 rounded-lg bg-amber-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {exIdx + 1}
                          </span>
                          <div className="space-y-1">
                            <h5 className="font-bold text-sm sm:text-base text-amber-950">
                              {exercise.title}
                            </h5>
                            <div className="text-xs text-stone-700 whitespace-pre-line leading-relaxed font-medium">
                              {exercise.questionText}
                            </div>
                          </div>
                        </div>

                        <div className="p-4 sm:p-5 space-y-4 text-xs sm:text-sm">
                          {/* Bulleted Points */}
                          <div className="space-y-2">
                            <div className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              <span>عناصر الإجابة النموذجية المحددة في نقاط:</span>
                            </div>
                            <div className="bg-stone-50 p-3.5 sm:p-4 rounded-xl border border-stone-200 space-y-2 text-stone-800 leading-relaxed font-sans">
                              {exercise.modelAnswerPoints.map((point, ptIdx) => (
                                <div key={ptIdx} className="leading-relaxed">
                                  {point}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Professor Alert Box */}
                          {exercise.professorExamAlert && (
                            <div className="bg-rose-50 p-3 rounded-lg border border-rose-200 text-rose-900 text-xs flex items-start gap-2">
                              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                              <div>
                                <span className="font-bold">تنبيه الدكتور في ورقة الامتحان: </span>
                                <span>{exercise.professorExamAlert}</span>
                              </div>
                            </div>
                          )}

                          {/* Rubric Points */}
                          {exercise.rubricPoints && exercise.rubricPoints.length > 0 && (
                            <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center gap-2 text-xs">
                              <span className="font-bold text-stone-600">سلم توزيع الدرجات:</span>
                              {exercise.rubricPoints.map((rb, rbIdx) => (
                                <span
                                  key={rbIdx}
                                  className="bg-stone-100 text-stone-700 px-2 py-0.5 rounded border border-stone-200 text-[11px]"
                                >
                                  {rb.item}: <strong className="text-amber-800">{rb.mark} درجات</strong>
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

              {/* 2. HIGH-YIELD EXAM QUESTIONS PREVIEW & ACCORDION */}
              {currentChapterQuestions.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-r-4 border-stone-900 pr-3">
                    <h4 className="text-base font-bold text-stone-900">
                      ثانياً: بنك أسئلة الدكتور التفاعلية على الفصل {currentPart.partNumber} ({currentChapterQuestions.length} سؤالاً)
                    </h4>
                    {onNavigateToQuiz && (
                      <button
                        onClick={() => onNavigateToQuiz(currentPart.partNumber)}
                        className="text-xs bg-amber-600 hover:bg-amber-700 text-white font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 shadow-2xs"
                      >
                        <span>بدء الاختبار التفاعلي</span>
                        <ArrowLeft className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {currentChapterQuestions.slice(0, 4).map((q) => {
                      const isRevealed = revealedAnswers[q.id];
                      return (
                        <div
                          key={q.id}
                          className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs flex flex-col justify-between space-y-3"
                        >
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="bg-stone-100 text-stone-700 px-2 py-0.5 rounded font-bold">
                                {q.type === 'mcq'
                                  ? 'اختيار من متعدد'
                                  : q.type === 'true_false'
                                  ? 'صح وخطأ مع التعليل'
                                  : q.type === 'taaleel'
                                  ? 'علل وبم تفسر'
                                  : 'سؤال مقالي وتحليلي'}
                              </span>
                              <span className="text-amber-700 font-semibold">{q.difficulty}</span>
                            </div>
                            <p className="text-xs sm:text-sm font-bold text-stone-900 leading-snug">
                              {q.question}
                            </p>
                          </div>

                          <div>
                            {isRevealed ? (
                              <div className="bg-amber-50/80 p-3 rounded-lg border border-amber-200 text-xs space-y-1.5 text-stone-800">
                                <div className="font-bold text-amber-900">الإجابة المعتمدة:</div>
                                <div className="leading-relaxed">{q.modelAnswer}</div>
                                {q.explanation && (
                                  <div className="text-stone-500 text-[11px] pt-1 border-t border-amber-200/60">
                                    💡 {q.explanation}
                                  </div>
                                )}
                              </div>
                            ) : null}

                            <button
                              onClick={() => toggleAnswerReveal(q.id)}
                              className="mt-2 text-xs text-amber-700 hover:text-amber-900 font-bold flex items-center gap-1 transition-colors"
                            >
                              <span>{isRevealed ? 'إخفاء الإجابة النموذجية' : 'عرض إجابة الدكتور المعتمدة'}</span>
                              <ChevronDown
                                className={`w-3.5 h-3.5 transition-transform ${isRevealed ? 'rotate-180' : ''}`}
                              />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Full Interactive Quiz CTA Button */}
                  {onNavigateToQuiz && (
                    <div className="bg-stone-100 p-4 rounded-xl border border-stone-200 text-center space-y-2">
                      <p className="text-xs text-stone-600">
                        هل ترغب في اختبار نفسك في جميع أسئلة الفصل {currentPart.partNumber} الـ ({currentChapterQuestions.length} سؤالاً) مع تسجيل النقاط والتصحيح الفوري؟
                      </p>
                      <button
                        onClick={() => onNavigateToQuiz(currentPart.partNumber)}
                        className="w-full sm:w-auto px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-amber-400 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 mx-auto"
                      >
                        <HelpCircle className="w-4 h-4 text-amber-400" />
                        <span>فتح الاختبار التفاعلي الكامل للفصل {currentPart.partNumber}</span>
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
