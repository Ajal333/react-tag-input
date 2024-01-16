import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { TagInputProps } from "./tag-input.types";
import useOutsideClick from "./useOutsideClick";

export function TagInput({
  className,
  tags,
  setTags,
  textClassName,
  error,
  suggestions,
  setCurrentItem,
  selectSuggestionOnly = false,
  isSuggestionsLoading = false,
  setPage,
  existingLocalState,
}: TagInputProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [localTags, setLocalTags] = useState<(number | string)[]>([
    ...(existingLocalState ?? []),
  ]);

  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);

  // To hide the dropdown on clicking outside the input field
  useOutsideClick(ref, () => setShowSuggestions(false));

  const [item, setItem] = useState("");

  const addTag = (tag: string | number) => {
    if (tags?.includes(tag)) return;
    setTags([...tags, tag]);
    setItem("");
  };

  const addLocalTag = (tag: string | number) => {
    if (localTags?.includes(tag)) return;
    setLocalTags([...localTags, tag]);
    setItem("");
  };

  const removeTag = (tag: string | number) => {
    setTags(tags?.filter((item) => item !== tag));
  };

  const removeLocalTag = (tag: string | number) => {
    setLocalTags(localTags?.filter((item) => item !== tag));
  };

  // To scroll down to the latest suggestion, useful when pagination is implemented.
  useEffect(() => {
    const currentRef = ref?.current;
    const onScroll = () => {
      const innerHeight = ref?.current?.clientHeight;
      const scrollHeight = ref?.current?.scrollHeight;
      const scrollTop = ref?.current?.scrollTop;
      if (scrollHeight && scrollTop && innerHeight) {
        const bottom = scrollHeight - scrollTop === innerHeight;
        if (bottom && setPage) {
          setPage();
        }
      }
    };
    currentRef?.addEventListener("scroll", onScroll);

    return function () {
      currentRef?.removeEventListener("scroll", onScroll);
    };
  }, [setPage]);

  return (
    <div className="relative min-w-[500px] max-w-[80%] bg-white">
      <div
        ref={inputRef}
        className={classNames(
          `px-4 py-3 gap-4 border-[1px] h-fit border-neutral-200 rounded-[4px] flex items-center flex-wrap overflow-hidden`,
          error && "border-red-500",
          showSuggestions && "border-primary-400",
          className
        )}
      >
        {(selectSuggestionOnly ? localTags : tags)?.map((tag, key) => (
          <div
            key={key}
            className="bg-secondary-400/40 rounded-md p-2 gap-[10px] flex items-center justify-between"
          >
            <p className="text-black-600 text-[16px] font-normal">{tag}</p>
            <div
              className="text-gray cursor-pointer"
              onClick={() => {
                removeTag(tag);
                removeLocalTag(tag);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
        ))}
        <input
          value={item}
          className={classNames(
            `focus-visible:outline-none flex-1 py-1`,
            textClassName
          )}
          onChange={(e) => {
            setItem(e?.target?.value);
            setCurrentItem && setCurrentItem(e?.target?.value);
          }}
          placeholder="Enter your name..."
          onFocus={() => setShowSuggestions(true)}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onKeyDown={(e: any) => {
            if (e?.key === "Enter") {
              e?.preventDefault();
              !selectSuggestionOnly && addTag(e?.target?.value);
            }
          }}
        />
      </div>
      {error ? (
        <p className="text-xs font-medium mt-1 mb-2 text-red-600">{error}</p>
      ) : null}
      {(showSuggestions &&
        suggestions?.filter((item) => !tags?.includes(item?.value))?.length) ||
      isSuggestionsLoading ? (
        <div
          ref={ref}
          style={{ top: (inputRef?.current?.clientHeight ?? 70) + 10 }}
          className="w-full overflow-y-auto  z-[9] p-3 absolute bg-primary-100/50 rounded-[8px] shadow-custom h-[250px] flex flex-col gap-2"
        >
          {isSuggestionsLoading
            ? Array.from({ length: 5 })?.map((_, key) => (
                <div key={key} className="h-[50px]">
                  <p>Loading...</p>
                </div>
              ))
            : suggestions
                ?.filter((item) => !tags?.includes(item?.value))
                ?.filter((suggestion) =>
                  suggestion?.title
                    ?.toLowerCase()
                    ?.includes(item?.toLowerCase())
                )
                ?.map((item) => (
                  <p
                    className="p-2 w-full rounded-[6px] hover:bg-primary-200 cursor-pointer"
                    key={item?.value}
                    onClick={(e) => {
                      e?.preventDefault();
                      addTag(item?.value);
                      addLocalTag(item?.title);
                    }}
                  >
                    {item?.title}
                  </p>
                ))}
        </div>
      ) : null}
    </div>
  );
}

export default TagInput;
