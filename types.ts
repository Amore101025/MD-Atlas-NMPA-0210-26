import React from 'react';

export interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export interface Question {
  id: number;
  category: string;
  question: string;
}

export interface RiskClass {
  class: string;
  riskLevel: string;
  description: string;
  management: string;
  examples: string;
}

export enum TabType {
  STEP1 = 'Classification',
  STEP2 = 'Testing',
  STEP3 = 'Clinical',
  STEP4 = 'Submission',
  STEP5 = 'Approval'
}

export type Language = 'en' | 'zh';
export type ThemeMode = 'light' | 'dark';

export interface PainterStyle {
  id: string;
  name: string;
  background: string; // CSS background property (gradient or color)
  accentColor: string;
  textColor: string;
  cardBg: string; // Glassmorphism bg
  font?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface MagicFeature {
  id: string;
  name: string;
  icon: React.ReactNode;
  promptTemplate: (text: string, extra?: string) => string;
}