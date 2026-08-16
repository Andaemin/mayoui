import { useState } from "react";
import { MayoBtn } from "../components/MayoBtn";
import { MayoDialog } from "../components/MayoDialog";
import "../styles/App.css";
import { MayoInput } from "../components/MayoInput";
import { MayoHeader } from "../components/MayoHeader";
import { MayoBadge } from "../components/MayoBadge";
import { MayoSelect } from "../components/MayoSelect";
import { MayoLoadingSpinner } from "../components/MayoLoadingSpinner";

function App() {
    const [count, setCount] = useState(0);
    const [open, setOpen] = useState(false);
    const playTestValue = [
        { value: "TestComponent", label: "Test Component" },
        { value: "banana", label: "바나나" },
        { value: "grape", label: "포도", disabled: true },
    ];
    const [errorTest, setErrorTest] = useState("");
    const [selected, setSelected] = useState("");

    const errorTestHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelected(e.target.value);
        if (errorTest) setErrorTest("");
    };

    const handleSubmit = () => {
        if (!selected) {
            setErrorTest("과일을 선택해주세요!");
            return;
        }
        alert(`선택한 과일: ${selected}`);
    };
    return (
        <>
            <MayoHeader
                nav={
                    <>
                        <a href="/">Home</a>
                        <a href="/docs">Docs</a>
                        <a href="/about">Info</a>
                    </>
                }
                actions={<MayoBtn size="sm">로그인</MayoBtn>}
            />
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
                <MayoInput size="sm" label="test" placeholder="tester" labelAlign="left" />
                <div className="badge-group">
                    <MayoBadge color="blue" variant="soft" iconClassName="tossface">
                        Component
                    </MayoBadge>
                    <MayoBadge color="red" variant="soft" icon="🌹" iconClassName="tossface">
                        Hot
                    </MayoBadge>
                    <MayoBadge color="green" variant="soft" icon="✅" iconClassName="tossface">
                        component
                    </MayoBadge>
                    <MayoBadge color="purple" variant="soft" icon="⭐" iconClassName="tossface">
                        Best
                    </MayoBadge>
                    <MayoBadge color="gray" variant="soft" icon="📌" iconClassName="tossface">
                        Draft
                    </MayoBadge>
                </div>
                <div className="selectTest">
                    <MayoSelect
                        label="과일 선택"
                        placeholder="선택해주세요"
                        options={playTestValue}
                        hint="하나를 골라주세요"
                        error={errorTest}
                        onChange={errorTestHandler}
                        size="sm"
                    />

                    <MayoSelect
                        label="과일 선택"
                        placeholder="선택해주세요"
                        options={playTestValue}
                        hint="하나를 골라주세요"
                        error={errorTest}
                        onChange={errorTestHandler}
                        size="sm"
                    />
                </div>
                <MayoBtn onClick={handleSubmit}>제출</MayoBtn>
                <div className="selectTest">
                    <MayoLoadingSpinner size="sm" />
                    <MayoLoadingSpinner size="md" color="gray" label="마요 로딩 스피너 테스트.." />
                    <MayoLoadingSpinner size="lg" color="green" />
                </div>
            </section>

            <div className="ticks"></div>
        </>
    );
}

export default App;
