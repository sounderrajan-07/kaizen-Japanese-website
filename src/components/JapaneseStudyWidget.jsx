import React, { useState } from 'react';
import { Sparkles, RotateCw, Volume2, CheckCircle2, BookOpen, Award } from 'lucide-react';

export default function JapaneseStudyWidget() {
  const [activeKanjiIndex, setActiveKanjiIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedQuizOption, setSelectedQuizOption] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const kanjiCards = [
    {
      kanji: "改善",
      hiragana: "かいぜん",
      romaji: "Kaizen",
      meaning: "Continuous Improvement / Change for the Better",
      tamil: "தொடர் முன்னேற்றம் (காய்சென்)",
      strokeCount: "19 Strokes",
      onyomi: "KAI • ZEN",
      level: "Core Philosophy",
      example: "毎日、少しずつ改善しましょう (Let's improve a little bit every day)"
    },
    {
      kanji: "夢",
      hiragana: "ゆめ",
      romaji: "Yume",
      meaning: "Dream / Aspiration",
      tamil: "கனவு / லட்சியம்",
      strokeCount: "13 Strokes",
      onyomi: "MU • BOU",
      level: "JLPT N4",
      example: "日本で働く夢を叶える (Make the dream of working in Japan come true)"
    },
    {
      kanji: "挑戦",
      hiragana: "ちょうせん",
      romaji: "Chousen",
      meaning: "Challenge / Attempt",
      tamil: "சவால் / முயற்சி",
      strokeCount: "17 Strokes",
      onyomi: "CHOU • SEN",
      level: "JLPT N3",
      example: "新しい言語に挑戦する (Take up the challenge of a new language)"
    },
    {
      kanji: "成功",
      hiragana: "せいこう",
      romaji: "Seikou",
      meaning: "Success / Achievement",
      tamil: "வெற்றி / சாதனை",
      strokeCount: "11 Strokes",
      onyomi: "SEI • KOU",
      level: "JLPT N3",
      example: "面接に成功しました (Succeeded in the job interview)"
    },
    {
      kanji: "桜",
      hiragana: "さくら",
      romaji: "Sakura",
      meaning: "Cherry Blossom (Symbol of New Beginnings)",
      tamil: "செர்ரி மலர் (புதிய தொடக்கம்)",
      strokeCount: "10 Strokes",
      onyomi: "OU",
      level: "JLPT N4",
      example: "春に桜が美しく咲きます (Cherry blossoms bloom beautifully in spring)"
    }
  ];

  const currentKanji = kanjiCards[activeKanjiIndex];

  const handleNextKanji = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setActiveKanjiIndex((prev) => (prev + 1) % kanjiCards.length);
    }, 150);
  };

  const quiz = {
    question: "What is the Japanese greeting for 'Good afternoon / Hello'?",
    options: [
      { text: "Ohayou Gozaimasu (おはようございます)", isCorrect: false },
      { text: "Konnichiwa (こんにちは)", isCorrect: true },
      { text: "Konbanwa (こんばんは)", isCorrect: false },
      { text: "Arigatou Gozaimasu (ありがとうございます)", isCorrect: false }
    ],
    explanation: "'Konnichiwa' (こんにちは) is the universal greeting used from late morning until late afternoon!"
  };

  const handleQuizSelect = (idx) => {
    if (quizSubmitted) return;
    setSelectedQuizOption(idx);
    setQuizSubmitted(true);
  };

  return (
    <div className="py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 bg-red-950/80 dark:bg-red-950/80 bg-red-100 text-red-600 dark:text-red-300 border border-red-500/30 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Japanese Study Zone</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white">
            Experience How You Will <span className="text-red-600">Learn Japanese</span>
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Interactive Kanji flip cards and quick Japanese quizzes taught through Tamil and English at our Coimbatore campus.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: 3D Animated Kanji Flashcard */}
          <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-white dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Kanji of the Day • Card {activeKanjiIndex + 1} of {kanjiCards.length}</span>
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-neutral-100 dark:bg-black text-neutral-600 dark:text-neutral-300 font-semibold border border-neutral-200 dark:border-neutral-800">
                  {currentKanji.level}
                </span>
              </div>

              {/* 3D Flip Card Container */}
              <div 
                onClick={() => setIsFlipped(!isFlipped)}
                className="perspective-1000 cursor-pointer select-none group min-h-[260px] flex items-center justify-center my-2"
              >
                <div className={`w-full h-full relative duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                  
                  {/* Front of Card */}
                  <div className="w-full h-full backface-hidden bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900 border-2 border-dashed border-red-500/40 rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-inner">
                    <div className="text-6xl sm:text-7xl font-black font-japanese text-neutral-900 dark:text-white tracking-wider group-hover:scale-105 transition-transform duration-300 text-red-600 dark:text-red-500">
                      {currentKanji.kanji}
                    </div>
                    <div className="text-lg font-bold text-neutral-700 dark:text-neutral-300 mt-3 font-japanese">
                      {currentKanji.hiragana} ({currentKanji.romaji})
                    </div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 flex items-center gap-1.5 bg-white dark:bg-black/40 px-3 py-1 rounded-full border border-neutral-200 dark:border-neutral-800">
                      <RotateCw className="w-3 h-3 text-red-500 animate-spin" />
                      <span>Click to flip and reveal Tamil & English meaning</span>
                    </p>
                  </div>

                  {/* Back of Card */}
                  <div className="w-full h-full backface-hidden rotate-y-180 absolute inset-0 bg-neutral-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between border-2 border-red-500 shadow-2xl">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                        <span className="font-japanese text-2xl font-bold text-red-400">{currentKanji.kanji}</span>
                        <span className="text-xs text-neutral-400">{currentKanji.strokeCount}</span>
                      </div>
                      <div className="text-base font-bold text-white mt-1">
                        {currentKanji.meaning}
                      </div>
                      <div className="text-sm font-semibold text-red-400">
                        {currentKanji.tamil}
                      </div>
                    </div>

                    <div className="bg-black/60 p-3 rounded-xl border border-neutral-800 text-xs space-y-1 my-2">
                      <div className="text-neutral-400 font-medium">On'yomi Reading: <strong className="text-white">{currentKanji.onyomi}</strong></div>
                      <div className="text-neutral-300 italic font-japanese">"{currentKanji.example}"</div>
                    </div>

                    <div className="text-center text-[11px] text-neutral-400 pt-1">
                      Click anywhere to flip back
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <span className="text-xs text-neutral-500 dark:text-neutral-400">
                Taught with native stroke-order techniques
              </span>
              <button
                onClick={handleNextKanji}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-md shadow-red-600/30"
              >
                <span>Next Kanji</span>
                <RotateCw className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Right Column: JLPT Mini Challenge Quiz */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-white dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" />
                  <span>JLPT N5 Mini Test</span>
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300">
                  Beginner Quiz
                </span>
              </div>

              <h4 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white leading-snug">
                {quiz.question}
              </h4>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                Select your answer below to test your foundation:
              </p>

              {/* Options */}
              <div className="space-y-2.5 mt-5">
                {quiz.options.map((opt, i) => {
                  const isSelected = selectedQuizOption === i;
                  let btnStyle = "bg-neutral-50 dark:bg-black/40 border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 hover:border-red-500";
                  
                  if (quizSubmitted) {
                    if (opt.isCorrect) {
                      btnStyle = "bg-green-500/10 border-green-500 text-green-600 dark:text-green-400 font-bold";
                    } else if (isSelected) {
                      btnStyle = "bg-red-500/10 border-red-500 text-red-600 dark:text-red-400 line-through";
                    }
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => handleQuizSelect(i)}
                      className={`w-full p-3 rounded-xl border text-xs sm:text-sm text-left transition flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{opt.text}</span>
                      {quizSubmitted && opt.isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {quizSubmitted && (
                <div className="mt-4 p-3 rounded-xl bg-neutral-100 dark:bg-black/60 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-700 dark:text-neutral-300 animate-in fade-in">
                  <strong className="text-red-600 dark:text-red-400">Explanation: </strong>
                  {quiz.explanation}
                </div>
              )}
            </div>

            <div className="pt-4 mt-4 border-t border-neutral-200 dark:border-neutral-800">
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Want to learn with native fluency? Our Coimbatore offline batch starts with conversational drills every session.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

