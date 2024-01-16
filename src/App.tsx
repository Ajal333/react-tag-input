import { useState } from "react";
import "./App.css";
import TagInput from "./tag-input";
import { SuggestionNames } from "./constants";

function App() {
  const [tags, setTags] = useState<(string | number)[]>([]);

  const changeTagInput = (value: (string | number)[]) => setTags([...value]);

  return (
    <div className="w-screen h-screen bg-white flex items-center justify-center">
      <TagInput
        {...{
          setTags: changeTagInput,
          tags,
          suggestions: SuggestionNames, // The list that shows in the dropdown
          selectSuggestionOnly: true, // Select only items from the dropdown suggestions
        }}
      />
    </div>
  );
}

export default App;
