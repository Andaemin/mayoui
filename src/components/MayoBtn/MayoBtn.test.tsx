import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MayoBtn } from "./MayoBtn";

describe("MayoBtn", () => {
    it("버튼 텍스트를 렌더링한다", () => {
        render(<MayoBtn>클릭</MayoBtn>);

        expect(screen.getByRole("button", { name: "클릭" })).toBeInTheDocument();
    });

    it("클릭하면 onClick이 호출된다", async () => {
        const user = userEvent.setup();
        const handleClick = vi.fn();

        render(<MayoBtn onClick={handleClick}>클릭</MayoBtn>);

        await user.click(screen.getByRole("button", { name: "클릭" }));

        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("disabled 상태에서는 클릭되지 않는다", async () => {
        const user = userEvent.setup();
        const handleClick = vi.fn();

        render(
            <MayoBtn disabled onClick={handleClick}>
                클릭
            </MayoBtn>,
        );

        await user.click(screen.getByRole("button", { name: "클릭" }));

        expect(handleClick).not.toHaveBeenCalled();
    });

    it("variant와 size class를 가진다", () => {
        render(
            <MayoBtn variant="ghost" size="lg">
                클릭
            </MayoBtn>,
        );

        const button = screen.getByRole("button", { name: "클릭" });

        expect(button).toHaveClass("mayo-btn");
        expect(button).toHaveClass("mayo-btn--ghost");
        expect(button).toHaveClass("mayo-btn--lg");
    });
});
