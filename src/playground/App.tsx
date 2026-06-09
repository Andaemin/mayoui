import { useState } from "react";
import { MayoBtn } from "../components/MayoBtn";
import { MayoDialog } from "../components/MayoDialog";
import "../styles/App.css";

function App() {
    const [count, setCount] = useState(0);
    const [open, setOpen] = useState(false);

    return (
        <>
            <section id="center">
                <div>
                    <h1>ui Mayo</h1>
                    <p>
                        Hi <code>MayoUi</code> getStarted <code>npm install mayoui</code>
                    </p>
                </div>
                <p>Mayo Btn Test</p>
                <ul>
                    <MayoBtn onClick={() => setCount((a) => a + 1)} color="blue" size="lg">
                        테스트
                    </MayoBtn>
                    <h2>{count}</h2>
                    <MayoBtn variant="secondary">This Secondary</MayoBtn>
                </ul>
                <p>Mayo Dialog Test</p>
                <MayoBtn onClick={() => setOpen(true)}>다이얼로그 열기</MayoBtn>
                <MayoDialog
                    open={open}
                    onClose={() => setOpen(false)}
                    title="테스트 다이얼로그"
                    footer={<MayoBtn onClick={() => setOpen(false)}>닫기</MayoBtn>}
                >
                    다이얼로그 테스트.
                </MayoDialog>
            </section>

            <div className="ticks"></div>
        </>
    );
}

export default App;
