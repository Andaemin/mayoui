import "./MayoCard.css";
import type { MayoCardProps } from "./MayoCard.types";

export function MayoCard({ title, description, children, footer, image, variant = "outlined", padding = "md", onClick, className = "", ...rest }: MayoCardProps) {
    const clickable = !!onClick;
    return (
        <div
            className={`mayo-card mayo-card--${variant} mayo-card--${padding} ${clickable ? "mayo-card--clickable" : ""} ${className}`.trim()}
            onClick={onClick}
            {...rest}
        >
            {image && <img className="mayo-card__image" src={image} alt={title ?? ""} />}
            {(title || description || children) && (
                <div className="mayo-card__body">
                    {title && <p className="mayo-card__title">{title}</p>}
                    {description && <p className="mayo-card__description">{description}</p>}
                    {children && <div className="mayo-card__content">{children}</div>}
                </div>
            )}
            {footer && <div className="mayo-card__footer">{footer}</div>}
        </div>
    );
}
