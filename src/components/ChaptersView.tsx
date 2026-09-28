import React, { useState } from 'react';
import { Chapter, TabType } from '../types';
import { CHAPTERS_DATA } from '../data/chaptersData';
import { ChevronDown, ChevronUp, AlertCircle, Sparkles, HelpCircle, BookOpen, Quote, ArrowLeft } from 'lucide-react';

interface ChaptersViewProps {
  fontSize: number;
  searchQuery: string;
  setActiveTab: (tab: TabType) => void;
  setSelectedChapterForQuiz: (chapterId: number) => void;
}

export const ChaptersView: React.FC<ChaptersViewProps> = ({
  fontSize,
  searchQuery,
  setActiveTab,
  setSelectedChapterForQuiz,
}) => {
  const [selectedChapterId, setSelectedChapterId] = useState<number>(1);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    'ch1-sec1': true,
    'ch1-sec2': true,
    'ch2-sec1': true,
    'ch2-sec2': true,
    'ch3-sec1': true,
    'ch3-sec2': true,
    'ch4-sec1': true,
    'ch4-sec2': true,
    'ch5-sec1': true,
    'ch5-sec2': true,
    'ch6-sec1': true,
    'ch6-sec2': true,
  });

  const toggleSection = (sectionId: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const currentChapter =
    CHAPTERS_DATA.find((ch) => ch.id === selectedChapterId) || CHAPTERS_DATA[0];

  // Filter chapters if search query is active
  const filteredChapters = CHAPTERS_DATA.map((ch) => {
    if (!searchQuery) return ch;
    const matchesChapter =
      ch.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ch.brief.toLowerCase().includes(searchQuery.toLowerCase());
    const matchedSections = ch.sections.filter(
      (sec) =>
        sec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (sec.content && sec.content.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()))) ||
        (sec.textBlocks &&
          sec.textBlocks.some(
            (b) =>
              b.originalText.toLowerCase().includes(searchQuery.toLowerCase()) ||
              b.simplifiedExplanation.toLowerCase().includes(searchQuery.toLowerCase()) ||
              b.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()))
          )) ||
        sec.keyTakeaways.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (sec.simplifiedTerms &&
          sec.simplifiedTerms.some(
            (term) =>
              term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
              term.simplifiedMeaning.toLowerCase().includes(searchQuery.toLowerCase())
          ))
    );
    if (matchesChapter || matchedSections.length > 0) {
      return {
        ...ch,
        sections: matchedSections.length > 0 ? matchedSections : ch.sections,
      };
    }
    return null;
  }).filter(Boolean) as Chapter[];

  const handleStartChapterQuiz = (chapterId: number) => {
    setSelectedChapterForQuiz(chapterId);
    setActiveTab('exam');
  };

  return (
    <div className="space-y-6">
      {/* Chapter Selection Bar (Horizontal scroll on mobile, responsive grid/tabs) */}
      <div className="bg-white rounded-xl p-2 sm:p-3 border border-stone-200 shadow-sm">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-100 text-xs text-stone-500">
          <span className="font-semibold text-stone-700">فصول كتاب مدخل إلى البلاغة العربية</span>
          <span>د. أحمد سعد محمد سعد</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-1.5 sm:gap-2">
          {CHAPTERS_DATA.map((ch) => {
            const isSelected = ch.id === selectedChapterId;
            return (
              <button
                key={ch.id}
                onClick={() => setSelectedChapterId(ch.id)}
                className={`text-right p-2.5 rounded-lg border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-amber-50/80 border-amber-500/80 text-stone-900 shadow-xs'
                    : 'bg-stone-50/60 border-stone-200 hover:bg-stone-100 text-stone-600'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      isSelected ? 'bg-amber-600 text-white' : 'bg-stone-200 text-stone-700'
                    }`}
                  >
                    الفصل {ch.id}
                  </span>
                  <span className="text-[10px] text-stone-400">ص {ch.pages}</span>
                </div>
                <div className="text-xs font-bold leading-snug line-clamp-2">
                  {ch.title.replace(/الفصل.*?:/, '')}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Chapter Content Card */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
        {/* Chapter Header Banner */}
        <div className="bg-stone-900 text-white p-4 sm:p-6 border-b border-stone-800">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
              المقرر الدراسي · الصفحات من {currentChapter.pages}
            </span>
            <button
              onClick={() => handleStartChapterQuiz(currentChapter.id)}
              className="text-xs bg-amber-500 hover:bg-amber-600 text-stone-900 font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <span>امتحان الفصل {currentChapter.id}</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          </div>
          <h2 className="text-xl sm:text-2xl font-black leading-snug text-white">
            {currentChapter.title}
          </h2>
          <p className="mt-2 text-stone-300 text-xs sm:text-sm leading-relaxed max-w-3xl">
            {currentChapter.brief}
          </p>
        </div>

        {/* Chapter Sections */}
        <div className="p-4 sm:p-6 space-y-6">
          {currentChapter.sections.map((section, idx) => {
            const isOpen = openSections[section.id] ?? true;
            return (
              <div
                key={section.id}
                className="rounded-xl border border-stone-200 bg-stone-50/50 overflow-hidden transition-all"
              >
                {/* Section Toggle Header */}
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full text-right p-4 bg-white hover:bg-stone-50/80 transition-colors flex items-center justify-between gap-3 border-b border-stone-100"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-stone-100 text-stone-700 text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-stone-900 leading-snug">
                        {section.title}
                      </h3>
                      {section.subheading && (
                        <p className="text-xs text-stone-500 mt-0.5">{section.subheading}</p>
                      )}
                    </div>
                  </div>
                  <div className="text-stone-400">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {/* Section Expanded Content */}
                {isOpen && (
                  <div className="p-4 sm:p-6 space-y-5 bg-white">
                    {/* Structured Text Blocks: Original Text + Explanation Underneath + Memory Keywords */}
                    <div className="space-y-6">
                      {section.textBlocks && section.textBlocks.length > 0 ? (
                        section.textBlocks.map((block, bIdx) => (
                          <div
                            key={block.id || bIdx}
                            className="rounded-xl border border-stone-200 overflow-hidden shadow-2xs bg-white"
                          >
                            {/* 1. Original Textbook Passage */}
                            <div className="p-4 sm:p-5 bg-stone-50/70 border-b border-stone-200">
                              <div className="flex items-center justify-between gap-2 mb-2">
                                <span className="text-[11px] font-bold text-stone-700 flex items-center gap-1.5">
                                  <BookOpen className="w-3.5 h-3.5 text-stone-500" />
                                  <span>نص الكلام الأصلي من الكتاب:</span>
                                </span>
                                <span className="text-[10px] font-mono text-stone-400">
                                  مقطع {bIdx + 1}
                                </span>
                              </div>
                              <blockquote
                                className="font-amiri text-stone-900 leading-relaxed text-justify"
                                style={{ fontSize: `${fontSize + 1}px` }}
                              >
                                {block.originalText}
                              </blockquote>
                            </div>

                            {/* 2. Simplified Explanation Underneath */}
                            <div className="p-4 sm:p-5 bg-white space-y-3">
                              <div className="flex items-center gap-1.5 text-amber-900 font-bold text-xs">
                                <Sparkles className="w-4 h-4 text-amber-600" />
                                <span>الشرح المبسط وتفكيك المعنى:</span>
                              </div>
                              <p
                                className="text-stone-800 leading-relaxed font-sans"
                                style={{ fontSize: `${fontSize}px` }}
                              >
                                {block.simplifiedExplanation}
                              </p>

                              {/* 3. Memory Keywords to Facilitate Recall */}
                              {block.keywords && block.keywords.length > 0 && (
                                <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center gap-1.5">
                                  <span className="text-[11px] font-bold text-stone-500 flex items-center gap-1 ml-1">
                                    <span>🔑</span>
                                    <span>كلمات مفتاحية للحفظ السريع:</span>
                                  </span>
                                  {block.keywords.map((kw, kwIdx) => (
                                    <span
                                      key={kwIdx}
                                      className="text-xs bg-stone-100 hover:bg-amber-100 text-stone-800 hover:text-amber-900 px-2.5 py-0.5 rounded-md font-medium border border-stone-200 transition-colors"
                                    >
                                      {kw}
                                    </span>
                                  ))}
                                </div>
                              )}

                              {/* Academic & Exam Note if available */}
                              {block.academicNotes && (
                                <div className="text-[11px] text-stone-600 bg-stone-50 p-2 rounded border border-stone-200/80 flex items-start gap-1.5">
                                  <AlertCircle className="w-3.5 h-3.5 text-amber-600 mt-0.5 shrink-0" />
                                  <span>{block.academicNotes}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        /* Fallback if plain content exists */
                        <div className="space-y-3.5 leading-relaxed text-stone-800" style={{ fontSize: `${fontSize}px` }}>
                          {section.content?.map((paragraph, pIdx) => (
                            <p key={pIdx} className="leading-relaxed">
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Simplified Terms Box (تبسيط الألفاظ والمصطلحات الغامضة) */}
                    {section.simplifiedTerms && section.simplifiedTerms.length > 0 && (
                      <div className="bg-amber-50/60 rounded-xl p-3.5 sm:p-4 border border-amber-200/80 space-y-2.5">
                        <div className="flex items-center gap-2 text-amber-900 text-xs font-bold">
                          <Sparkles className="w-4 h-4 text-amber-600" />
                          <span>تبسيط الألفاظ والمصطلحات الصعبة في هذا المبحث</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                          {section.simplifiedTerms.map((term, tIdx) => (
                            <div
                              key={tIdx}
                              className="bg-white p-3 rounded-lg border border-amber-200/60 shadow-2xs"
                            >
                              <div className="font-bold text-stone-900 text-sm mb-1 text-amber-900">
                                «{term.term}»
                              </div>
                              <div className="text-xs text-stone-700 leading-relaxed">
                                {term.simplifiedMeaning}
                              </div>
                              {term.exampleOrClarification && (
                                <div className="text-[11px] text-stone-500 mt-1 pt-1 border-t border-stone-100">
                                  توضيح: {term.exampleOrClarification}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Key Takeaways (النقاط الجوهرية للحفظ السريع) */}
                    <div className="bg-stone-50 rounded-xl p-3.5 sm:p-4 border border-stone-200">
                      <div className="text-xs font-bold text-stone-700 mb-2 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-stone-600" />
                        <span>النقاط الجوهرية والمحاور الأساسية</span>
                      </div>
                      <ul className="space-y-1.5 text-xs text-stone-700">
                        {section.keyTakeaways.map((point, kIdx) => (
                          <li key={kIdx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                            <span className="leading-relaxed">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Doctor's Focus Notes (تنبيهات أستاذ المادة للامتحان) */}
                    {section.doctorFocusNotes && section.doctorFocusNotes.length > 0 && (
                      <div className="bg-rose-50/70 rounded-xl p-3.5 sm:p-4 border border-rose-200">
                        <div className="flex items-center gap-2 text-rose-900 text-xs font-bold mb-2">
                          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                          <span>تنبيه دكتور المادة (نقاط واردة بقوة في الامتحان)</span>
                        </div>
                        <ul className="space-y-1 text-xs text-rose-800">
                          {section.doctorFocusNotes.map((note, nIdx) => (
                            <li key={nIdx} className="flex items-start gap-1.5">
                              <span className="font-bold text-rose-600">⚠</span>
                              <span className="leading-relaxed">{note}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {/* Highlights of Shawahid in this chapter */}
          {currentChapter.shawahidHighlights && currentChapter.shawahidHighlights.length > 0 && (
            <div className="mt-8 pt-6 border-t border-stone-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Quote className="w-5 h-5 text-amber-600" />
                  <h3 className="text-base font-bold text-stone-900">
                    أهم الشواهد والآيات الواردة في الفصل {currentChapter.id}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveTab('shawahid')}
                  className="text-xs text-amber-700 hover:text-amber-800 font-semibold"
                >
                  عرض كافة الشواهد والتحليلات ←
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentChapter.shawahidHighlights.map((sh, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-3.5 rounded-xl border border-stone-200 bg-white hover:border-amber-300 transition-colors shadow-2xs"
                  >
                    <div className="text-stone-900 font-amiri font-bold text-sm leading-relaxed mb-1.5">
                      {sh.text}
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1">
                      <span>{sh.source}</span>
                      <span className="font-medium text-stone-400">
                        {sh.type === 'quran' ? 'قرآن كريم' : sh.type === 'hadith' ? 'حديث شريف' : 'شعر عربي'}
                      </span>
                    </div>
                    <div className="text-xs text-amber-900 font-medium bg-amber-50/60 p-2 rounded border border-amber-100">
                      وجه الشاهد: {sh.rhetoricalPoint}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Quiz Callout for this chapter */}
          <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-stone-900 to-stone-800 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm">اختبر معلوماتك في الفصل {currentChapter.id}</h4>
                <p className="text-xs text-stone-300 mt-0.5">
                  يتوفر {currentChapter.questions.length} أسئلة متنوعة (موضوعية، علل، مقالية) صاغها دكتور المادة لهذا الفصل.
                </p>
              </div>
            </div>
            <button
              onClick={() => handleStartChapterQuiz(currentChapter.id)}
              className="w-full sm:w-auto px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-900 font-bold text-xs rounded-lg transition-colors whitespace-nowrap"
            >
              بدء أسئلة الفصل {currentChapter.id}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
