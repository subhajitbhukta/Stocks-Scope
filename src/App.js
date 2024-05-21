import {Outlet} from 'react-router-dom';
import Footer from './Components/Footer/Footer'

const App = () => {
  return (
    <>
      <Outlet />
      <Footer/>
    </>
  );
}


export default App;
