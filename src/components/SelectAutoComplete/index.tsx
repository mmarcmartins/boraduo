
import type { ChangeEvent, KeyboardEvent } from "react";
import { memo, useEffect, useRef, useState } from "react";
import { useThrottle } from "../../hooks/useThrottle";

type SelectAutoCompleteProps = {
  items: string[];
  onSelectItem: (name: string) => void;  
  placeholder?: string;
};

export const SelectAutoComplete = memo(({ items, onSelectItem, placeholder}: SelectAutoCompleteProps) => {
  const [userInput, setUserInput] = useState("");
  const [filter, setFilter] = useState<string[]>(items);
  const [isOpened, setIsOpened] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const selectedRef = useRef<HTMLUListElement | null>(null);

  const scrollIntoItem = () => {
    const selected = selectedRef.current?.querySelector(".selected-item");
    selected?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    inputRef.current?.setAttribute("aria-expanded", isOpened.toString());
  }, [isOpened]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (["Enter", "ArrowUp", "ArrowDown"].includes(e.key)) e.preventDefault();

    switch (e.key) {
      case "Enter":
        setUserInput(filter[activeIndex]);
        setIsOpened(false);
        setFilter([]);
        setActiveIndex(0);
        onSelectItem(filter[activeIndex]);
        break;
      case "ArrowUp":        
        setActiveIndex((prev) => {
            onSelectItem(filter[activeIndex]);
            return prev > 0 ? prev - 1 : prev          
          }
        );        
        setTimeout(scrollIntoItem, 100);
        break;
      case "ArrowDown":
        setActiveIndex((prev) => {
            onSelectItem(filter[activeIndex]);
            return prev < filter.length - 1 ? prev + 1 : prev;         
          }
        );           
        setTimeout(scrollIntoItem, 100);
        break;
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newInput = e.target.value.toLowerCase();
    const filtered = items.filter((item) =>
      item.toLowerCase().includes(newInput)
    );
    setUserInput(newInput);
    setFilter(filtered);
    setActiveIndex(0);
    if (!isOpened) setIsOpened(true);
  };

  const handleItemClick = (item: string) => {
    setUserInput(item);
    onSelectItem(item);
    setIsOpened(false);
    setFilter([]);
    setActiveIndex(0);
  };

  const handleFocus = () => {
    setIsOpened(true);
  };

  const onBlur = () => {
    setTimeout(() => setIsOpened(false), 100)
  }

  
  return (
    <div className="select-custom-autocomplete">
      <input
        type="text"
        value={userInput}
        ref={inputRef}
        className="field"
        placeholder={placeholder}
        onFocus={handleFocus}
        onBlur={onBlur}
        onChange={useThrottle(handleChange, 100)}
        aria-haspopup="listbox"
        aria-expanded="false"
        onKeyDown={handleKeyDown}
        aria-controls="custom-autocomplete-list"
        aria-autocomplete="list"
      />
      {isOpened && filter.length > 0 && (
        <ul id="custom-autocomplete-list" className="list" role="listbox" ref={selectedRef}>
          {filter.map((curr, index) => (
            <li
              key={curr}
              className={index === activeIndex ? "selected-item" : "default-item"}
              dangerouslySetInnerHTML={{
                __html: curr.toLowerCase().replace(userInput, `<span class="match">${userInput}</span>`)
              }}
              role="option"
              onClick={() => handleItemClick(curr)}
            />
          ))}
        </ul>
      )}
    </div>
  );
});