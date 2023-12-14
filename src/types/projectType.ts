export interface Project {
  id: string;
  type: string;
  title: string;
  description: string;
  images: [string];
  link: string;
  source: string;
  isActive: boolean;
}
