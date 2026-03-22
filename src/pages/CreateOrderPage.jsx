import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Plus, Edit, Trash2, MapPin, CreditCard } from "lucide-react";
import { toast } from "react-toastify";
import AddressForm from "../components/AddressForm";
import CardForm from "../components/CardForm";
import { 
  fetchAddresses, 
  deleteAddress, 
  setSelectedAddress,
  fetchCards,
  deleteCard,
  setSelectedCard,
  createOrder
} from "../store/actions";

export default function CreateOrderPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { cart } = useSelector(state => state.shoppingCart);
  const { addressList, selectedAddress } = useSelector(state => state.address);
  const { cardList, selectedCard } = useSelector(state => state.card);
  
  const [currentStep, setCurrentStep] = useState(1);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [showCardForm, setShowCardForm] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [orderLoading, setOrderLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchAddresses());
    dispatch(fetchCards());
  }, [dispatch]);

  // Calculate totals
  const checkedItems = cart.filter(item => item.checked);
  const subtotal = checkedItems.reduce((sum, item) => sum + (item.product.price * item.count), 0);
  const shipping = subtotal > 100 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (checkedItems.length === 0) {
    history.push('/cart');
    return null;
  }

  const handleDeleteAddress = async (addressId) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      try {
        await dispatch(deleteAddress(addressId));
        toast.success('Address deleted successfully');
      } catch (error) {
        toast.error('Failed to delete address');
      }
    }
  };

  const handleSelectAddress = (address) => {
    dispatch(setSelectedAddress(address));
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setShowAddressForm(true);
  };

  const handleAddressFormClose = () => {
    setShowAddressForm(false);
    setEditingAddress(null);
  };

  const handleAddressFormSuccess = () => {
    dispatch(fetchAddresses());
  };

  const handleDeleteCard = async (cardId) => {
    if (window.confirm('Are you sure you want to delete this card?')) {
      try {
        await dispatch(deleteCard(cardId));
        toast.success('Card deleted successfully');
      } catch (error) {
        toast.error('Failed to delete card');
      }
    }
  };

  const handleSelectCard = (card) => {
    dispatch(setSelectedCard(card));
  };

  const handleEditCard = (card) => {
    setEditingCard(card);
    setShowCardForm(true);
  };

  const handleCardFormClose = () => {
    setShowCardForm(false);
    setEditingCard(null);
  };

  const handleNextStep = () => {
    if (currentStep === 1 && !selectedAddress) {
      toast.error('Please select an address');
      return;
    }
    setCurrentStep(2);
  };

  const maskCardNumber = (cardNo) => {
    const str = cardNo.toString();
    return str.slice(0, 4) + ' **** **** ' + str.slice(-4);
  };

  const handleCompleteOrder = async () => {
    if (!selectedAddress || !selectedCard) {
      toast.error('Please select address and payment method');
      return;
    }

    setOrderLoading(true);
    
    try {
      const orderData = {
        address_id: selectedAddress.id,
        order_date: new Date().toISOString(),
        card_no: selectedCard.card_no,
        card_name: selectedCard.name_on_card,
        card_expire_month: selectedCard.expire_month,
        card_expire_year: selectedCard.expire_year,
        card_ccv: 123, // This should come from a form input in real implementation
        price: total,
        products: checkedItems.map(item => ({
          product_id: item.product.id,
          count: item.count,
          detail: item.product.category || "No details"
        }))
      };

      await dispatch(createOrder(orderData));
      
      toast.success('🎉 Order created successfully! Thank you for your purchase!');
      
      // Redirect to orders page or home
      setTimeout(() => {
        history.push('/orders');
      }, 2000);
      
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create order');
    } finally {
      setOrderLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create Order</h1>
          
          {/* Steps */}
          <div className="mt-4 flex items-center">
            <div className={`flex items-center ${currentStep >= 1 ? 'text-[#23A6F0]' : 'text-gray-400'}`}>
              <div className={`flex h-8 w-8 items-center justify-center rounded-full ${currentStep >= 1 ? 'bg-[#23A6F0] text-white' : 'bg-gray-200'}`}>
                1
              </div>
              <span className="ml-2 font-medium">Address</span>
            </div>
            <div className="mx-4 h-px flex-1 bg-gray-300"></div>
            <div className={`flex items-center ${currentStep >= 2 ? 'text-[#23A6F0]' : 'text-gray-400'}`}>
              <div className={`flex h-8 w-8 items-center justify-center rounded-full ${currentStep >= 2 ? 'bg-[#23A6F0] text-white' : 'bg-gray-200'}`}>
                2
              </div>
              <span className="ml-2 font-medium">Payment</span>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">
                    <MapPin className="mr-2 inline" size={20} />
                    Delivery Address
                  </h2>
                  <button
                    onClick={() => setShowAddressForm(true)}
                    className="flex items-center gap-2 rounded-lg bg-[#23A6F0] px-4 py-2 text-white hover:bg-blue-600"
                  >
                    <Plus size={16} />
                    Add Address
                  </button>
                </div>

                {addressList.length === 0 ? (
                  <div className="text-center py-8">
                    <MapPin size={48} className="mx-auto text-gray-400" />
                    <p className="mt-2 text-gray-600">No addresses found</p>
                    <button
                      onClick={() => setShowAddressForm(true)}
                      className="mt-4 rounded-lg bg-[#23A6F0] px-6 py-2 text-white hover:bg-blue-600"
                    >
                      Add Your First Address
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {addressList.map((address) => (
                      <div
                        key={address.id}
                        className={`cursor-pointer rounded-lg border-2 p-4 transition-colors ${
                          selectedAddress?.id === address.id
                            ? 'border-[#23A6F0] bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleSelectAddress(address)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <input
                                type="radio"
                                checked={selectedAddress?.id === address.id}
                                onChange={() => handleSelectAddress(address)}
                                className="text-[#23A6F0] focus:ring-[#23A6F0]"
                              />
                              <h3 className="font-medium text-gray-900">{address.title}</h3>
                            </div>
                            <p className="mt-1 text-sm text-gray-600">
                              {address.name} {address.surname}
                            </p>
                            <p className="text-sm text-gray-600">{address.phone}</p>
                            <p className="text-sm text-gray-600">
                              {address.neighborhood}, {address.district}, {address.city}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditAddress(address);
                              }}
                              className="text-gray-400 hover:text-blue-600"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteAddress(address.id);
                              }}
                              className="text-gray-400 hover:text-red-600"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {currentStep === 2 && (
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">
                    <CreditCard className="mr-2 inline" size={20} />
                    Payment Method
                  </h2>
                  <button
                    onClick={() => setShowCardForm(true)}
                    className="flex items-center gap-2 rounded-lg bg-[#23A6F0] px-4 py-2 text-white hover:bg-blue-600"
                  >
                    <Plus size={16} />
                    Add Card
                  </button>
                </div>

                {cardList.length === 0 ? (
                  <div className="text-center py-8">
                    <CreditCard size={48} className="mx-auto text-gray-400" />
                    <p className="mt-2 text-gray-600">No cards found</p>
                    <button
                      onClick={() => setShowCardForm(true)}
                      className="mt-4 rounded-lg bg-[#23A6F0] px-6 py-2 text-white hover:bg-blue-600"
                    >
                      Add Your First Card
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cardList.map((card) => (
                      <div
                        key={card.id}
                        className={`cursor-pointer rounded-lg border-2 p-4 transition-colors ${
                          selectedCard?.id === card.id
                            ? 'border-[#23A6F0] bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleSelectCard(card)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <input
                                type="radio"
                                checked={selectedCard?.id === card.id}
                                onChange={() => handleSelectCard(card)}
                                className="text-[#23A6F0] focus:ring-[#23A6F0]"
                              />
                              <h3 className="font-medium text-gray-900">
                                {maskCardNumber(card.card_no)}
                              </h3>
                            </div>
                            <p className="mt-1 text-sm text-gray-600">
                              {card.name_on_card}
                            </p>
                            <p className="text-sm text-gray-600">
                              Expires: {card.expire_month.toString().padStart(2, '0')}/{card.expire_year}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditCard(card);
                              }}
                              className="text-gray-400 hover:text-blue-600"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteCard(card.id);
                              }}
                              className="text-gray-400 hover:text-red-600"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">Order Summary</h2>
              
              {/* Products */}
              <div className="mb-4 space-y-3">
                {checkedItems.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded bg-gray-100">
                      {item.product.images?.[0] ? (
                        <img
                          src={item.product.images[0].url}
                          alt={item.product.name}
                          className="h-full w-full rounded object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                          IMG
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm font-medium text-gray-900">
                        {item.product.name || item.product.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item.count} x ${(item.product.price || 0).toFixed(2)}
                      </p>
                    </div>
                    <p className="text-sm font-medium">
                      ${((item.product.price || 0) * item.count).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
              
              {/* Totals */}
              <div className="space-y-2 border-t pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t pt-2 font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 space-y-3">
                {currentStep === 1 ? (
                  <button
                    onClick={handleNextStep}
                    disabled={!selectedAddress}
                    className="w-full rounded-lg bg-[#23A6F0] py-3 text-white font-medium hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Continue to Payment
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="w-full rounded-lg border border-gray-300 py-3 text-gray-700 hover:bg-gray-50"
                    >
                      Back to Address
                    </button>
                    <button 
                      onClick={handleCompleteOrder}
                      disabled={!selectedCard || orderLoading}
                      className="w-full rounded-lg bg-[#23A6F0] py-3 text-white font-medium hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      {orderLoading ? (
                        <div className="flex items-center justify-center">
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                          Creating Order...
                        </div>
                      ) : (
                        'Complete Order'
                      )}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Address Form Modal */}
      {showAddressForm && (
        <AddressForm
          address={editingAddress}
          onClose={handleAddressFormClose}
          onSuccess={handleAddressFormSuccess}
        />
      )}
      {/* Card Form Modal */}
      {showCardForm && (
        <CardForm
          card={editingCard}
          onClose={handleCardFormClose}
          onSuccess={handleCardFormSuccess}
        />
      )}
    </div>
  );
}