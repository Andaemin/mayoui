import { useState } from "react";
import { MayoBtn } from "../components/MayoBtn";
import "../styles/App.css";

function App() {
    const [count, setCount] = useState(0);

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
            </section>

            <div className="ticks"></div>
        </>
    );
}

export default App;
