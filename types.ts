
export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}
