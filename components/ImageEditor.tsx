import React, { useState, useRef } from 'react';
import { Wand2, Upload, Loader2, Save } from 'lucide-react';
import { editImage } from '../services/geminiService';

const ImageEditor: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setSelectedImage(base64String);
        setGeneratedImage(null); // Reset generated image when new one picked
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!selectedImage || !prompt) return;

    setIsGenerating(true);
    try {
      // Extract base64 data without prefix for API if needed, 
      // but Gemini SDK often handles data URLs or raw base64. 
      // The service wraps it for the API.
      // We pass the full data URL to service, service extracts the base64 part.
      
      const cleanBase64 = selectedImage.split(',')[1];
      const mimeType = selectedImage.split(';')[0].split(':')[1];

      const result = await editImage(cleanBase64, prompt, mimeType);
      if (result) {
        setGeneratedImage(result);
      } else {
        alert("Failed to generate image. Try a different prompt.");
      }
    } catch (error) {
      console.error("Generation failed", error);
      alert("Error generating image. Check API key and quota.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white border-4 border-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] w-full max-w-4xl mx-auto mt-8">
        <div className="flex items-center gap-2 mb-4 border-b-4 border-black pb-2">
            <Wand2 className="w-8 h-8 text-purple-600" />
            <h2 className="text-3xl font-black manga-font transform -skew-x-6">Demon Art: Image Forge</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input Section */}
            <div className="flex flex-col gap-4">
                <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="border-4 border-dashed border-gray-400 hover:border-black cursor-pointer h-64 flex flex-col items-center justify-center bg-gray-50 transition-colors relative overflow-hidden group"
                >
                    {selectedImage ? (
                        <img src={selectedImage} alt="Original" className="w-full h-full object-contain" />
                    ) : (
                        <div className="text-center p-4 text-gray-500 group-hover:text-black">
                            <Upload className="w-12 h-12 mx-auto mb-2" />
                            <p className="font-bold">Click to upload scroll (Image)</p>
                        </div>
                    )}
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileChange} 
                        accept="image/*" 
                        className="hidden" 
                    />
                </div>

                <div className="flex gap-2">
                    <input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Incantation (e.g., 'Make it anime style')"
                        className="flex-1 border-4 border-black p-3 font-bold focus:outline-none focus:ring-4 focus:ring-purple-400"
                    />
                    <button
                        onClick={handleGenerate}
                        disabled={!selectedImage || !prompt || isGenerating}
                        className={`border-4 border-black px-6 font-black uppercase tracking-wider text-white transition-transform active:translate-y-1 ${(!selectedImage || !prompt || isGenerating) ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'}`}
                    >
                        {isGenerating ? <Loader2 className="animate-spin" /> : 'Cast'}
                    </button>
                </div>
            </div>

            {/* Output Section */}
            <div className="border-4 border-black h-64 md:h-auto bg-gray-900 flex items-center justify-center relative overflow-hidden">
                {generatedImage ? (
                    <img src={generatedImage} alt="Generated" className="w-full h-full object-contain" />
                ) : (
                    <div className="text-gray-500 font-bold manga-font text-xl text-center p-4">
                        {isGenerating ? "Concentrating..." : "Result will manifest here"}
                    </div>
                )}
                {/* Decorative Pattern overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(circle,white_2px,transparent_2px)] bg-[length:20px_20px]"></div>
            </div>
        </div>
        
        {generatedImage && (
             <div className="mt-4 flex justify-end">
                <a href={generatedImage} download="bio-slayer-edit.png" className="flex items-center gap-2 text-black font-bold hover:underline">
                    <Save className="w-5 h-5" /> Save Manifestation
                </a>
             </div>
        )}
    </div>
  );
};

export default ImageEditor;
