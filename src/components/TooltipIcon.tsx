import React, { useState } from "react";
import HelpIcon from "@/icons/HelpIcon";

interface TooltipIconProps {
  message: string;
  className?: string;
  position?: "left" | "right" | "top";
}

/**
 * Tooltip icon component with hover-based message.
 *
 * This component shows a small question mark icon (`?`) with a tooltip on hover.
 * Tooltip position can be controlled (`left` or `right`).
 *
 * 🧠 Use cases:
 * - Next to form labels or inputs to explain a field.
 * - Inside a component where minimal help is needed.
 *
 * @example
 * <TooltipIcon message="This info helps us find better matches." />
 * <TooltipIcon message="Appears to the left." position="left" />
 *
 * @param {string} message - The tooltip text that appears on hover.
 * @param {string} [position] - Tooltip position, defaults to `"right"`.
 * @param {string} [className] - Optional additional CSS classes.
 *
 * @returns {JSX.Element} Tooltip with icon.
 */

const TooltipIcon: React.FC<TooltipIconProps> = ({
  message,
  className,
  position = "top",
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: "top-full mt-2 left-1/2 -translate-x-1/2",
    left: "right-full mr-2 top-1/2 -translate-y-1/2",
    right: "left-full ml-2 top-1/2 -translate-y-1/2",
  };

  return (
    <div
      className={`relative cursor-pointer ${className || ""}`}
      onClick={() => setIsVisible((prev) => !prev)}
      onBlur={() => setIsVisible(false)}
      tabIndex={0} // дозволяє фокус клавіатурою
    >
      <HelpIcon className="w-4 h-4 text-gray-400" />
      {isVisible && (
        <div
          className={`absolute ${positionClasses[position]} w-64 rounded bg-gray-700 text-white text-xs px-3 py-2 shadow-lg z-20`}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default TooltipIcon;
