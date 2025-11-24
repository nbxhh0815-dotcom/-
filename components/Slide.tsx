import React from 'react';
import { SlideData, SlideType } from '../types';
import { Sword, Scroll, Skull, FlaskConical, Dna, Zap } from 'lucide-react';

interface SlideProps {
  data: SlideData;
  isActive: boolean;
}

const Slide: React.FC<SlideProps> = ({ data, isActive }) => {
  if (!isActive) return null;

  const getBackground = (type: SlideType) => {
    switch (type) {
      case SlideType.TITLE:
        return 'bg-gradient-to-br from-green-900 to-black pattern-checkered';
      case SlideType.VS:
        return 'bg-gradient-to-r from-red-900 via-black to-blue-900';
      case SlideType.CONCLUSION:
        return 'bg-gradient-to-t from-yellow-700 to-orange-900';
      default:
        return 'bg-stone-900';
    }
  };

  const getIcon = (meta?: string) => {
    switch(meta) {
      case 'Villain aura': return <Skull className="w-24 h-24 text-purple-500 animate-pulse" />;
      case 'Sword reveal': return <Sword className="w-24 h-24 text-blue-400 rotate-45" />;
      case 'Water breathing': return <Zap className="w-24 h-24 text-cyan-400 animate-bounce" />;
      case 'Hero stance': return <Scroll className="w-24 h-24 text-green-400" />;
      default: return <Dna className="w-24 h-24 text-white/50" />;
    }
  };

  // Speed lines effect for manga feel
  const SpeedLines = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[repeating-conic-gradient(from_0deg,transparent_0deg,transparent_2deg,#fff_2.1deg,transparent_2.2deg)] animate-spin-slow" style={{ animationDuration: '20s' }}></div>
    </div>
  );

  return (
    <div className={`w-full h-full flex flex-col items-center justify-center p-8 relative overflow-hidden border-[12px] border-black ${getBackground(data.type)}`}>
      {/* Decorative Corners */}
      <div className="absolute top-0 left-0 w-16 h-16 border-t-8 border-l-8 border-white z-10"></div>
      <div className="absolute top-0 right-0 w-16 h-16 border-t-8 border-r-8 border-white z-10"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 border-b-8 border-l-8 border-white z-10"></div>
      <div className="absolute bottom-0 right-0 w-16 h-16 border-b-8 border-r-8 border-white z-10"></div>

      {data.type === SlideType.VS && <SpeedLines />}

      <div className="z-20 max-w-5xl w-full flex flex-col items-center gap-8">
        {/* Japanese Vertical Text Effect */}
        {data.japaneseTitle && (
          <div className="absolute right-8 top-1/4 writing-vertical-rl text-6xl font-black text-red-600 opacity-80 select-none manga-font tracking-widest drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]">
            {data.japaneseTitle}
          </div>
        )}

        <div className="mb-4 text-center relative">
           <h1 className="text-6xl md:text-8xl font-black text-white stroke-black manga-font drop-shadow-lg transform -rotate-2">
            {data.title}
          </h1>
          <div className="h-2 w-full bg-red-600 mt-2 skew-x-12"></div>
        </div>

        <div className="flex items-center gap-8 w-full justify-center">
            {getIcon(data.visualMeta)}
            
            <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-2xl w-full transform rotate-1">
                <ul className="space-y-4">
                {data.content.map((line, idx) => (
                    <li key={idx} className="text-xl md:text-2xl font-bold text-black flex items-start gap-3 manga-font">
                    <span className="text-red-600">➤</span>
                    {line}
                    </li>
                ))}
                </ul>
            </div>
        </div>
      </div>

      {/* Comic Book Panel Frame within Frame */}
      <div className="absolute inset-4 border-2 border-white/20 pointer-events-none"></div>
    </div>
  );
};

export default Slide;
