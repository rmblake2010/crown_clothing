import { Routes, Route } from 'react-router-dom';

import Home from './routes/home/home.component';
import Navigation from './routes/Navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';



const Shop = () => {
  return(
    <div>
      <h1>I am the shop</h1>
    </div>
  )
}

const App = () => {
  return(
    <Routes>
      <Route path='/' element={<Navigation/>}>
        <Route index element={<Home/>} />
        <Route path='shop' element={<Shop/>}/>
        <Route path='auth' element={<Authentication/>}></Route>
        <Route />
      </Route> 
    </Routes>
  )
}

export default App;
