import React, { useState } from 'react';
import { COMPARISONS_DATA } from '../data/comparisonsData';
import { GitCompare, Lightbulb, Sparkles, Layers } from 'lucide-react';

interface ComparisonsViewProps {
  fontSize: number;
  searchQuery: string;
}

export const ComparisonsView: React.FC<ComparisonsViewProps> = ({ fontSize, searchQuery }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'كافة المقارنات' },
    { id: 'المصطلحات الكلية', label: 'المصطلحات الكلية' },
    { id: 'عيوب فصاحة الكلام', label: 'عيوب فصاحة الكلام' },
    { id: 'مناهج البحث البلاغي', label: 'مناهج البحث البلاغي' },
    { id: 'مبحث الدلالة وعلم البيان', label: 'مبحث الدلالة وعلم البيان' },
    { id: 'أطوار العلوم البلاغية', label: 'أطوار العلوم البلاغية' },
  ];

  const filteredComparisons = COMPARISONS_DATA.filter((comp) => {
    if (selectedCategory !== 'all' && comp.category !== selectedCategory) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchesTitle = comp.title.toLowerCase().includes(q);
      const matchesSideA =
        comp.sideA.name.toLowerCase().includes(q) ||
        comp.sideA.points.some((p) => p.toLowerCase().includes(q));
      const matchesSideB =
        comp.sideB.name.toLowerCase().includes(q) ||
        comp.sideB.points.some((p) => p.toLowerCase().includes(q));
      const matchesSynthesis = comp.synthesis.toLowerCase().includes(q);
      return matchesTitle || matchesSideA || matchesSideB || matchesSynthesis;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-stone-900 text-white p-4 sm:p-6 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold mb-1">
            <GitCompare className="w-4 h-4" />
            <span>مصفوفة المقارنات البلاغية الجوهرية</span>
          </div>
          <h2 className="text-xl font-black text-white">
            جداول المقارنة والموازنة النقدية الشاملة
          </h2>
          <p className="text-xs text-stone-300 mt-1 max-w-2xl">
            مقارنات دقيقة تفرّق بين المصطلحات والمذاهب البلاغية المتشابهة لتفادي الخلط في ورقة الامتحان.
          </p>
        </div>
        <div className="text-xs font-mono text-stone-400 bg-stone-800 px-3 py-1.5 rounded-lg border border-stone-700">
          {filteredComparisons.length} مقارنات معتمدة
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap transition-colors ${
              selectedCategory === cat.id
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Comparison Cards Grid */}
      <div className="space-y-6">
        {filteredComparisons.map((comp) => (
          <div
            key={comp.id}
            className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs hover:border-stone-300 transition-all"
          >
            {/* Card Header */}
            <div className="bg-stone-100/80 px-4 py-3 border-b border-stone-200 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-700" />
                <h3 className="font-bold text-sm sm:text-base text-stone-900">{comp.title}</h3>
              </div>
              <span className="text-[11px] font-semibold text-stone-500 bg-white px-2 py-0.5 rounded border border-stone-200">
                {comp.category}
              </span>
            </div>

            {/* Side-by-Side Comparison Container */}
            <div className="p-4 sm:p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Side A */}
                <div className="rounded-xl border border-stone-200 bg-stone-50/50 p-4 space-y-3">
                  <div className="border-b border-stone-200 pb-2">
                    <h4 className="font-bold text-sm text-stone-900 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-600" />
                      <span>{comp.sideA.name}</span>
                    </h4>
                    {comp.sideA.scholarsOrExamples && (
                      <div className="text-[11px] text-stone-500 mt-0.5">
                        أبرز الأعلام: {comp.sideA.scholarsOrExamples}
                      </div>
                    )}
                  </div>

                  <ul className="space-y-2 text-stone-700" style={{ fontSize: `${fontSize - 1}px` }}>
                    {comp.sideA.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <span className="text-amber-600 text-xs font-bold mt-1">◀</span>
                        <span className="leading-relaxed">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Side B */}
                <div className="rounded-xl border border-stone-200 bg-stone-50/50 p-4 space-y-3">
                  <div className="border-b border-stone-200 pb-2">
                    <h4 className="font-bold text-sm text-stone-900 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-stone-700" />
                      <span>{comp.sideB.name}</span>
                    </h4>
                    {comp.sideB.scholarsOrExamples && (
                      <div className="text-[11px] text-stone-500 mt-0.5">
                        أبرز الأعلام: {comp.sideB.scholarsOrExamples}
                      </div>
                    )}
                  </div>

                  <ul className="space-y-2 text-stone-700" style={{ fontSize: `${fontSize - 1}px` }}>
                    {comp.sideB.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <span className="text-stone-700 text-xs font-bold mt-1">◀</span>
                        <span className="leading-relaxed">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Synthesis & Doctor Exam Tip */}
              <div className="mt-4 pt-4 border-t border-stone-200 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {/* Synthesis */}
                <div className="bg-amber-50/60 p-3 rounded-lg border border-amber-200/70">
                  <div className="font-bold text-amber-900 mb-1 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                    <span>الخلاصة والتركيب الفكري:</span>
                  </div>
                  <p className="text-stone-700 leading-relaxed">{comp.synthesis}</p>
                </div>

                {/* Professor Exam Tip */}
                <div className="bg-rose-50/60 p-3 rounded-lg border border-rose-200/70">
                  <div className="font-bold text-rose-900 mb-1 flex items-center gap-1">
                    <Lightbulb className="w-3.5 h-3.5 text-rose-700" />
                    <span>ملاحظة أستاذ المادة للامتحان:</span>
                  </div>
                  <p className="text-stone-700 leading-relaxed">{comp.doctorExamTip}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
