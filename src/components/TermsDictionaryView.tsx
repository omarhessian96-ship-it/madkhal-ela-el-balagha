import React, { useState } from 'react';
import { TERMS_DICTIONARY, TermItem } from '../data/termsDictionary';
import { Sparkles, BookOpen, Search, CheckCircle2, HelpCircle } from 'lucide-react';

interface TermsDictionaryViewProps {
  fontSize: number;
  searchQuery: string;
}

export const TermsDictionaryView: React.FC<TermsDictionaryViewProps> = ({
  fontSize,
  searchQuery,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'كافة المصطلحات' },
    { id: 'المصطلحات الكلية', label: 'المصطلحات الكلية' },
    { id: 'فصاحة الكلمة', label: 'فصاحة الكلمة' },
    { id: 'فصاحة الكلام', label: 'فصاحة الكلام' },
    { id: 'علم المعاني', label: 'علم المعاني' },
    { id: 'علوم البلاغة', label: 'علوم البلاغة' },
    { id: 'مبحث الدلالة', label: 'مبحث الدلالة' },
  ];

  const filteredTerms = TERMS_DICTIONARY.filter((item) => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        item.term.toLowerCase().includes(q) ||
        item.simplifiedExplanation.toLowerCase().includes(q) ||
        item.classicalContext.toLowerCase().includes(q) ||
        item.example.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-stone-900 text-white p-4 sm:p-6 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold mb-1">
            <Sparkles className="w-4 h-4" />
            <span>قاموس تبسيط المصطلحات البلاغية واللغوية</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            شرح المفاهيم البلاغية بلغة معاصرة ميسرة
          </h2>
          <p className="text-xs text-stone-300 mt-1 max-w-2xl leading-relaxed">
            تمت صياغة هذا القسم خصيصاً لفك غموض التعبيرات التراثية القديمة، وتقريب المعاني بأسلوب موجز وسهل الفهم يلائم المذاكرة السريعة عبر الهاتف المحمول.
          </p>
        </div>
        <div className="text-xs font-mono text-stone-300 bg-stone-800 px-3 py-1.5 rounded-lg border border-stone-700">
          {filteredTerms.length} مصطلحاً مبسطاً
        </div>
      </div>

      {/* Category Tabs */}
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

      {/* Terms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTerms.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs hover:border-amber-300 transition-all p-4 space-y-3"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-stone-100 pb-2">
              <h3 className="font-bold text-base text-stone-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>{item.term}</span>
              </h3>
              <span className="text-[10px] bg-stone-100 text-stone-600 font-semibold px-2 py-0.5 rounded">
                {item.category}
              </span>
            </div>

            {/* Simplified Meaning */}
            <div>
              <div className="text-[11px] font-bold text-amber-900 mb-1 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                <span>المعنى المبسط الميسر:</span>
              </div>
              <p
                className="text-stone-800 leading-relaxed font-semibold"
                style={{ fontSize: `${fontSize - 1}px` }}
              >
                {item.simplifiedExplanation}
              </p>
            </div>

            {/* Classical Context */}
            <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-200 text-xs text-stone-700 leading-relaxed">
              <span className="font-bold text-stone-800">الأصل التراثي بالكتاب: </span>
              {item.classicalContext}
            </div>

            {/* Example */}
            {item.example && (
              <div className="text-xs text-stone-600 bg-amber-50/50 p-2.5 rounded border border-amber-100 leading-relaxed font-amiri">
                <span className="font-sans font-bold text-amber-900">مثال توضيحي: </span>
                {item.example}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
