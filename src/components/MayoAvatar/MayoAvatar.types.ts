export type MayoAvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
export type MayoAvatarShape = "circle" | "square";
export type MayoAvatarStatus = "online" | "offline" | "busy" | "away";

export type MayoAvatarProps = {
    src?: string;
    alt?: string;
    name?: string;
    size?: MayoAvatarSize;
    shape?: MayoAvatarShape;
    status?: MayoAvatarStatus;
};
