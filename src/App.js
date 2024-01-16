import './App.css';
import './scss/app.scss'
import Header from "./components/SmallComponents/Header";
import Main from "./pages/Main";
import NotFound from "./pages/NotFound";
import {Route, Routes} from "react-router-dom";
import Cart from "./pages/Cart";



// https://65a6cc5974cf4207b4f0d408.mockapi.io/items
function App() {


  return (
      <div className="wrapper">
        <Header/>
        <div className="content">
          <div className="container">
            <Routes>
              <Route path={'/'} element={<Main />} />
              <Route path={'/cart'} element={<Cart />} />
              <Route path={'*'} element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </div>
  );
}

export default App;
