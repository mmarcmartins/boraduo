import { forwardRef } from "react";
import "./styles.scss";

export const CustomSwitch = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ ...props }, ref) => {
  return (
    <div className="custom-switch">
      <label className="switch">
        <input type="checkbox" {...props} ref={ref} />
        <span className="slider round"></span>
      </label>
    </div>
  );
});

CustomSwitch.displayName = "CustomSwitch";
