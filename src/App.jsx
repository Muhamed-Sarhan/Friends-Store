import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Pages/Home";
import ProductList from "./Pages/ProductList";
import Product from "./Pages/Product";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Cart from "./Pages/Cart";
import { ContextState } from "./Context";
import "./app.css";
import PrivateRoute from "./PrivateRoute";
import ForgetPassword from "./Pages/ForgetPassword";
import UpdateProfile from "./Pages/UpdateProfile";
import WishList from "./Pages/WishList";
import Fashion from "./Pages/Fashion";
import Accessories from "./Pages/Accessories";
import Others from "./Pages/Others";

const App = () => {
  return (
    <ContextState>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />

          <Route path="/ProductList" component={ProductList} />

          <Route path="/Product/:id" component={Product} />

          <Route path="/Cart" component={Cart} />

          <Route path="/WishList" component={WishList} />

          <Route path="/update" component={UpdateProfile} />

          <Route path="/Fashion" component={Fashion} />

          <Route path="/Accessories" component={Accessories} />

          <Route path="/Others" component={Others} />

          <Route path="/Login" component={Login} />

          <Route path="/Register" component={Register} />

          <Route path="/Forget-Password" component={ForgetPassword} />
        </Switch>
      </Router>
    </ContextState>
  );
};

export default App;
