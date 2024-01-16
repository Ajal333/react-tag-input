export interface TagInputProps {
  className?: string;
  setTags: (value: (string | number)[]) => void;
  tags: (string | number)[];
  textClassName?: string;
  error?: string;
  suggestions?: { value: string; title: string }[];
  currentItem?: string | number;
  setCurrentItem?: React.Dispatch<React.SetStateAction<string | number>>;
  selectSuggestionOnly?: boolean;
  isSuggestionsLoading?: boolean;
  setPage?: () => void;
  existingLocalState?: string[];
}
