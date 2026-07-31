export interface ContactRowProps {
  label: string;
  value: string;
}

export interface CustomSelectProps {
  value: string;
  onChange: (val: string) => void;
  options: string[];
  className?: string;
}

export interface ProjectProps {
  name: string;
  category: string;
  desc: string;
  tags: string[];
  metric: string;
  gradient: string;
}
