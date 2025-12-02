export interface CheckResult {
  _id?: string;
  text: string;
  image?: string;
  prediction: 'Fake' | 'True';
  processedText: string;
  timestamp: Date;
  userIp?: string;
}

export interface Stats {
  total: number;
  fake: number;
  true: number;
  suspicious: number;
}

export interface ContactMessage {
  _id?: string;
  name: string;
  email: string;
  message: string;
  timestamp: Date;
  status: 'new' | 'read' | 'replied';
}
