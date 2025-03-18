import {BrowserRouter, Route, Routes} from "react-router";
import {Create} from "./pages/create/Create.tsx";
import {Home} from "./pages/home/Home.tsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
