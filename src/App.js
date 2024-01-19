import './App.css';
import './scss/app.scss'
import Header from "./components/SmallComponents/Header";
import Main from "./pages/Main";
import NotFound from "./pages/NotFound";
import {Route, Routes} from "react-router-dom";
import Cart from "./pages/Cart";
import React, {useState} from "react";

export const SearchContext = React.createContext({});

// https://65a6cc5974cf4207b4f0d408.mockapi.io/items
function App() {
  const [searchValue, setSearchValue] = useState('')
  return (
      <div className="wrapper">
       <SearchContext.Provider value={{ searchValue, setSearchValue }}>
         <Header />
         <div className="content">
           <Routes>
             <Route path={'/'} element={<Main/>} />
             <Route path={'/cart'} element={<Cart />} />
             <Route path={'*'} element={<NotFound />} />
           </Routes>
         </div>
       </SearchContext.Provider>
      </div>
  );
}

export default App;
