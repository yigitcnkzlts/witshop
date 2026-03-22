import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ChevronDown, ChevronUp, Package, Calendar, CreditCard, MapPin } from "lucide-react";
import { fetchOrders } from "../store/actions";

export default function OrdersPage() {
  const dispatch = useDispatch();
  const { orderList } = useSelector(state => state.order);
  const [expandedOrders, setExpandedOrders] = useState(new Set());

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const toggleOrderExpansion = (orderId) => {
    const newExpanded = new Set(expandedOrders);
    if (newExpanded.has(orderId)) {
      newExpanded.delete(orderId);
    } else {
      newExpanded.add(orderId);
    }
    setExpandedOrders(newExpanded);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getOrderStatus = (order) => {
    // This would come from the API in a real implementation
    const statuses = ['Processing', 'Shipped', 'Delivered', 'Cancelled'];
    return statuses[Math.floor(Math.random() * statuses.length)];
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (orderList.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="mb-8 text-3xl font-bold text-gray-900">My Orders</h1>
          <div className="text-center">
            <Package size={64} className="mx-auto text-gray-400" />
            <h2 className="mt-4 text-2xl font-bold text-gray-900">No orders yet</h2>
            <p className="mt-2 text-gray-600">When you place orders, they will appear here</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-4xl px-4">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">My Orders</h1>
        
        <div className="space-y-6">
          {orderList.map((order) => {
            const isExpanded = expandedOrders.has(order.id);
            const status = getOrderStatus(order);
            
            return (
              <div key={order.id} className="rounded-lg bg-white shadow-sm">
                {/* Order Header */}
                <div 
                  className="cursor-pointer p-6"
                  onClick={() => toggleOrderExpansion(order.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          Order #{order.id}
                        </h3>
                        <div className="mt-1 flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {formatDate(order.order_date)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Package size={14} />
                            {order.products?.length || 0} items
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(status)}`}>
                        {status}
                      </span>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          ${(order.price || 0).toFixed(2)}
                        </p>
                      </div>
                      {isExpanded ? (
                        <ChevronUp size={20} className="text-gray-400" />
                      ) : (
                        <ChevronDown size={20} className="text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Order Details */}
                {isExpanded && (
                  <div className="border-t bg-gray-50 p-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      {/* Products */}
                      <div>
                        <h4 className="mb-3 font-medium text-gray-900">Products</h4>
                        <div className="space-y-3">
                          {order.products?.map((product, index) => (
                            <div key={index} className="flex items-center gap-3 rounded bg-white p-3">
                              <div className="h-12 w-12 rounded bg-gray-100 flex items-center justify-center">
                                <Package size={20} className="text-gray-400" />
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-gray-900">
                                  Product ID: {product.product_id}
                                </p>
                                <p className="text-sm text-gray-600">
                                  Quantity: {product.count}
                                </p>
                                {product.detail && (
                                  <p className="text-sm text-gray-600">
                                    Details: {product.detail}
                                  </p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Order Info */}
                      <div className="space-y-4">
                        {/* Payment Info */}
                        <div className="rounded bg-white p-4">
                          <h4 className="mb-2 flex items-center gap-2 font-medium text-gray-900">
                            <CreditCard size={16} />
                            Payment Information
                          </h4>
                          <div className="space-y-1 text-sm text-gray-600">
                            <p>Card: **** **** **** {order.card_no?.toString().slice(-4)}</p>
                            <p>Cardholder: {order.card_name}</p>
                            <p>Expires: {order.card_expire_month?.toString().padStart(2, '0')}/{order.card_expire_year}</p>
                          </div>
                        </div>

                        {/* Address Info */}
                        <div className="rounded bg-white p-4">
                          <h4 className="mb-2 flex items-center gap-2 font-medium text-gray-900">
                            <MapPin size={16} />
                            Delivery Address
                          </h4>
                          <div className="text-sm text-gray-600">
                            <p>Address ID: {order.address_id}</p>
                          </div>
                        </div>

                        {/* Order Summary */}
                        <div className="rounded bg-white p-4">
                          <h4 className="mb-2 font-medium text-gray-900">Order Summary</h4>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Total Amount:</span>
                              <span className="font-medium">${(order.price || 0).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Status:</span>
                              <span className={`rounded px-2 py-1 text-xs font-medium ${getStatusColor(status)}`}>
                                {status}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}