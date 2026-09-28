import React from 'react';
import { BookOpen, Search, ZoomIn, ZoomOut, Bookmark, GraduationCap, X } from 'lucide-react';
import { TabType } from '../types';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  fontSize: number;
  setFontSize: React.Dispatch<React.SetStateAction<number>>;
  bookmarkedIds: string[];
  showBookmarksOnly: boolean;
  setShowBookmarksOnly: (val: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  fontSize,
  setFontSize,
  bookmarkedIds,
  showBookmarksOnly,
  setShowBookmarksOnly,
}) => {
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  const increaseFont = () => setFontSize((prev) => Math.min(prev + 2, 24));
  const decreaseFont = () => setFontSize((prev) => Math.max(prev - 2, 14));

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      {/* Top Banner with University Identity & Student Creator Credit */}
      <div className="bg-stone-900 text-stone-100 px-3 sm:px-4 py-1.5 text-[11px] sm:text-xs flex flex-wrap justify-between items-center gap-1">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="font-semibold text-amber-300">منصة صنع وتطوير الطالب: عمر حسين محمد</span>
          <span className="text-stone-500 hidden xs:inline">|</span>
          <span className="text-stone-300 hidden sm:inline">كلية التربية - جامعة عين شمس</span>
        </div>
        <div className="text-stone-300 text-[10px] sm:text-[11px] flex items-center gap-1.5">
          <span className="bg-stone-800 text-amber-400 px-1.5 py-0.5 rounded text-[10px] font-medium border border-stone-700">
            مقرر أ.د. أحمد سعد محمد سعد
          </span>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-6xl mx-auto px-4 py-2.5 sm:py-3 flex items-center justify-between gap-3">
        {/* Brand Lockup */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-stone-900 text-amber-400 flex items-center justify-center shadow-sm shrink-0">
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-black text-stone-900 leading-tight">
                مدخل إلى البلاغة العربية
              </h1>
              <span className="hidden sm:inline-block bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                عمل الطالب عمر حسين محمد
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-stone-500">
              الشرح المبسط وموسوعة أسئلة الفصول والامتحانات المقننة
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Search Trigger on Mobile / Search Bar on Desktop */}
          <div className="relative">
            {isSearchOpen ? (
              <div className="flex items-center bg-stone-100 rounded-lg px-2.5 py-1 border border-stone-300 w-44 sm:w-64">
                <Search className="w-4 h-4 text-stone-500 ml-1 shrink-0" />
                <input
                  type="text"
                  placeholder="ابحث في المقرر، الشواهد، الأسئلة..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-xs text-stone-800 placeholder-stone-400 focus:outline-none"
                  autoFocus
                />
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setIsSearchOpen(false);
                  }}
                  className="text-stone-400 hover:text-stone-600 p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                title="بحث سريع"
                className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors flex items-center gap-1"
              >
                <Search className="w-4 h-4" />
                <span className="text-xs hidden md:inline">بحث</span>
              </button>
            )}
          </div>

          {/* Font Resizing Controls (For Mobile & Ergonomics) */}
          <div className="hidden sm:flex items-center bg-stone-100 rounded-lg p-0.5 border border-stone-200">
            <button
              onClick={decreaseFont}
              disabled={fontSize <= 14}
              title="تصغير الخط"
              className="p-1.5 text-stone-600 hover:text-stone-900 disabled:opacity-30 disabled:cursor-not-allowed rounded"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-mono px-1.5 text-stone-600 font-semibold">
              {fontSize}px
            </span>
            <button
              onClick={increaseFont}
              disabled={fontSize >= 24}
              title="تكبير الخط"
              className="p-1.5 text-stone-600 hover:text-stone-900 disabled:opacity-30 disabled:cursor-not-allowed rounded"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Bookmarked Questions Button */}
          <button
            onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
            title="الأسئلة المحفوظة للمراجعة"
            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 border transition-all ${
              showBookmarksOnly
                ? 'bg-amber-100 text-amber-900 border-amber-300'
                : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${bookmarkedIds.length > 0 ? 'fill-amber-400 text-amber-500' : ''}`} />
            <span className="hidden xs:inline">المحفوظات</span>
            {bookmarkedIds.length > 0 && (
              <span className="bg-amber-600 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                {bookmarkedIds.length}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
