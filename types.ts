export enum SlideType {
  TITLE = 'TITLE',
  CONTENT = 'CONTENT',
  VS = 'VS',
  CONCLUSION = 'CONCLUSION'
}

export interface SlideData {
  id: number;
  type: SlideType;
  title: string;
  japaneseTitle?: string;
  content: string[];
  visualMeta?: string; // Description for internal visual logic
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  image?: string;
}
