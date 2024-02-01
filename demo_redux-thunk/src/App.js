import './App.css';
import ListPosts from "./component/ListPosts";
import {Route, Routes} from "react-router-dom";
import CreatePosts from "./component/CreatePosts";

function App() {
    return (
        <Routes>
            <Route path='/' element={<ListPosts/>}/>
            <Route path='/create' element={<CreatePosts/>}/>
        </Routes>

    );
}

export default App;
