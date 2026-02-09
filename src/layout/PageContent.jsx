import { Switch, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import ShopPage from "../pages/ShopPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import ContactPage from "../pages/ContactPage";
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

        {/* 404 */}
        <Route component={NotFound} />
      </Switch>
    </main>
  );
}
