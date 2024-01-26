import './App.css';
import './scss/app.scss'
import Main from "./pages/Main";
import NotFound from "./pages/NotFound";
import {Route, Routes} from "react-router-dom";
import Cart from "./pages/Cart";
import React from "react";
import FullPizza from "./pages/FullPizza";
import MainLayout from "./layouts/MainLayout";


function App() {
  return (
     <Routes>
       <Route path={'/'} element={<MainLayout/>}>
         <Route path={''} element={<Main />} />
         <Route path={'cart'} element={<Cart />} />
         <Route path={'pizza/:id'} element={<FullPizza />} />
         <Route path={'*'} element={<NotFound />} />
       </Route>
     </Routes>
  );
}

export default App;
