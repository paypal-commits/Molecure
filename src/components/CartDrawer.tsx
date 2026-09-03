import React, { useState } from "react";
import { X, Trash2, ShoppingBag, ShieldCheck, Ticket, Calendar, Truck, ArrowRight, Sparkles } from "lucide-react";
import { CartItem } from "../types";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  updateQuantity: (id: string, isSub: boolean, quantity: number) => void;
  removeFromCart: (id: string, isSub: boolean) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  updateQuantity,
  removeFromCart,
}: CartDrawerProps) {
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");

  // Checkout states
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [orderId, setOrderId] = useState("");
  
  // Tracking state
  const [trackId, setTrackId] = useState("");
  const [trackingDetails, setTrackingDetails] = useState<any | null>(null);

  if (!isOpen) return null;

  // Calculates sub-total with standard subscription discounts
  const subTotal = cart.reduce((total, item) => {
    const itemPrice = item.isSubscription
      ? item.product.price * (1 - item.product.subscriptionDiscount / 100)
      : item.product.price;
    return total + itemPrice * item.quantity;
  }, 0);

  const discountAmount = subTotal * (discountPercent / 100);
  const shipping = subTotal > 60 || subTotal === 0 ? 0 : 5.99;
  const grandTotal = subTotal - discountAmount + shipping;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    setCouponSuccess("");

    if (couponCode.toUpperCase() === "REDOX20") {
      setDiscountPercent(20);
      setCouponSuccess("REDOX20 coupon applied: Extra 20% off!");
    } else if (couponCode.toUpperCase() === "GENOME15") {
      setDiscountPercent(15);
      setCouponSuccess("GENOME15 coupon applied: Extra 15% off!");
    } else {
      setCouponError("Invalid or expired genomic coupon.");
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutComplete(true);
      setOrderId(`MLC-${Math.floor(Math.random() * 900000) + 100000}`);
    }, 2000);
  };

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackId) return;

    // Simulated high-fidelity clinical tracking status
    setTrackingDetails({
      id: trackId,
      status: "Analyzing DNA Synthesis",
      percentage: 35,
      description: "Our molecular biologists are verifying your SLC23A1 active transporter variations and preparing cofactor ratios.",
      eta: "4 business days",
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-xs flex justify-end">
      {/* Backdrop closer */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose}></div>

      {/* Slide Drawer Panel */}
      <div className="relative w-full max-w-md bg-slate-950/80 backdrop-blur-xl h-full shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-white/10 animate-slideLeft z-10 no-scrollbar">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-slate-950/40">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-emerald-400" />
            <h3 className="font-display font-bold text-lg text-white">
              Your Molecular Cart
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/10 text-slate-400 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Inner Panels: Shopping, Checkout Success, Tracking */}
        {checkoutComplete ? (
          // Checkout Success View
          <div className="p-6 text-center space-y-6 flex-grow flex flex-col justify-center items-center">
            <div className="w-16 h-16 bg-emerald-500/10 rounded-full border border-emerald-500/30 flex items-center justify-center animate-bounce">
              <ShieldCheck className="w-8 h-8 text-emerald-400" />
            </div>
            <div>
              <h4 className="font-display font-bold text-xl text-white">Formulation Dispatched</h4>
              <p className="text-slate-300 text-xs mt-2 max-w-sm mx-auto leading-relaxed">
                Your order is safely registered. We have securely initiated the algorithmic synthesis of your personalized cofactors.
              </p>
            </div>

            <div className="bg-slate-900/60 p-4 rounded-2xl border border-white/5 w-full text-left">
              <div className="flex justify-between text-xs border-b border-white/5 pb-2 mb-2 font-mono text-slate-500 uppercase font-bold">
                <span>Registration details</span>
                <span>STATUS: SECURED</span>
              </div>
              <div className="text-xs text-slate-300 space-y-1.5">
                <p><strong>Order ID:</strong> {orderId}</p>
                <p><strong>Estimated Synthesis:</strong> 48 hours</p>
                <p><strong>Clinical Delivery:</strong> USPS Ground (Free)</p>
              </div>
            </div>

            <button
              onClick={() => {
                setCheckoutComplete(false);
                setOrderId("");
                // Clear cart (handled in app state but simulated here)
                cart.length = 0;
                onClose();
              }}
              className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-md"
            >
              Back to Catalog
            </button>
          </div>
        ) : (
          // Default Cart View
          <div className="flex-grow flex flex-col justify-between overflow-y-auto p-6 no-scrollbar">
            
            {/* Cart Items list */}
            {cart.length > 0 ? (
              <div className="space-y-4 overflow-y-auto flex-grow max-h-[50vh] pr-1 no-scrollbar text-left">
                {cart.map((item) => {
                  const itemPrice = item.isSubscription
                    ? item.product.price * (1 - item.product.subscriptionDiscount / 100)
                    : item.product.price;

                  return (
                    <div
                      key={`${item.product.id}-${item.isSubscription ? "sub" : "single"}`}
                      className="flex items-center space-x-4 p-3 bg-slate-900/40 rounded-2xl border border-white/5 shadow-2xs group hover:border-white/10 transition-all"
                    >
                      <div className={`p-2 bg-gradient-to-br ${item.product.bgGradient} rounded-xl`}>
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-12 h-12 object-contain"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <div className="flex-grow min-w-0">
                        <h4 className="text-xs font-bold text-white truncate">{item.product.name}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-[10px] font-mono text-emerald-400 font-bold">${Math.round(itemPrice)}</span>
                          {item.isSubscription && (
                            <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20 flex items-center space-x-0.5">
                              <Calendar className="w-2.5 h-2.5" />
                              <span>Monthly Sub</span>
                            </span>
                          )}
                        </div>

                        {/* Quantity selector */}
                        <div className="flex items-center space-x-3 mt-2">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.isSubscription, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="w-5 h-5 bg-slate-950/60 border border-white/10 text-slate-300 rounded-md hover:bg-white/10 disabled:opacity-50 text-xs font-bold flex items-center justify-center focus:outline-hidden"
                          >
                            -
                          </button>
                          <span className="text-xs font-bold text-white">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.isSubscription, item.quantity + 1)}
                            className="w-5 h-5 bg-slate-950/60 border border-white/10 text-slate-300 rounded-md hover:bg-white/10 text-xs font-bold flex items-center justify-center focus:outline-hidden"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id, item.isSubscription)}
                        className="p-2 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-rose-500/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 flex-grow flex flex-col justify-center items-center space-y-4 text-slate-500">
                <ShoppingBag className="w-12 h-12 text-slate-600 animate-pulse" />
                <p className="text-xs font-medium">Your molecular cart is empty.</p>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-white/10 border border-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold"
                >
                  Shop Formulas
                </button>
              </div>
            )}

            {/* Sandbox Tracking Panel inside Cart Drawer */}
            <div className="border-t border-white/5 pt-6 mt-6 text-left">
              <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                <Truck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Track Personalized Formulation</span>
              </h4>

              <form onSubmit={handleTrackOrder} className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Insert Order ID (e.g. MLC-48102)"
                  value={trackId}
                  onChange={(e) => setTrackId(e.target.value)}
                  className="flex-grow px-3 py-2 bg-slate-950/60 border border-white/10 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
                <button
                  type="submit"
                  className="px-3 bg-emerald-500 text-white rounded-lg text-xs font-semibold hover:bg-emerald-600 transition-colors"
                >
                  Track
                </button>
              </form>

              {trackingDetails && (
                <div className="mt-3 bg-slate-900/60 p-3.5 rounded-xl border border-white/5 animate-scaleIn text-left">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase font-mono">{trackingDetails.status}</span>
                    <span className="text-[10px] font-mono text-slate-500">{trackingDetails.eta} left</span>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full transition-all"
                      style={{ width: `${trackingDetails.percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-2 leading-relaxed italic">
                    {trackingDetails.description}
                  </p>
                </div>
              )}
            </div>

            {/* Calculations & Checkout */}
            {cart.length > 0 && (
              <div className="border-t border-white/10 pt-6 mt-6 space-y-4 text-left">
                {/* Coupon Code module */}
                <form onSubmit={handleApplyCoupon} className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="GENOME15 or REDOX20"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-grow px-3 py-2 bg-slate-950/60 border border-white/10 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 uppercase font-mono font-semibold"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 border border-white/10 text-white bg-white/5 hover:bg-white/10 rounded-lg text-xs font-semibold transition-colors flex items-center space-x-1"
                  >
                    <Ticket className="w-3.5 h-3.5" />
                    <span>Apply</span>
                  </button>
                </form>

                {couponError && <p className="text-[10px] font-semibold text-rose-400 font-mono">{couponError}</p>}
                {couponSuccess && <p className="text-[10px] font-semibold text-emerald-400 font-mono">{couponSuccess}</p>}

                {/* Subtotals breakdown */}
                <div className="space-y-1.5 text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-mono">${subTotal.toFixed(2)}</span>
                  </div>
                  {discountPercent > 0 && (
                    <div className="flex justify-between text-emerald-400 font-semibold">
                      <span>Promo Discount ({discountPercent}%)</span>
                      <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Clinical Shipping</span>
                    <span className="font-mono">{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-white border-t border-white/10 pt-3">
                    <span>Grand Total</span>
                    <span className="font-mono">${grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  id="cart-checkout-btn"
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white rounded-2xl text-xs font-bold transition-all shadow-lg shadow-emerald-500/10 flex items-center justify-center space-x-2"
                >
                  <span>{isCheckingOut ? "Securing API channels..." : "Submit Secured Order"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center space-x-1.5 text-[10px] text-slate-500 font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>AES-256 SECURED COFACTOR ORDER DISPATCH</span>
                </div>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
}
