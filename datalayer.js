/* ===========================
   FreshBasket Data Layer v1
   Works for Adobe Analytics
   =========================== */
 
window.digitalData = window.digitalData || {};
window.digitalData.events = window.digitalData.events || [];
 
// Helper: current time
function dlTime() {
  return new Date().toISOString();
}
 
// Helper: get query params
function getParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}
 
// Helper: push event (and show in console)
function dlPush(eventObj) {
  const payload = {
    ...eventObj,
    timestamp: dlTime(),
    pageURL: window.location.href
  };
 
  window.digitalData.events.push(payload);
 
  console.log("%c[DataLayer Event]", "color: green; font-weight: bold;");
  console.log(payload);
 
  // 👉 If Adobe Launch / AppMeasurement exists, trigger here later
  // Example (future):
  // if (window._satellite) _satellite.track(payload.event);
}
 
// Helper: get cart from localStorage
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}
 
// Helper: calculate cart total
function cartTotal(cart) {
  return cart.reduce((sum, item) => sum + (Number(item.price) * Number(item.qty)), 0);
}
 
/* ===========================
   Auto Page Load Tracking
   =========================== */
dlPush({
  event: "page_load",
  pageName: document.title || "Unknown Page"
});
 
/* ===========================
   Page Type Detection
   =========================== */
const path = window.location.pathname.toLowerCase();
 
if (path.includes("index.html")) {
  dlPush({
    event: "home_view"
  });
}
 
if (path.includes("category.html")) {
  const cat = getParam("cat") || "unknown";
  dlPush({
    event: "category_view",
    categoryName: cat
  });
}
 
if (path.includes("product.html")) {
  const productKey = getParam("product") || "unknown";
  dlPush({
    event: "product_view",
    productKey: productKey
  });
}
 
if (path.includes("cart.html")) {
  const cart = getCart();
 
  dlPush({
    event: "cart_view",
    cartCount: cart.length,
    cartTotal: cartTotal(cart),
    cartItems: cart
  });
}
 
if (path.includes("checkout.html")) {
  const cart = getCart();
 
  dlPush({
    event: "checkout_view",
    cartCount: cart.length,
    cartTotal: cartTotal(cart)
  });
}
 
if (path.includes("success.html")) {
  const lastOrder = JSON.parse(localStorage.getItem("lastOrder")) || [];
 
  dlPush({
    event: "purchase_success",
    orderItems: lastOrder,
    orderTotal: cartTotal(lastOrder)
  });
}
 
/* ===========================
   Manual Events (buttons etc.)
   =========================== */
 
// Make it globally usable inside HTML onclick=""
window.trackAddToCart = function(productObj, qty) {
  dlPush({
    event: "add_to_cart",
    product: productObj,
    quantity: qty
  });
};
 
window.trackRemoveFromCart = function(productObj) {
  dlPush({
    event: "remove_from_cart",
    product: productObj
  });
};