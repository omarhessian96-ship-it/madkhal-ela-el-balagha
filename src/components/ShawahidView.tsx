import React, { useState } from 'react';
import { SHAWAHID_DATA } from '../data/shawahidData';
import { Shahid } from '../types';
import { Quote, AlertCircle, HelpCircle, Layers, CheckCircle2 } from 'lucide-react';

interface ShawahidViewProps {
  fontSize: number;
  searchQuery: string;
}

export const ShawahidView: React.FC<ShawahidViewProps> = ({ fontSize, searchQuery }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'كافة الشواهد' },
    { id: 'تنافر حروف', label: 'تنافر حروف' },
    { id: 'تنافر كلمات', label: 'تنافر كلمات' },
    { id: 'مخالفة قياس', label: 'مخالفة قياس' },
    { id: 'غرابة', label: 'غرابة لفظية' },
    { id: 'تعقيد لفظي', label: 'تعقيد لفظي' },
    { id: 'تعقيد معنوي', label: 'تعقيد معنوي' },
    { id: 'فصاحة وإعجاز', label: 'فصاحة وإعجاز' },
    { id: 'بديع وبلاغة', label: 'بديع وبلاغة' },
  ];

  const filteredShawahid = SHAWAHID_DATA.filter((sh) => {
    if (selectedCategory !== 'all' && sh.category !== selectedCategory) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchesText = sh.text.toLowerCase().includes(q);
      const matchesAuthor = sh.author.toLowerCase().includes(q);
      const matchesDiagnosis = sh.diagnosis.toLowerCase().includes(q);
      const matchesExpl = sh.defectOrBeautyExplanation.toLowerCase().includes(q);
      return matchesText || matchesAuthor || matchesDiagnosis || matchesExpl;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Intro Banner */}
      <div className="bg-stone-900 text-white p-4 sm:p-6 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold mb-1">
            <Quote className="w-4 h-4" />
            <span>معجم الشواهد البلاغية والتحليل النقدي</span>
          </div>
          <h2 className="text-xl font-black text-white">
            الشواهد الشعرية والقرآنية وعيوب الفصاحة
          </h2>
          <p className="text-xs text-stone-300 mt-1 max-w-2xl">
            شرح تفصيلي لكل شاهد قرآني وشعري ورد في المقرر مع بيان العيب البلاغي أو وجه الإعجاز، وطريقة وروده في أسئلة الامتحان.
          </p>
        </div>
        <div className="text-xs font-mono text-stone-400 bg-stone-800 px-3 py-1.5 rounded-lg border border-stone-700">
          {filteredShawahid.length} شاهداً معتمداً
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

      {/* Shawahid Cards List */}
      <div className="space-y-4">
        {filteredShawahid.map((sh) => (
          <div
            key={sh.id}
            className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs hover:border-stone-300 transition-all"
          >
            {/* Header */}
            <div className="bg-stone-100/70 px-4 py-2.5 border-b border-stone-200 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-stone-800">{sh.author}</span>
                <span className="text-stone-400">·</span>
                <span className="text-stone-500">{sh.chapterTitle}</span>
              </div>
              <span
                className={`font-bold px-2.5 py-0.5 rounded text-[11px] ${
                  sh.category === 'فصاحة وإعجاز' || sh.category === 'بديع وبلاغة'
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                    : 'bg-rose-100 text-rose-900 border border-rose-200'
                }`}
              >
                {sh.category}
              </span>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-5 space-y-3.5">
              {/* The Text in Large Amiri Font */}
              <div
                className="font-amiri font-bold text-stone-900 leading-relaxed text-right p-3 bg-stone-50/70 rounded-lg border border-stone-100"
                style={{ fontSize: `${fontSize + 3}px` }}
              >
                {sh.text}
              </div>

              {/* Diagnosis */}
              <div className="flex items-start gap-2 text-xs font-bold text-stone-900">
                <Layers className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>التشخيص البلاغي: {sh.diagnosis}</span>
              </div>

              {/* Explanation */}
              <div className="text-xs sm:text-sm text-stone-700 leading-relaxed space-y-1">
                <div className="font-semibold text-stone-800 text-xs">
                  التحليل وعلة العيب أو وجه الفصاحة:
                </div>
                <p className="leading-relaxed">{sh.defectOrBeautyExplanation}</p>
              </div>

              {/* Doctor's Exam Question Pattern */}
              <div className="bg-amber-50/70 p-3 rounded-lg border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <span className="font-bold">صيغة سؤال الامتحان المتوقعة على هذا الشاهد: </span>
                  «{sh.doctorQuestionPattern}»
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
