import "./MayoBtn.css";
import type { MayoBtnProps } from "./MayoBtn.types";

export function MayoBtn({ children, variant = "primary", size = "md", color = "blue", className = "", type = "button", ...props }: MayoBtnProps) {
    const mayoBtnClassName = ["mayo-btn", `mayo-btn--${variant}`, `mayo-btn--${color}`, `mayo-btn--${size}`, className].filter(Boolean).join(" ");

    return (
        <button type={type} className={mayoBtnClassName} {...props}>
            {children}
        </button>
    );
}
