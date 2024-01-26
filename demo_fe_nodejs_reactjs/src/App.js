import logo from './logo.svg';
import './App.css';
import ProductList from "./component/ProductList";
import {Route, Routes} from "react-router-dom";
import ProductCreate from "./component/ProductCreate";
import ProductEdit from "./component/ProductEdit";
import ProductDetail from "./component/ProductDetail";
import SendGmail from "./component/SendGmail";

function App() {
  return (
    <div>
        <Routes>
            <Route path='/' element={<ProductList/>}/>
            <Route path='/create' element={<ProductCreate/>}/>
            <Route path='/edit/:id' element={<ProductEdit/>}/>
            <Route path='/detail/:id' element={<ProductDetail/>}/>
            <Route path='/send' element={<SendGmail/>}/>
        </Routes>

    </div>
  );
}

export default App;
