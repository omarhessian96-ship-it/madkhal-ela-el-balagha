import React, { useState, useEffect } from 'react';
import { TabType } from './types';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { FullBookReaderView } from './components/FullBookReaderView';
import { ExamView } from './components/ExamView';
import { ComparisonsView } from './components/ComparisonsView';
import { ScholarsView } from './components/ScholarsView';
import { ShawahidView } from './components/ShawahidView';
import { SummaryView } from './components/SummaryView';
import { TermsDictionaryView } from './components/TermsDictionaryView';
import { BookOpen, HelpCircle, GitCompare, Users, Sparkles, Quote } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('full_book');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [fontSize, setFontSize] = useState<number>(16);
  const [selectedChapterForQuiz, setSelectedChapterForQuiz] = useState<number | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('balagha_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [showBookmarksOnly, setShowBookmarksOnly] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem('balagha_bookmarks', JSON.stringify(bookmarkedIds));
    } catch {
      // ignore
    }
  }, [bookmarkedIds]);

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans flex flex-col pb-20 md:pb-10">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        fontSize={fontSize}
        setFontSize={setFontSize}
        bookmarkedIds={bookmarkedIds}
        showBookmarksOnly={showBookmarksOnly}
        setShowBookmarksOnly={setShowBookmarksOnly}
      />

      {/* Main Navigation (Tabs on desktop, bottom bar on mobile) */}
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="max-w-6xl w-full mx-auto px-3 sm:px-4 py-4 sm:py-6 flex-1">
        {/* Quick Context & Mode Indicator */}
        <div className="mb-5 bg-white p-3 sm:p-4 rounded-xl border border-stone-200 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-stone-700">
            <span className="font-bold text-stone-900">الكتاب المعتمد:</span>
            <span>مدخل إلى البلاغة العربية (كلية التربية - جامعة عين شمس)</span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-stone-600 font-medium">
            <button
              onClick={() => setActiveTab('full_book')}
              className={`flex items-center gap-1 transition-colors ${
                activeTab === 'full_book' ? 'text-amber-800 font-bold' : 'hover:text-stone-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-600" />
              <span>نص الكتاب كاملاً (ص 5 - 128)</span>
            </button>
            <span className="text-stone-300">·</span>
            <button
              onClick={() => setActiveTab('summary')}
              className={`flex items-center gap-1 transition-colors ${
                activeTab === 'summary' ? 'text-amber-800 font-bold' : 'hover:text-stone-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>ملخص النقاط الأساسية</span>
            </button>
            <span className="text-stone-300">·</span>
            <button
              onClick={() => setActiveTab('exam')}
              className={`flex items-center gap-1 transition-colors ${
                activeTab === 'exam' ? 'text-rose-700 font-bold' : 'hover:text-stone-900'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 text-rose-500" />
              <span>امتحان الدكتور (60 درجة)</span>
            </button>
          </div>
        </div>

        {/* Tab View Routers */}
        {activeTab === 'full_book' && (
          <FullBookReaderView
            fontSize={fontSize}
            searchQuery={searchQuery}
            onNavigateToQuiz={(chNum) => {
              setSelectedChapterForQuiz(chNum);
              setActiveTab('exam');
            }}
          />
        )}

        {activeTab === 'summary' && (
          <SummaryView fontSize={fontSize} />
        )}

        {activeTab === 'exam' && (
          <ExamView
            fontSize={fontSize}
            selectedChapterForQuiz={selectedChapterForQuiz}
            setSelectedChapterForQuiz={setSelectedChapterForQuiz}
            bookmarkedIds={bookmarkedIds}
            toggleBookmark={toggleBookmark}
            showBookmarksOnly={showBookmarksOnly}
          />
        )}

        {activeTab === 'comparisons' && (
          <ComparisonsView fontSize={fontSize} searchQuery={searchQuery} />
        )}

        {activeTab === 'scholars' && (
          <ScholarsView fontSize={fontSize} searchQuery={searchQuery} />
        )}

        {activeTab === 'shawahid' && (
          <ShawahidView fontSize={fontSize} searchQuery={searchQuery} />
        )}

        {activeTab === 'terms' && (
          <TermsDictionaryView fontSize={fontSize} searchQuery={searchQuery} />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-8 border-t border-stone-200 bg-white py-6 text-center text-xs text-stone-500">
        <div className="max-w-6xl mx-auto px-4 space-y-2">
          <div className="flex flex-wrap items-center justify-center gap-2 font-bold text-stone-800 text-xs sm:text-sm">
            <span>كتاب مدخل إلى البلاغة العربية · كلية التربية - جامعة عين شمس</span>
            <span className="text-stone-300 hidden sm:inline">|</span>
            <span className="text-amber-900 bg-amber-100 border border-amber-300 px-2.5 py-0.5 rounded-full text-[11px] font-bold">
              ✨ منصة صنع وبرمجة وتطوير الطالب: عمر حسين محمد
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-stone-600 max-w-2xl mx-auto leading-relaxed">
            المحتوى المعتمد للأستاذ الدكتور/ أحمد سعد محمد سعد (أستاذ البلاغة والنقد الأدبي) · النص الكامل غير منقوص مع الشرح والكلمات المفتاحية، وحلول أنشطة فصول الكتاب وبنك الأسئلة التفاعلي.
          </p>
          <p className="text-[10px] text-stone-400">
            تم إعداد هذه المنصة التعليمية الرقمية بجهد وتطوير الطالب عمر حسين محمد تيسيراً وإهداءً لزملائه الطلاب
          </p>
        </div>
      </footer>
    </div>
  );
}
