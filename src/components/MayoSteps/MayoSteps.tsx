import "./MayoSteps.css";
import type { MayoStepsProps, MayoStepStatus } from "./MayoSteps.types";

function getStatus(index: number, current: number): MayoStepStatus {
    if (index < current) return "done";
    if (index === current) return "active";
    return "pending";
}

export function MayoSteps({ steps, current, direction = "horizontal", color = "blue" }: MayoStepsProps) {
    return (
        <div className={`mayo-steps mayo-steps--${direction} mayo-steps--${color}`}>
            {steps.map((step, i) => {
                const status = getStatus(i, current);
                const isLast = i === steps.length - 1;
                return (
                    <div
                        key={i}
                        className={`mayo-steps__item mayo-steps__item--${status}${isLast ? " mayo-steps__item--last" : ""}`}
                    >
                        <div className="mayo-steps__node">
                            <div className="mayo-steps__circle">
                                {status === "done" ? (
                                    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="2,8 6,12 14,4" />
                                    </svg>
                                ) : step.icon ? (
                                    step.icon
                                ) : (
                                    <span>{i + 1}</span>
                                )}
                            </div>
                            {!isLast && <div className="mayo-steps__line" />}
                        </div>
                        <div className="mayo-steps__content">
                            <span className="mayo-steps__label">{step.label}</span>
                            {step.description && (
                                <span className="mayo-steps__description">{step.description}</span>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
