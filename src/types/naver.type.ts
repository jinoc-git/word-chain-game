export interface ResponseItem {
  description: string;
  link: string;
  thumbnail: string;
  title: string;
}

export interface ApiResponse {
  display: number;
  items: ResponseItem[];
  lastBuildDate: string; // REC 2822 형식
  start: number;
  total: number;
}
