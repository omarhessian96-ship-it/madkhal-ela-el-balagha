import React, { useState } from 'react';
import { SCHOLARS_DATA } from '../data/scholarsData';
import { Scholar } from '../types';
import { Users, BookOpen, Quote, Award, Search, Calendar, List, LayoutGrid, Sparkles } from 'lucide-react';

interface ScholarsViewProps {
  fontSize: number;
  searchQuery: string;
}

export const ScholarsView: React.FC<ScholarsViewProps> = ({ fontSize, searchQuery }) => {
  const [selectedSchool, setSelectedSchool] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'cards' | 'summary_table'>('cards');

  const schools = [
    { id: 'all', label: 'كافة العلماء والأعلام' },
    { id: 'المدرسة الأدبية', label: 'المدرسة الأدبية' },
    { id: 'المدرسة التعليمية', label: 'المدرسة التعليمية' },
    { id: 'المشارقة', label: 'المشارقة' },
    { id: 'المغاربة', label: 'المغاربة' },
    { id: 'مرحلة التأسيس والنشأة', label: 'مرحلة التأسيس' },
  ];

  const filteredScholars = SCHOLARS_DATA.filter((sc) => {
    if (selectedSchool !== 'all' && sc.school !== selectedSchool) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchesName = sc.name.toLowerCase().includes(q);
      const matchesStance = sc.mainStance.toLowerCase().includes(q);
      const matchesRole = sc.detailedRole.toLowerCase().includes(q);
      const matchesBooks = sc.books.some((b) => b.toLowerCase().includes(q));
      return matchesName || matchesStance || matchesRole || matchesBooks;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Intro Banner */}
      <div className="bg-stone-900 text-white p-4 sm:p-6 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold mb-1">
            <Users className="w-4 h-4" />
            <span>موسوعة أئمة وعلماء البلاغة العربية</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            سجل العلماء وإسهاماتهم التاريخية والعلمية
          </h2>
          <p className="text-xs text-stone-300 mt-1 max-w-2xl leading-relaxed">
            توثيق دقيق وشامل لأعلام البلاغة المذكورين في المقرر، مع بيان دور كل عالم في نشأة العلم وتطوره، وأهم كتبه ومواقفه النقدية.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="bg-stone-800 p-1 rounded-lg border border-stone-700 flex items-center gap-1">
            <button
              onClick={() => setViewMode('cards')}
              className={`p-1.5 rounded text-xs flex items-center gap-1 transition-colors ${
                viewMode === 'cards' ? 'bg-amber-500 text-stone-900 font-bold' : 'text-stone-300 hover:text-white'
              }`}
              title="عرض البطاقات التفصيلية"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">بطاقات</span>
            </button>
            <button
              onClick={() => setViewMode('summary_table')}
              className={`p-1.5 rounded text-xs flex items-center gap-1 transition-colors ${
                viewMode === 'summary_table' ? 'bg-amber-500 text-stone-900 font-bold' : 'text-stone-300 hover:text-white'
              }`}
              title="عرض الجدول الموجز السريع"
            >
              <List className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">جدول موجز</span>
            </button>
          </div>
          <div className="text-xs font-mono text-stone-300 bg-stone-800 px-3 py-1.5 rounded-lg border border-stone-700">
            {filteredScholars.length} عالماً
          </div>
        </div>
      </div>

      {/* School Filter Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {schools.map((sch) => (
          <button
            key={sch.id}
            onClick={() => setSelectedSchool(sch.id)}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap transition-colors ${
              selectedSchool === sch.id
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            {sch.label}
          </button>
        ))}
      </div>

      {/* VIEW MODE 1: SUMMARY TIMELINE TABLE */}
      {viewMode === 'summary_table' ? (
        <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
          <div className="p-3.5 bg-stone-100 border-b border-stone-200 text-xs font-bold text-stone-800 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>ملخص موجز لجميع العلماء وإسهاماتهم الرئيسية (مرتبة زمنياً)</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold">
                <tr>
                  <th className="p-3 w-16">الرقم</th>
                  <th className="p-3 w-44">العالم وسنة الوفاة</th>
                  <th className="p-3 w-36">المدرسة والاتجاه</th>
                  <th className="p-3">الإسهام البلاغي والتاريخي الرئيسي</th>
                  <th className="p-3 w-48">أبرز المصنفات المذكورة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {filteredScholars.map((sc, idx) => (
                  <tr key={sc.id} className="hover:bg-amber-50/40 transition-colors">
                    <td className="p-3 font-mono text-stone-400 font-bold">{idx + 1}</td>
                    <td className="p-3 font-bold text-stone-900">
                      <div>{sc.name}</div>
                      <div className="text-[11px] font-mono text-amber-700 font-normal">
                        {sc.deathYear || 'الصدر الأول'}
                      </div>
                    </td>
                    <td className="p-3">
                      <span className="text-[11px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded font-medium">
                        {sc.school}
                      </span>
                    </td>
                    <td className="p-3 text-stone-800 leading-relaxed">
                      <div className="font-semibold text-stone-900 mb-0.5">{sc.mainStance}</div>
                      <div className="text-stone-600 text-[11px]">{sc.detailedRole}</div>
                    </td>
                    <td className="p-3 text-stone-700">
                      {sc.books.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {sc.books.map((b, bIdx) => (
                            <span key={bIdx} className="bg-stone-100 text-[10px] px-1.5 py-0.5 rounded font-medium">
                              «{b}»
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-stone-400 text-[11px]">مرويات في كتب التراث</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* VIEW MODE 2: DETAILED CARDS */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredScholars.map((scholar) => (
            <div
              key={scholar.id}
              className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs hover:border-stone-300 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Card Header */}
                <div className="bg-stone-100/70 p-4 border-b border-stone-200 flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-base text-stone-900 leading-snug">
                      {scholar.name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-stone-500 mt-1">
                      {scholar.deathYear && (
                        <span className="flex items-center gap-1 font-mono text-amber-800 font-semibold">
                          <Calendar className="w-3 h-3 text-stone-400" />
                          توفي: {scholar.deathYear}
                        </span>
                      )}
                      {scholar.century && (
                        <>
                          <span>·</span>
                          <span>{scholar.century}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <span className="text-[11px] font-bold text-amber-900 bg-amber-100/80 px-2 py-0.5 rounded border border-amber-200 shrink-0">
                    {scholar.school}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-4 space-y-3">
                  {/* Notable Books */}
                  {scholar.books.length > 0 && (
                    <div>
                      <div className="text-[11px] font-bold text-stone-500 mb-1 flex items-center gap-1">
                        <BookOpen className="w-3 h-3 text-stone-400" />
                        <span>أهم المصنفات والمؤلفات:</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {scholar.books.map((b, bIdx) => (
                          <span
                            key={bIdx}
                            className="text-xs bg-stone-100 text-stone-800 px-2 py-0.5 rounded font-medium"
                          >
                            «{b}»
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Main Stance */}
                  <div>
                    <div className="text-[11px] font-bold text-stone-500 mb-0.5">
                      الإسهام الرئيسي والموقف البلاغي:
                    </div>
                    <p className="text-xs text-stone-800 leading-relaxed font-semibold">
                      {scholar.mainStance}
                    </p>
                  </div>

                  {/* Detailed Role */}
                  <div>
                    <div className="text-[11px] font-bold text-stone-500 mb-0.5">
                      الأهمية التاريخية والعلمية في المقرر:
                    </div>
                    <p
                      className="text-stone-700 leading-relaxed"
                      style={{ fontSize: `${fontSize - 2}px` }}
                    >
                      {scholar.detailedRole}
                    </p>
                  </div>

                  {/* Key Quotes */}
                  {scholar.keyQuotes.length > 0 && (
                    <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-200 space-y-1">
                      <div className="text-[10px] font-bold text-stone-500 flex items-center gap-1">
                        <Quote className="w-3 h-3 text-amber-600" />
                        <span>من أقواله المأثورة المعتمدة:</span>
                      </div>
                      {scholar.keyQuotes.map((q, qIdx) => (
                        <div
                          key={qIdx}
                          className="text-xs font-amiri text-stone-800 italic leading-relaxed"
                        >
                          {q}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Exam Significance Footer */}
              {scholar.examSignificance && (
                <div className="bg-amber-50/70 p-3 border-t border-amber-200 text-xs text-amber-900 flex items-start gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-700 mt-0.5 shrink-0" />
                  <span className="leading-snug">
                    <strong>أهميته في الامتحان: </strong>
                    {scholar.examSignificance}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
