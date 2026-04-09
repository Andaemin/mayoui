# mayoui

React UI 컴포넌트 라이브러리입니다.

## 설치

```bash
npm install mayoui
```

## 컴포넌트

### MayoBtn

기본 버튼 컴포넌트입니다.

```tsx
import { MayoBtn } from "mayoui";

<MayoBtn>클릭</MayoBtn>;
```

#### Props

| Prop       | 타입                                  | 기본값      | 설명               |
| ---------- | ------------------------------------- | ----------- | ------------------ |
| `variant`  | `"primary" \| "secondary" \| "ghost"` | `"primary"` | 버튼 스타일        |
| `size`     | `"sm" \| "md" \| "lg"`                | `"md"`      | 버튼 크기          |
| `disabled` | `boolean`                             | `false`     | 비활성화 여부      |
| `onClick`  | `React.MouseEventHandler`             | —           | 클릭 이벤트 핸들러 |

그 외 `<button>` 의 모든 기본 속성을 지원합니다.

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

// disabled
<MayoBtn disabled>비활성화</MayoBtn>
```

---

### MayoDialog

> 개발 중입니다.

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
