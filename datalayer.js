/* ================================
   Adobe Data Layer - FreshBasket
   Tracks ONLY BUTTON EVENTS + Page Info
   Shows in Console
   ================================ */
 
window.adobeDataLayer = window.adobeDataLayer || [];
 
/* ✅ Helper: ISO Time */
function dlTime() {
  return new Date().toISOString();
}
 
/* ✅ Helper: push event to adobeDataLayer */
function dlPush(eventObj) {
  const payload = {
    ...eventObj,
    timestamp: dlTime(),
    pageURL: window.location.href,
    pageName: document.title
  };
 
  // ✅ Push to Adobe Data Layer
  window.adobeDataLayer.push(payload);
 
  // ✅ Show event name + details
  console.log("%c[ADOBE DL EVENT] " + payload.event, "color:#00ff00; font-weight:bold;");
  console.table(payload);
}
 
/* ✅ Cart helper */
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}
 
/* ✅ Cart total helper */
function getCartTotal(cart) {
  return cart.reduce((sum, item) => sum + (Number(item.price) * Number(item.qty)), 0);
}
 
/* =================================================
   ✅ BUTTON EVENTS (ONLY)
   These functions will be called from your buttons
   ================================================= */
 
/* ✅ Add to Cart button event */
window.trackAddToCartClick = function(productObj, qty) {
  dlPush({
    event: "add_to_cart_click",
    product: {
      name: productObj?.name || "unknown",
      price: productObj?.price || 0
    },
    quantity: Number(qty)
  });
};
 
/* ✅ Checkout button click event */
window.trackCheckoutClick = function() {
  const cart = getCart();
 
  dlPush({
    event: "checkout_click",
    cartCount: cart.length,
    cartTotal: getCartTotal(cart)
  });
};
 
/* ✅ Purchase / Place order button click event */
window.trackPurchaseClick = function() {
  const cart = getCart();
 
  dlPush({
    event: "purchase_click",
    cartCount: cart.length,
    cartTotal: getCartTotal(cart),
    orderItems: cart
  });
};
