import Main from "./Main/Main";
import Card from "./StockCard/Card";
import {Outlet} from 'react-router-dom';
import Details from "./Details/Details";
const App = () => {
  return (
    <>
      <Outlet />
    </>
  );
}


export default App;
