import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { removeFromCart, updateCartItemCount, toggleCartItemCheck } from "../store/actions";

export default function CartPage() {
  const dispatch = useDispatch();
  const { cart } = useSelector(state => state.shoppingCart);

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleUpdateCount = (productId, newCount) => {
    if (newCount <= 0) {
      dispatch(removeFromCart(productId));
    } else {
      dispatch(updateCartItemCount(productId, newCount));
    }
  };

  const handleToggleCheck = (productId) => {
    dispatch(toggleCartItemCheck(productId));
  };

  // Calculate totals
  const checkedItems = cart.filter(item => item.checked);
  const subtotal = checkedItems.reduce((sum, item) => sum + (item.product.price * item.count), 0);
  const shipping = subtotal > 100 ? 0 : 15; // Free shipping over $100
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="mx-auto max-w-4xl px-4">
          <div className="text-center">
            <ShoppingBag size={64} className="mx-auto text-gray-400" />
            <h2 className="mt-4 text-2xl font-bold text-gray-900">Your cart is empty</h2>
            <p className="mt-2 text-gray-600">Start shopping to add items to your cart</p>
            <Link
              to="/shop"
              className="mt-6 inline-block rounded-lg bg-[#23A6F0] px-6 py-3 text-white hover:bg-blue-600"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-6xl px-4">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">Shopping Cart</h1>
        
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-4 border-b pb-4 last:border-b-0">
                    {/* Checkbox */}
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => handleToggleCheck(item.product.id)}
                      className="h-4 w-4 rounded border-gray-300 text-[#23A6F0] focus:ring-[#23A6F0]"
                    />
                    
                    {/* Product Image */}
                    <div className="h-20 w-20 rounded-lg bg-gray-100">
                      {item.product.images?.[0] ? (
                        <img
                          src={item.product.images[0].url}
                          alt={item.product.name}
                          className="h-full w-full rounded-lg object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-gray-400">
                          IMG
                        </div>
                      )}
                    </div>
                    
                    {/* Product Info */}
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">
                        {item.product.name || item.product.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {item.product.category}
                      </p>
                      <p className="text-lg font-semibold text-[#23856D]">
                        ${(item.product.price || 0).toFixed(2)}
                      </p>
                    </div>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleUpdateCount(item.product.id, item.count - 1)}
                        className="flex h-8 w-8 items-center justify-center rounded border hover:bg-gray-50"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-12 text-center font-medium">{item.count}</span>
                      <button
                        onClick={() => handleUpdateCount(item.product.id, item.count + 1)}
                        className="flex h-8 w-8 items-center justify-center rounded border hover:bg-gray-50"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    
                    {/* Total Price */}
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        ${((item.product.price || 0) * item.count).toFixed(2)}
                      </p>
                    </div>
                    
                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemoveItem(item.product.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">Order Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({checkedItems.length} items)</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-lg font-semibold text-gray-900">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <button
                disabled={checkedItems.length === 0}
                className="mt-6 w-full rounded-lg bg-[#23A6F0] py-3 text-white font-medium hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Create Order ({checkedItems.length} items)
              </button>
              
              <Link
                to="/shop"
                className="mt-3 block w-full rounded-lg border border-gray-300 py-3 text-center text-gray-700 hover:bg-gray-50"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}