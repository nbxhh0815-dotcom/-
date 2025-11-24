import { SlideData, SlideType } from './types';

export const slides: SlideData[] = [
  {
    id: 1,
    type: SlideType.TITLE,
    title: "Bio-benchmark: The New Era",
    japaneseTitle: "生物学的ベンチマーク",
    content: [
      "Benchmarking Large Language Models on Multiple Tasks in Bioinformatics NLP",
      "By Jiyue Jiang, Pengan Chen, et al.",
      "University of Hong Kong & CUHK"
    ],
    visualMeta: "Hero stance"
  },
  {
    id: 2,
    type: SlideType.CONTENT,
    title: "The Threat: Chaotic Data",
    japaneseTitle: "脅威：混沌としたデータ",
    content: [
      "Current LLMs are powerful (GPT-4, Llama-3), but...",
      "Biological tasks are complex: Proteins, RNA, Drugs, EHR.",
      "Existing benchmarks are weak! They cannot handle the scale.",
      "We need a new weapon to evaluate these models."
    ],
    visualMeta: "Villain aura"
  },
  {
    id: 3,
    type: SlideType.CONTENT,
    title: "The Weapon: Bio-benchmark",
    japaneseTitle: "武器：バイオベンチマーク",
    content: [
      "A comprehensive prompting-based framework.",
      "30 Key Tasks across 7 Domains:",
      "• Protein Structure & Function",
      "• RNA & RNA-binding",
      "• Drug Discovery & Interaction",
      "• Medical Records (EHR) & TCM"
    ],
    visualMeta: "Sword reveal"
  },
  {
    id: 4,
    type: SlideType.CONTENT,
    title: "Secret Technique: BioFinder",
    japaneseTitle: "奥義：バイオファインダー",
    content: [
      "Standard Regex extraction is too weak (62.9% accuracy).",
      "BioFinder: A novel answer extraction method.",
      "Increases extraction accuracy by ~30%!",
      "Achieves 93.5% accuracy on bio-sequence tasks.",
      "It retrieves the true answer from the noise."
    ],
    visualMeta: "Water breathing"
  },
  {
    id: 5,
    type: SlideType.VS,
    title: "The Great Battle",
    japaneseTitle: "大決戦",
    content: [
      "Testing 6 Mainstream LLMs (Zero-shot & Few-shot)",
      "GPT-4o vs Llama-3.1 vs Mistral vs Qwen",
      "Finding: Specialized prompts boost performance massively.",
      "Finding: LLMs struggle with inverse protein folding but excel at Medical QA."
    ],
    visualMeta: "Battle clash"
  },
  {
    id: 6,
    type: SlideType.CONCLUSION,
    title: "Victory & The Future",
    japaneseTitle: "勝利と未来",
    content: [
      "Bio-benchmark sets the new standard.",
      "BioFinder is the ultimate extraction tool.",
      "Future training must focus on hard bio-logic tasks.",
      "The path to AI-driven biology is clear!"
    ],
    visualMeta: "Sunrise"
  }
];
