import {Route, Routes} from "react-router-dom";
import React, {lazy, Suspense} from "react";

import './App.css';
import './scss/app.scss'

import MainLayout from "./layouts/MainLayout";
import Main from "./pages/Main";

const Cart = lazy(() => import('./pages/Cart'))
const FullPizza = lazy(() => import('./pages/FullPizza'))
const NotFound = lazy(() => import('./pages/NotFound'))

function App() {
  return (
     <Routes>
       <Route path={'/'} element={<MainLayout/>}>
         <Route path={''} element={<Main />} />
         <Route path={'cart'} element={
           <Suspense fallback={<div>Загрузка корзины</div>}>
            <Cart />
           </Suspense>} />
         <Route path={'pizza/:id'} element={
           <Suspense fallback={<div>Загрузка Пиццы...</div>}>
             <FullPizza />
           </Suspense>} />
         <Route path={'*'} element={
           <Suspense fallback={<div>Пустая страница</div>}>
             <NotFound />
           </Suspense>}
         />
       </Route>
     </Routes>
  );
}

export default App;
