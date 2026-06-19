import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Play, CheckCircle, XCircle, Clock, RotateCcw, AlertTriangle } from 'lucide-react';
import subjectList from '../data/questionSubjects.json';

interface Question {
  id: string;
  questionNumber: number;
  text: string;
  type: string;
  options: Record<string, string>;
  correctAnswer: string;
}

type Phase = 'setup' | 'test' | 'results';

interface AnswerMap {
  [questionId: string]: string | null;
}

export default function QuickTestPage() {
  const [phase, setPhase] = useState<Phase>('setup');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [questionCount, setQuestionCount] = useState(10);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [timeElapsed, setTimeElapsed] = useState(0);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const toggleSubject = (id: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    if (phase === 'test') {
      timerRef.current = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase]);

  const startTest = useCallback(async () => {
    if (selectedSubjects.length === 0) return;

    const allLoaded: Question[] = [];
    for (const subId of selectedSubjects) {
      const sub = subjectList.find((s) => s.id === subId);
      if (!sub) continue;
      try {
        const mod = await import(`../data/questions/${sub.file}.json`);
        const data = mod.default || mod;
        if (Array.isArray(data)) {
          allLoaded.push(...data);
        }
      } catch {
        // skip missing files
      }
    }

    if (allLoaded.length === 0) return;

    const shuffled = [...allLoaded].sort(() => Math.random() - 0.5);
    const picked = shuffled.slice(0, Math.min(questionCount, shuffled.length));

    setQuestions(picked);
    const initialAnswers: AnswerMap = {};
    picked.forEach((q) => { initialAnswers[q.id] = null; });
    setAnswers(initialAnswers);
    setCurrentIndex(0);
    setTimeElapsed(0);
    setPhase('test');
  }, [selectedSubjects, questionCount]);

  const selectAnswer = (questionId: string, option: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const setIntegerAnswer = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value || null }));
  };

  const submitTest = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setPhase('results');
  }, []);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const stats = useMemo(() => {
    let correct = 0;
    let incorrect = 0;
    let unanswered = 0;
    questions.forEach((q) => {
      const userAns = answers[q.id];
      if (!userAns) unanswered++;
      else if (userAns === q.correctAnswer) correct++;
      else incorrect++;
    });
    return { correct, incorrect, unanswered, total: questions.length };
  }, [questions, answers]);

  const answeredCount = Object.values(answers).filter((v) => v !== null).length;

  if (phase === 'setup') {
    return (
      <div className="pt-32 pb-20 px-4 max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 text-[#FAFAFA]">QUICK TEST</h1>
          <p className="text-[#A1A1AA] text-lg font-bold">CONFIGURE YOUR SPRINT ASSESSMENT. PICK SUBJECTS AND QUESTION VOLUME.</p>
        </div>

        <div className="bg-[#09090B] border-2 border-[#3F3F46] p-10">
          <div className="mb-10">
            <label className="text-xs font-black tracking-widest text-[#DFE104] uppercase block mb-6">SELECT TARGET SUBJECTS</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {subjectList.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => toggleSubject(sub.id)}
                  className={`p-4 border-2 font-bold text-sm uppercase tracking-tight transition-all text-left ${selectedSubjects.includes(sub.id) ? 'bg-[#DFE104] text-black border-black' : 'bg-[#09090B] text-[#FAFAFA] border-[#3F3F46] hover:border-[#DFE104]'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 border-2 flex items-center justify-center text-xs font-black ${selectedSubjects.includes(sub.id) ? 'bg-black border-black text-[#DFE104]' : 'border-[#3F3F46]'}`}>
                      {selectedSubjects.includes(sub.id) ? '✓' : ''}
                    </div>
                    {sub.label}
                  </div>
                </button>
              ))}
            </div>
            {selectedSubjects.length === 0 && (
              <p className="text-rose-500 font-bold text-xs mt-3 uppercase flex items-center gap-2">
                <AlertTriangle size={14} /> select at least one subject
              </p>
            )}
          </div>

          <div className="mb-10">
            <label className="text-xs font-black tracking-widest text-[#DFE104] uppercase block mb-4">NUMBER OF QUESTIONS</label>
            <div className="flex gap-3 flex-wrap">
              {[5, 10, 15, 20, 25].map((n) => (
                <button
                  key={n}
                  onClick={() => setQuestionCount(n)}
                  className={`px-6 py-3 border-2 font-black transition-all ${questionCount === n ? 'bg-[#FAFAFA] text-black border-black' : 'bg-[#09090B] text-[#FAFAFA] border-[#3F3F46] hover:border-[#DFE104]'}`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={startTest}
            disabled={selectedSubjects.length === 0}
            className="w-full bg-[#DFE104] text-black border-2 border-black py-6 font-black text-2xl tracking-tighter hover:scale-[1.02] transition-transform disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-4"
          >
            <Play size={28} /> INITIATE TEST
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'results') {
    const percent = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;

    return (
      <div className="pt-32 pb-20 px-4 max-w-4xl mx-auto">
        <div className="bg-[#09090B] border-2 border-[#3F3F46] p-10 mb-10">
          <div className="text-center mb-10">
            <div className={`text-7xl font-black tracking-tighter mb-4 ${percent >= 60 ? 'text-[#DFE104]' : 'text-rose-500'}`}>{percent}%</div>
            <h1 className="text-4xl font-black uppercase text-[#FAFAFA] tracking-tight">ASSESSMENT COMPLETE</h1>
            <p className="text-[#A1A1AA] font-bold mt-2">TIME ELAPSED: {formatTime(timeElapsed)}</p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-10">
            <div className="p-6 bg-[#27272A]/40 border border-[#3F3F46] text-center">
              <div className="text-4xl font-black text-emerald-500">{stats.correct}</div>
              <div className="text-xs font-bold text-[#A1A1AA] uppercase tracking-widest mt-1">Correct</div>
            </div>
            <div className="p-6 bg-[#27272A]/40 border border-[#3F3F46] text-center">
              <div className="text-4xl font-black text-rose-500">{stats.incorrect}</div>
              <div className="text-xs font-bold text-[#A1A1AA] uppercase tracking-widest mt-1">Incorrect</div>
            </div>
            <div className="p-6 bg-[#27272A]/40 border border-[#3F3F46] text-center">
              <div className="text-4xl font-black text-[#A1A1AA]">{stats.unanswered}</div>
              <div className="text-xs font-bold text-[#A1A1AA] uppercase tracking-widest mt-1">Unanswered</div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => setPhase('setup')}
              className="bg-[#DFE104] text-black border-2 border-black px-12 py-5 font-black text-xl tracking-tighter hover:scale-105 transition-transform inline-flex items-center gap-3"
            >
              <RotateCcw size={24} /> TAKE ANOTHER TEST
            </button>
          </div>
        </div>

        <div className="space-y-6 max-w-3xl mx-auto">
          <h3 className="text-2xl font-black text-[#FAFAFA] uppercase tracking-tight mb-6">DETAILED REVIEW</h3>
          {questions.map((q, idx) => {
            const userAns = answers[q.id];
            const isCorrect = userAns === q.correctAnswer;
            const isUnanswered = !userAns;
            return (
              <div key={q.id} className={`p-6 border-2 bg-[#09090B] ${isCorrect ? 'border-emerald-700' : isUnanswered ? 'border-[#3F3F46]' : 'border-rose-700'}`}>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-8 h-8 bg-[#27272A] flex items-center justify-center font-black text-sm text-[#FAFAFA] shrink-0">
                    {idx + 1}
                  </div>
                  <p className="font-bold text-[#FAFAFA] leading-relaxed">{q.text}</p>
                </div>
                {q.type === 'Integer' ? (
                  <div className="ml-12 space-y-2">
                    <div className="flex gap-4">
                      <div className="p-3 border border-[#3F3F46] bg-[#27272A]/20">
                        <span className="text-xs font-bold text-[#A1A1AA] uppercase tracking-widest">Your answer: </span>
                        <span className="font-bold text-lg text-[#FAFAFA] ml-2">{userAns || '—'}</span>
                      </div>
                      <div className="p-3 border border-[#3F3F46] bg-[#27272A]/20">
                        <span className="text-xs font-bold text-[#A1A1AA] uppercase tracking-widest">Correct: </span>
                        <span className="font-bold text-lg text-emerald-400 ml-2">{q.correctAnswer}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2 ml-12">
                    {Object.entries(q.options).map(([key, val]) => {
                      const isSelected = userAns === key;
                      const isRight = key === q.correctAnswer;
                      let btnClass = 'bg-[#27272A]/20 border-[#3F3F46] text-[#A1A1AA]';
                      if (isRight) btnClass = 'bg-emerald-950/40 border-emerald-600 text-emerald-400';
                      else if (isSelected && !isRight) btnClass = 'bg-rose-950/40 border-rose-600 text-rose-400';
                      else if (isSelected) btnClass = 'bg-emerald-950/40 border-emerald-600 text-emerald-400';
                      return (
                        <div key={key} className={`p-3 border text-sm font-bold ${btnClass} transition-colors`}>
                          {key}. {val}
                        </div>
                      );
                    })}
                  </div>
                )}
                <div className="ml-12 mt-4 flex items-center gap-3">
                  {isCorrect && <CheckCircle size={16} className="text-emerald-500" />}
                  {!isUnanswered && !isCorrect && <XCircle size={16} className="text-rose-500" />}
                  {isUnanswered && <AlertTriangle size={16} className="text-[#A1A1AA]" />}
                  <span className={`text-xs font-bold uppercase tracking-widest ${isCorrect ? 'text-emerald-500' : isUnanswered ? 'text-[#A1A1AA]' : 'text-rose-500'}`}>
                    {isCorrect ? 'correct' : isUnanswered ? 'unanswered' : `incorrect — correct answer: ${q.correctAnswer}`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];

  return (
    <div className="pt-32 pb-20 px-4 max-w-4xl mx-auto">
      <div className="bg-[#09090B] border-2 border-[#3F3F46] p-6 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div className="flex items-center gap-4">
            <Clock size={20} className="text-[#DFE104]" />
            <span className="text-3xl font-black text-[#FAFAFA] tracking-tighter">{formatTime(timeElapsed)}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-[#A1A1AA]">{answeredCount}/{questions.length} answered</span>
            <div className="w-40 h-2 bg-[#27272A] border border-[#3F3F46]">
              <div className="h-full bg-[#DFE104] transition-all" style={{ width: `${(answeredCount / questions.length) * 100}%` }}></div>
            </div>
          </div>
          <button
            onClick={submitTest}
            className="bg-rose-600 text-white border-2 border-rose-800 px-6 py-3 font-black text-sm uppercase tracking-tight hover:bg-rose-500 transition-all"
          >
            SUBMIT TEST
          </button>
        </div>
      </div>

      <div className="bg-[#09090B] border-2 border-[#3F3F46] p-8 md:p-12">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-[#DFE104] text-black font-black text-lg flex items-center justify-center border-2 border-black">
            {currentIndex + 1}
          </div>
          <div>
            <span className="text-[#DFE104] font-black text-xs uppercase tracking-widest">Question {currentIndex + 1} of {questions.length}</span>
            <p className="text-[#A1A1AA] font-bold text-xs uppercase">{currentQ?.type}</p>
          </div>
        </div>

        <p className="text-2xl font-bold text-[#FAFAFA] leading-relaxed mb-10">{currentQ?.text}</p>

        <div className="space-y-3 mb-10">
          {currentQ?.type === 'Integer' ? (
            <div>
              <input
                type="text"
                inputMode="decimal"
                value={answers[currentQ.id] || ''}
                onChange={(e) => setIntegerAnswer(currentQ.id, e.target.value)}
                placeholder="ENTER YOUR NUMERIC ANSWER..."
                className="w-full p-5 bg-[#27272A]/40 border-2 border-[#3F3F46] focus:border-[#DFE104] text-[#FAFAFA] outline-none font-bold text-xl uppercase transition-colors"
              />
              <p className="text-xs text-[#A1A1AA] font-bold mt-2 uppercase tracking-widest">Enter a numeric value (integer or decimal)</p>
            </div>
          ) : (
            currentQ && Object.entries(currentQ.options).map(([key, val]) => {
              const isSelected = answers[currentQ.id] === key;
              return (
                <button
                  key={key}
                  onClick={() => selectAnswer(currentQ.id, key)}
                  className={`w-full text-left p-5 border-2 font-bold text-lg transition-all ${isSelected ? 'bg-[#DFE104] text-black border-black' : 'bg-[#27272A]/20 border-[#3F3F46] text-[#FAFAFA] hover:border-[#DFE104]'}`}
                >
                  <span className="mr-4 font-black">{key}.</span> {val}
                </button>
              );
            })
          )}
        </div>

        <div className="flex justify-between items-center pt-6 border-t border-[#3F3F46]">
          <button
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="px-6 py-3 border-2 border-[#3F3F46] text-[#FAFAFA] font-bold hover:bg-[#27272A] transition-all disabled:opacity-30 disabled:cursor-not-allowed tracking-tight uppercase text-sm"
          >
            ← PREVIOUS
          </button>

          <div className="flex gap-2">
            {questions.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-8 h-8 text-xs font-black border-2 transition-all ${answers[questions[idx].id] ? 'bg-[#DFE104] text-black border-black' : 'bg-[#09090B] text-[#A1A1AA] border-[#3F3F46]'} ${currentIndex === idx ? 'ring-2 ring-[#FAFAFA]' : ''}`}
              >
                {idx + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
            disabled={currentIndex === questions.length - 1}
            className="px-6 py-3 border-2 border-[#3F3F46] text-[#FAFAFA] font-bold hover:bg-[#27272A] transition-all disabled:opacity-30 disabled:cursor-not-allowed tracking-tight uppercase text-sm"
          >
            NEXT →
          </button>
        </div>
      </div>
    </div>
  );
}
