import "./MayoAvatar.css";
import type { MayoAvatarProps } from "./MayoAvatar.types";

function getInitials(name: string): string {
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

export function MayoAvatar({ src, alt, name, size = "md", shape = "circle", status }: MayoAvatarProps) {
    return (
        <span className={`mayo-avatar mayo-avatar--${size} mayo-avatar--${shape}`}>
            {src ? (
                <img className="mayo-avatar__img" src={src} alt={alt ?? name ?? ""} />
            ) : name ? (
                getInitials(name)
            ) : (
                <svg viewBox="0 0 24 24" fill="currentColor" width="55%" height="55%">
                    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                </svg>
            )}
            {status && <span className={`mayo-avatar__status mayo-avatar__status--${status}`} />}
        </span>
    );
}
