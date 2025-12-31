
import React from 'react';

export interface Lesson {
  id: string;
  title: string;
  description: string;
  difficulty: 'Principiante' | 'Intermedio' | 'Avanzado';
  category: string;
  content: string;
  icon: React.ReactNode;
}

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export interface DashboardStats {
  mastery: number;
  completedLessons: number;
  activeThreads: number;
  points: number;
}
