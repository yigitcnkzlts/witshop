import { Switch, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import ShopPage from "../pages/ShopPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import ContactPage from "../pages/ContactPage";
import TeamPage from "../pages/TeamPage";
import AboutPage from "../pages/AboutPage";
import SignUpPage from "../pages/SignUpPage";
import LoginPage from "../pages/LoginPage";
import NotFound from "../pages/NotFound";

export default function PageContent() {
  return (
    <main className="flex w-full flex-1 flex-col">
      <Switch>
        {/* Home */}
        <Route exact path="/" component={HomePage} />

        {/* T03 – Shop Page */}
        <Route exact path="/shop" component={ShopPage} />

        {/* T04 – Product Detail */}
        <Route path="/shop/:productId" component={ProductDetailPage} />

        {/* T05 – Contact Page */}
        <Route exact path="/contact" component={ContactPage} />

        {/* T06 – Team Page */}
        <Route exact path="/team" component={TeamPage} />

        {/* T07 – About Page */}
        <Route exact path="/about" component={AboutPage} />

        {/* T08 – Sign Up Page */}
        <Route exact path="/signup" component={SignUpPage} />

        {/* T10 – Login Page */}
        <Route exact path="/login" component={LoginPage} />

        {/* 404 */}
        <Route component={NotFound} />
      </Switch>
    </main>
  );
}
