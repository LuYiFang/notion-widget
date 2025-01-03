import { Route, Routes } from "react-router-dom";
import Counter from "./pages/Counter";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/counter" element={<Counter />} />
      </Routes>
    </>
  );
}

export default App;
