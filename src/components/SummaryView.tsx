import React from 'react';
import { EXAM_SUMMARY_DATA } from '../data/summaryData';
import { Sparkles, AlertTriangle, CheckCircle, Zap, BookOpen } from 'lucide-react';

interface SummaryViewProps {
  fontSize: number;
}

export const SummaryView: React.FC<SummaryViewProps> = ({ fontSize }) => {
  return (
    <div className="space-y-6">
      {/* Golden Banner */}
      <div className="bg-gradient-to-r from-amber-900 via-stone-900 to-amber-950 text-white p-5 sm:p-7 rounded-xl shadow-md space-y-2">
        <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
          <Zap className="w-4 h-4" />
          <span>المراجعة المركزة السريعة · ليلة الامتحان</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white">
          الملخص الذهبي لكتاب مدخل إلى البلاغة العربية
        </h2>
        <p className="text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed">
          عصارة المقرر في معادلات بلاغية مكثفة، وأهم النقاط ذات التردد العالي في الامتحانات، وتنبيهات حاسمة بالأخطاء القاتلة لتفادي خسارة الدرجات.
        </p>
      </div>

      {/* Chapters Summaries */}
      <div className="space-y-6">
        {EXAM_SUMMARY_DATA.map((chSummary, idx) => (
          <div
            key={chSummary.id}
            className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs"
          >
            {/* Header */}
            <div className="bg-stone-100/90 px-4 py-3 border-b border-stone-200 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-amber-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                {idx + 1}
              </span>
              <h3 className="font-bold text-sm sm:text-base text-stone-900">
                {chSummary.chapterTitle}
              </h3>
            </div>

            <div className="p-4 sm:p-5 space-y-5">
              {/* Golden Formulas / Equations */}
              {chSummary.goldenFormulas.length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>المعادلات والضوابط البلاغية المحورية:</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {chSummary.goldenFormulas.map((formula, fIdx) => (
                      <div
                        key={fIdx}
                        className="bg-amber-50/70 p-3 rounded-lg border border-amber-200/80 space-y-1"
                      >
                        <div className="text-[11px] font-bold text-stone-600">
                          {formula.label}:
                        </div>
                        <div className="font-amiri font-bold text-amber-950 text-sm">
                          {formula.formula}
                        </div>
                        <div className="text-[11px] text-stone-600 pt-1 border-t border-amber-200/50">
                          {formula.note}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* High Yield Exam Points */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>نقاط الحفظ والاستذكار ذات الأولوية القصوى (High Yield):</span>
                </div>
                <ul className="space-y-1.5 text-xs text-stone-800" style={{ fontSize: `${fontSize - 1}px` }}>
                  {chSummary.highYieldPoints.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2 bg-stone-50 p-2 rounded border border-stone-100">
                      <span className="text-emerald-600 font-bold mt-0.5">✔</span>
                      <span className="leading-relaxed">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Common Exam Mistakes / Traps */}
              {chSummary.commonExamMistakes.length > 0 && (
                <div className="bg-rose-50/70 p-3.5 rounded-lg border border-rose-200 space-y-2">
                  <div className="text-xs font-bold text-rose-900 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                    <span>فخاخ الامتحانات وأخطاء الطلاب القاتلة:</span>
                  </div>
                  <ul className="space-y-1 text-xs text-rose-800">
                    {chSummary.commonExamMistakes.map((mistake, mIdx) => (
                      <li key={mIdx} className="flex items-start gap-1.5">
                        <span className="text-rose-600 font-bold">⛔</span>
                        <span className="leading-relaxed">{mistake}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
