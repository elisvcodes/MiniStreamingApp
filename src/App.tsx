import { Routes, Route } from "react-router-dom";
import "./styles.css";
import Home from "./routes/home";
import Watch from "./routes/watch";
const App = () => {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="watch/:id" element={<Watch />} />
      </Routes>
    </>
  );
};

export default App;
