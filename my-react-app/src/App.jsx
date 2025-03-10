import { BrowserRouter, Route, Routes } from "react-router-dom"
import './App.css'
import AboutUs from "./pages/About"
import Contact from "./pages/Contact"
import Container from "./pages/Container"
import Home from "./pages/Home"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Container />}
        >
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs title="Trang thông tin" />} />
          <Route path="/contact" element={<Contact title="Trang liên lạc" />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
