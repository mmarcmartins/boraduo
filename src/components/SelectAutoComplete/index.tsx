import type {
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  MutableRefObject,
  RefObject,
} from "react";
import { forwardRef, memo, useEffect, useRef, useState } from "react";
import "./index.scss";

type OptionItem = {
  id: string;
  name: string;
};

type SelectAutoCompleteProps = {
  items: OptionItem[];
  onSelectItem: (id: string) => void;
  placeholder?: string;
  onValidate: VoidFunction;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const SelectAutoComplete = memo(
  forwardRef<HTMLInputElement, SelectAutoCompleteProps>(
    ({ items, onSelectItem, onValidate, ...inputProps }, ref) => {
      const [userInput, setUserInput] = useState("");
      const [filter, setFilter] = useState<OptionItem[]>(items);
      const [isOpened, setIsOpened] = useState(false);
      const [activeIndex, setActiveIndex] = useState(0);
      const selectedRef = useRef<HTMLUListElement | null>(null);
      const inputRef = ref as MutableRefObject<HTMLInputElement>;

      useEffect(() => {
        if (inputProps.disabled) {
          setUserInput("");
        }
      }, [inputProps.disabled]);

      const scrollIntoItem = () => {
        const selected = selectedRef.current?.querySelector(".selected-item");
        selected?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      };

      useEffect(() => {
        inputRef.current?.setAttribute("aria-expanded", isOpened.toString());
      }, [isOpened]);

      const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (["Enter", "ArrowUp", "ArrowDown", "Escape"].includes(e.key))
          e.preventDefault();

        switch (e.key) {
          case "Escape":
            setUserInput("");
            onSelectItem("");
            setIsOpened(false);
            setFilter([]);
            setActiveIndex(0);
            onValidate();
            break;
          case "Enter":
            setUserInput(filter[activeIndex].name);
            onSelectItem(items[activeIndex].id);
            setIsOpened(false);
            setFilter([]);
            setActiveIndex(0);
            onValidate();
            break;
          case "ArrowUp":
            setActiveIndex((prev) => {
              const newIdx = Math.max(prev - 1, 0);
              return newIdx;
            });
            setTimeout(scrollIntoItem, 100);
            break;
          case "ArrowDown":
            setActiveIndex((prev) => {
              const newIdx = Math.min(filter.length - 1, prev + 1);
              return newIdx;
            });
            setTimeout(scrollIntoItem, 100);
            break;
        }
      };

      const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const newInput = e.target.value;
        const filtered = items.filter((item) =>
          item.name.toLowerCase().includes(newInput.toLocaleLowerCase()),
        );
        setUserInput(newInput);
        setFilter(filtered);
        setActiveIndex(0);
        if (filtered.length >= 1) onSelectItem("");
        if (!isOpened) setIsOpened(true);
      };

      const handleItemClick = (item: OptionItem, index: number) => {
        onSelectItem(items[index].id);
        onValidate();
        setUserInput(item.name);
        setIsOpened(false);
        setFilter([]);
        setActiveIndex(0);
      };

      const handleFocus = () => {
        setIsOpened(true);
      };

      const onBlur = (e: FocusEvent<HTMLInputElement, Element>) => {
        inputProps.onBlur?.(e);
        setTimeout(() => setIsOpened(false), 100);
      };
      const disabled = inputProps.disabled ? "disabled" : "";
      return (
        <div className={`select-custom-autocomplete ${disabled}`}>
          <input
            type="text"
            value={userInput}
            ref={inputRef}
            name={inputProps.name}
            className="field"
            placeholder={inputProps.placeholder}
            onFocus={handleFocus}
            onBlur={onBlur}
            disabled={inputProps.disabled}
            onChange={handleChange}
            aria-haspopup="listbox"
            aria-expanded="false"
            onKeyDown={handleKeyDown}
            aria-controls="custom-autocomplete-list"
            aria-autocomplete="list"
          />
          {isOpened && filter.length > 0 && (
            <ul
              id="custom-autocomplete-list"
              className="list"
              role="listbox"
              ref={selectedRef}
            >
              {filter.map((curr, index) => (
                <li
                  key={curr.id}
                  className={
                    index === activeIndex ? "selected-item" : "default-item"
                  }
                  role="option"
                  onClick={() => handleItemClick(curr, index)}
                >
                  {curr.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    },
  ),
);

SelectAutoComplete.displayName = "SelectAutoComplete";
