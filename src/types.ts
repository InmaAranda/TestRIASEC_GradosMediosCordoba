export type RIASECType = 'R' | 'I' | 'A' | 'S' | 'E' | 'C';

export interface Question {
  id: number;
  type: RIASECType;
  text: string;
}

export interface Cycle {
  id: string;
  title: string;
  center: string;
  category: 'Arte' | 'Salud' | 'Tecnología' | 'Empresa' | 'Industria';
  tags: RIASECType[];
  gives: string;
  for: string;
  exits: string;
  isArtSchool?: boolean;
}

export interface RIASECScores {
  R: number;
  I: number;
  A: number;
  S: number;
  E: number;
  C: number;
}

export interface Message {
  id: string;
  sender: 'user' | 'alejandro';
  text: string;
  timestamp: string;
  suggestedActions?: { label: string; action: string }[];
}

export interface ProfileDetail {
  name: string;
  emoji: string;
  destrezas: string;
  sirve: string;
  ramas: string;
  desc: string;
}
