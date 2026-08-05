# mayoui

React UI 컴포넌트 라이브러리입니다.

## 설치

```bash
npm install mayoui
```

## 스타일 적용

```tsx
import "mayoui/styles";
```

## 컴포넌트

### MayoBtn

기본 버튼 컴포넌트입니다.

```tsx
import { MayoBtn } from "mayoui";

<MayoBtn>클릭</MayoBtn>;
```

#### Props

| Prop       | 타입                                                   | 기본값      | 설명               |
| ---------- | ------------------------------------------------------ | ----------- | ------------------ |
| `variant`  | `"primary" \| "secondary" \| "ghost"`                  | `"primary"` | 버튼 스타일        |
| `size`     | `"xs" \| "sm" \| "md" \| "lg" \| "xl" \| "2xl"`       | `"md"`      | 버튼 크기          |
| `color`    | `"gray" \| "blue" \| "red" \| "green" \| "purple"`     | `"blue"`    | 버튼 색상          |
| `disabled` | `boolean`                                              | `false`     | 비활성화 여부      |
| `onClick`  | `React.MouseEventHandler`                              | —           | 클릭 이벤트 핸들러 |

그 외 `<button>`의 모든 기본 속성을 지원합니다.

#### 사용 예시

```tsx
// variant
<MayoBtn variant="primary">Primary</MayoBtn>
<MayoBtn variant="secondary">Secondary</MayoBtn>
<MayoBtn variant="ghost">Ghost</MayoBtn>

// size
<MayoBtn size="sm">Small</MayoBtn>
<MayoBtn size="md">Medium</MayoBtn>
<MayoBtn size="lg">Large</MayoBtn>

// color
<MayoBtn color="blue">Blue</MayoBtn>
<MayoBtn color="red">Red</MayoBtn>

// disabled
<MayoBtn disabled>비활성화</MayoBtn>
```

---

### MayoDialog

모달 다이얼로그 컴포넌트입니다. 네이티브 `<dialog>` 요소를 기반으로 합니다.

```tsx
import { MayoDialog, MayoBtn } from "mayoui";
import { useState } from "react";

function App() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <MayoBtn onClick={() => setOpen(true)}>열기</MayoBtn>
            <MayoDialog
                open={open}
                onClose={() => setOpen(false)}
                title="제목"
                footer={<MayoBtn onClick={() => setOpen(false)}>확인</MayoBtn>}
            >
                다이얼로그 내용입니다.
            </MayoDialog>
        </>
    );
}
```

#### Props

| Prop              | 타입                        | 기본값  | 설명                         |
| ----------------- | --------------------------- | ------- | ---------------------------- |
| `open`            | `boolean`                   | —       | 다이얼로그 열림 여부         |
| `onClose`         | `() => void`                | —       | 닫기 콜백                    |
| `title`           | `ReactNode`                 | —       | 헤더 제목                    |
| `footer`          | `ReactNode`                 | —       | 하단 푸터 영역               |
| `size`            | `"sm" \| "md" \| "lg"`      | `"md"`  | 다이얼로그 크기              |
| `closeOnBackdrop` | `boolean`                   | `true`  | 배경 클릭 시 닫기 여부       |

---

### MayoToast

알림 토스트 컴포넌트입니다. `document.body`에 포탈로 렌더링됩니다.

```tsx
import { MayoToast, MayoBtn } from "mayoui";
import { useState } from "react";

function App() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <MayoBtn onClick={() => setOpen(true)}>알림 보기</MayoBtn>
            <MayoToast
                open={open}
                onClose={() => setOpen(false)}
                type="success"
                position="top-right"
                duration={3000}
            >
                저장되었습니다!
            </MayoToast>
        </>
    );
}
```

#### Props

| Prop       | 타입                                                                                              | 기본값        | 설명                              |
| ---------- | ------------------------------------------------------------------------------------------------- | ------------- | --------------------------------- |
| `open`     | `boolean`                                                                                         | —             | 토스트 표시 여부                  |
| `onClose`  | `() => void`                                                                                      | —             | 닫기 콜백 (duration 후 자동 호출) |
| `type`     | `"success" \| "error" \| "info" \| "warning"`                                                     | `"info"`      | 토스트 종류                       |
| `position` | `"top-right" \| "top-left" \| "bottom-right" \| "bottom-left" \| "top-center" \| "bottom-center"` | `"top-right"` | 화면 위치                         |
| `duration` | `number`                                                                                          | `3000`        | 자동 닫힘 시간 (ms)               |

---

## 개발

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 테스트 실행
npm run test

# 빌드
npm run build
```
