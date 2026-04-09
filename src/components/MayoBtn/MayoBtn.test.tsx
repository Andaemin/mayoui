import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MayoBtn } from "./MayoBtn";

describe("MayoBtn", () => {
    it("버튼 텍스트를 렌더링한다", () => {
        render(<MayoBtn>클릭</MayoBtn>);

        expect(screen.getByRole("button", { name: "클릭" })).toBeInTheDocument();
    });

    it("Test onclick", async () => {
        const user = userEvent.setup();
        const handleClick = vi.fn();

        render(<MayoBtn onClick={handleClick}>mayo Onclick</MayoBtn>);

        await user.click(screen.getByRole("button", { name: "mayo Onclick" }));

        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("disabled Test", async () => {
        const user = userEvent.setup();
        const handleClick = vi.fn();

        render(
            <MayoBtn disabled onClick={handleClick}>
                mayo is disabled
            </MayoBtn>,
        );

        await user.click(screen.getByRole("button", { name: "mayo is disabled" }));

        expect(handleClick).not.toHaveBeenCalled();
    });

    it("variant와 size class를 가진다", () => {
        render(
            <MayoBtn variant="ghost" size="lg">
                mayoCheck
            </MayoBtn>,
        );

        const button = screen.getByRole("button", { name: "mayoCheck" });

        expect(button).toHaveClass("mayo-btn");
        expect(button).toHaveClass("mayo-btn--ghost");
        expect(button).toHaveClass("mayo-btn--lg");
    });
});
