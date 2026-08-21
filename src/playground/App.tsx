import { useState } from "react";
import { MayoBtn } from "../components/MayoBtn";
import { MayoDialog } from "../components/MayoDialog";
import "../styles/App.css";
import { MayoInput } from "../components/MayoInput";
import { MayoHeader } from "../components/MayoHeader";
import { MayoBadge } from "../components/MayoBadge";
import { MayoSelect } from "../components/MayoSelect";
import { MayoLoadingSpinner } from "../components/MayoLoadingSpinner";
import { MayoDropdown } from "../components/MayoDropdown";
import { MayoBreadcrumb } from "../components/MayoBreadcrumb";
import { MayoSidebar } from "../components/MayoSidebar";
import { MayoTextarea } from "../components/MayoTextarea";
import { MayoToggle } from "../components/MayoToggle";
import { MayoCheckbox } from "../components/MayoCheckbox";
import { MayoCard } from "../components/MayoCard";
import { MdExpandMore } from "react-icons/md";

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
            <div className="app-layout">
                <MayoSidebar
                    activePath={window.location.pathname}
                    items={[
                        { label: "홈", icon: "🏠", iconClassName: "tossface", href: "/" },
                        {
                            label: "컴포넌트",
                            icon: "🧩",
                            iconClassName: "tossface",
                            children: [
                                { label: "버튼", href: "/components/button" },
                                { label: "인풋", href: "/components/input" },
                                { label: "배지", href: "/components/badge" },
                            ],
                        },
                        { label: "설정", icon: "⚙️", iconClassName: "tossface", href: "/settings" },
                    ]}
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
                    <MayoTextarea label="문의 내용" placeholder="내용을 입력해주세요" hint="최대 500자" rows={4} />
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
                    <p>Mayo Card Test — variant</p>
                    <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "flex-start" }}>
                        <MayoCard
                            title="Outlined"
                            description="기본 테두리 스타일"
                            variant="outlined"
                            footer={
                                <>
                                    <MayoBtn size="sm">확인</MayoBtn>
                                    <MayoBtn size="sm" variant="secondary">취소</MayoBtn>
                                </>
                            }
                            style={{ width: 220 }}
                        >
                            hover 시 테두리와 그림자가 강조됩니다.
                        </MayoCard>
                        <MayoCard
                            title="Elevated"
                            description="그림자 스타일"
                            variant="elevated"
                            footer={<MayoBtn size="sm" variant="secondary">더보기</MayoBtn>}
                            style={{ width: 220 }}
                        >
                            hover 시 위로 살짝 떠오릅니다.
                        </MayoCard>
                        <MayoCard
                            title="Flat"
                            description="배경색 스타일"
                            variant="flat"
                            style={{ width: 220 }}
                        >
                            푸터 없이 콘텐츠만 담을 때 사용해요.
                        </MayoCard>
                        <MayoCard
                            title="클릭 가능"
                            description="onClick 전달 시 자동으로 포인터"
                            variant="outlined"
                            style={{ width: 220 }}
                            onClick={() => alert("카드 클릭!")}
                        >
                            카드 전체가 버튼처럼 동작합니다.
                        </MayoCard>
                    </div>
                    <p>Mayo Card Test — padding</p>
                    <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "flex-start" }}>
                        <MayoCard title="padding sm" description="작은 여백" variant="outlined" padding="sm" style={{ width: 180 }}>
                            sm 패딩 카드
                        </MayoCard>
                        <MayoCard title="padding md" description="기본 여백" variant="outlined" padding="md" style={{ width: 180 }}>
                            md 패딩 카드
                        </MayoCard>
                        <MayoCard title="padding lg" description="넓은 여백" variant="outlined" padding="lg" style={{ width: 180 }}>
                            lg 패딩 카드
                        </MayoCard>
                    </div>
                    <p>Mayo Card Test — image</p>
                    <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "flex-start" }}>
                        <MayoCard
                            title="이미지 카드"
                            description="image prop으로 상단 이미지 삽입"
                            variant="outlined"
                            image="https://picsum.photos/seed/mayo1/400/225"
                            footer={<MayoBtn size="sm">자세히 보기</MayoBtn>}
                            style={{ width: 260 }}
                        >
                            16:9 비율로 자동 크롭됩니다.
                        </MayoCard>
                        <MayoCard
                            title="이미지 + Elevated"
                            description="그림자와 이미지 조합"
                            variant="elevated"
                            image="https://picsum.photos/seed/mayo2/400/225"
                            footer={<MayoBtn size="sm" variant="secondary">닫기</MayoBtn>}
                            style={{ width: 260 }}
                        >
                            hover 시 위로 떠오릅니다.
                        </MayoCard>
                    </div>
                    <p>Mayo Toggle Test</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                            <MayoToggle label="sm" size="sm" color="blue" />
                            <MayoToggle label="md" size="md" color="blue" />
                            <MayoToggle label="lg" size="lg" color="blue" />
                        </div>
                        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                            <MayoToggle label="blue" color="blue" defaultChecked />
                            <MayoToggle label="red" color="red" defaultChecked />
                            <MayoToggle label="green" color="green" defaultChecked />
                            <MayoToggle label="purple" color="purple" defaultChecked />
                            <MayoToggle label="gray" color="gray" defaultChecked />
                        </div>
                        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                            <MayoToggle label="비활성화" disabled />
                            <MayoToggle label="비활성화 (on)" disabled defaultChecked />
                        </div>
                    </div>
                    <p>Mayo Checkbox Test</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                            <MayoCheckbox label="sm" size="sm" color="blue" />
                            <MayoCheckbox label="md" size="md" color="blue" />
                            <MayoCheckbox label="lg" size="lg" color="blue" />
                        </div>
                        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                            <MayoCheckbox label="blue" color="blue" defaultChecked />
                            <MayoCheckbox label="red" color="red" defaultChecked />
                            <MayoCheckbox label="green" color="green" defaultChecked />
                            <MayoCheckbox label="purple" color="purple" defaultChecked />
                            <MayoCheckbox label="gray" color="gray" defaultChecked />
                        </div>
                        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                            <MayoCheckbox label="비활성화" disabled />
                            <MayoCheckbox label="비활성화 (on)" disabled defaultChecked />
                        </div>
                    </div>
                    <MayoBreadcrumb
                        items={[
                            { label: "홈", href: "/" },
                            { label: "컴포넌트", href: "/components" },
                            { label: "MayoBreadcrumb", href: "www.naver.com" },
                        ]}
                    />
                    <MayoDropdown
                        trigger={
                            <MayoBtn size="sm">
                                메뉴 <MdExpandMore style={{ verticalAlign: "middle" }} />
                            </MayoBtn>
                        }
                        items={[
                            { label: "프로필", icon: "👤", iconClassName: "tossface", onClick: () => alert("프로필") },
                            { label: "설정", icon: "⚙️", iconClassName: "tossface", onClick: () => alert("설정") },
                            { label: "비활성화", icon: "🚫", iconClassName: "tossface", disabled: true },
                            { label: "로그아웃", icon: "🚪", iconClassName: "tossface", onClick: () => alert("로그아웃") },
                        ]}
                    />
                </section>
            </div>
            <div className="ticks"></div>
        </>
    );
}

export default App;
