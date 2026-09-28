import React from 'react';
import { BookOpen, FileCheck2, GitCompare, Users, Quote, Sparkles } from 'lucide-react';
import { TabType } from '../types';

interface NavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'full_book' as TabType, label: 'نص الكتاب الكامل والشرح', icon: BookOpen, shortLabel: 'نص الكتاب' },
    { id: 'summary' as TabType, label: 'ملخص النقاط الأساسية', icon: Sparkles, shortLabel: 'الملخص' },
    { id: 'exam' as TabType, label: 'بنك أسئلة الدكتور والامتحانات', icon: FileCheck2, shortLabel: 'الامتحانات' },
    { id: 'comparisons' as TabType, label: 'مصفوفة المقارنات', icon: GitCompare, shortLabel: 'مقارنات' },
    { id: 'scholars' as TabType, label: 'موسوعة العلماء وإسهاماتهم', icon: Users, shortLabel: 'العلماء' },
    { id: 'shawahid' as TabType, label: 'دليل الشواهد والتحليل', icon: Quote, shortLabel: 'الشواهد' },
    { id: 'terms' as TabType, label: 'تبسيط المصطلحات', icon: Sparkles, shortLabel: 'المفاهيم' },
  ];

  return (
    <>
      {/* Desktop Navigation Tabs (Horizontal Top Bar) */}
      <nav className="hidden md:block bg-stone-100/90 border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-none">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-stone-900 text-white shadow-sm'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-stone-500'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
          <div className="text-[11px] text-stone-500 font-medium shrink-0">
            الفصل الدراسي الأول | كلية التربية
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation Bar (Sticky Bottom) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-stone-200 shadow-lg px-2 py-1">
        <div className="flex items-center justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center justify-center py-1 px-1.5 rounded-lg transition-colors flex-1 min-w-0 ${
                  isActive ? 'text-amber-600 font-bold' : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                <div
                  className={`p-1 rounded-full transition-all ${
                    isActive ? 'bg-amber-100 text-amber-700' : 'text-stone-500'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] leading-tight mt-0.5 truncate w-full text-center">
                  {tab.shortLabel}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};
