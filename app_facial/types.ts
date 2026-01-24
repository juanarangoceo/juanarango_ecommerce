
export interface SkinConcern {
  name: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
}

export interface RecommendedTreatment {
  title: string;
  benefits: string;
  duration: string;
}

export interface AnalysisResult {
  skinType: string;
  overallHealthScore: number;
  concerns: SkinConcern[];
  treatments: RecommendedTreatment[];
  expertAdvice: string;
}

export enum AppState {
  IDLE = 'IDLE',
  UPLOADING = 'UPLOADING',
  SCANNING = 'SCANNING',
  RESULTS = 'RESULTS',
  ERROR = 'ERROR'
}
