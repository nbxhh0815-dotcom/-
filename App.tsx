import React, { useState, useEffect } from 'react';
import { slides } from './slides_data';
import Slide from './components/Slide';
import ImageEditor from './components/ImageEditor';
import { ChevronLeft, ChevronRight, Menu, X, Sword } from 'lucide-react';

const App: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [showEditor, setShowEditor] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const nextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showEditor) return; // Disable slide nav if editing
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex, showEditor]);

  return (
    <div className="h-screen w-screen flex flex-col bg-stone-900 overflow-hidden font-sans text-gray-900">
      
      {/* Top Bar / Navigation */}
      <div className="h-16 bg-black border-b-4 border-green-700 flex items-center justify-between px-4 z-50">
        <div className="flex items-center gap-2 text-white">
            <Sword className="text-green-500 fill-current" />
            <span className="text-2xl font-black tracking-widest manga-font">BIO-SLAYER</span>
        </div>
        
        <div className="flex items-center gap-4">
             <button 
                onClick={() => setShowEditor(!showEditor)}
                className="bg-purple-700 hover:bg-purple-600 text-white px-4 py-1 font-bold border-2 border-white transform skew-x-[-10deg] transition-all"
            >
                {showEditor ? 'RETURN TO STORY' : 'OPEN IMAGE FORGE'}
            </button>
            <div className="text-white font-mono hidden md:block">
                CH. {currentSlideIndex + 1} / {slides.length}
            </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative overflow-y-auto overflow-x-hidden scrollbar-hide">
        {showEditor ? (
            <div className="min-h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-stone-800 p-8 flex flex-col items-center">
                <ImageEditor />
            </div>
        ) : (
            <div className="h-full w-full">
                <Slide 
                    data={slides[currentSlideIndex]} 
                    isActive={true} 
                />
            </div>
        )}
      </div>

      {/* Bottom Controls (Visible only on non-editor mode for easy touch nav) */}
      {!showEditor && (
          <div className="absolute bottom-8 right-8 flex gap-4 z-50">
              <button 
                onClick={prevSlide}
                disabled={currentSlideIndex === 0}
                className={`w-16 h-16 bg-black border-4 border-white flex items-center justify-center text-white rounded-full hover:bg-green-800 transition-colors ${currentSlideIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                  <ChevronLeft size={32} />
              </button>
              <button 
                onClick={nextSlide}
                disabled={currentSlideIndex === slides.length - 1}
                 className={`w-16 h-16 bg-red-700 border-4 border-white flex items-center justify-center text-white rounded-full hover:bg-red-600 transition-colors shadow-lg shadow-red-900/50 ${currentSlideIndex === slides.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                  <ChevronRight size={32} />
              </button>
          </div>
      )}

      {/* Progress Bar styled as a katana blade */}
      <div className="h-4 w-full bg-gray-800 border-t-2 border-black relative">
          <div 
            className="h-full bg-gradient-to-r from-gray-300 via-white to-gray-300 border-r-2 border-gray-500 transition-all duration-300 ease-out"
            style={{ width: `${((currentSlideIndex + 1) / slides.length) * 100}%` }}
          >
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gray-400 opacity-50 skew-x-12"></div>
          </div>
      </div>
    </div>
  );
};

export default App;
