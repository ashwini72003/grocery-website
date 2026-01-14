window.adobeDataLayer = window.adobeDataLayer || [];
 
window.dlPush = function (eventObj) {
  const payload = {
    ...eventObj,
    timestamp: new Date().toISOString(),
    pageURL: window.location.href,
    pageName: document.title
  };
 
  window.adobeDataLayer.push(payload);
 
  console.log("%c[ADOBE DL EVENT] " + payload.event, "color:#00ff00; font-weight:bold;");
  console.log(payload);
 
  return payload;
};
 
// ✅ Auto Page Load Event
document.addEventListener("DOMContentLoaded", function () {
  dlPush({ event: "page_load" });
});
 
// ✅ Button Click Events
window.trackAddToCartClick = function (productObj, qty) {
  dlPush({
    event: "add_to_cart_click",
    product: {
      name: productObj?.name || "unknown",
      price: productObj?.price || 0
    },
    quantity: Number(qty)
  });
};
 
window.trackCheckoutClick = function () {
  dlPush({ event: "checkout_click" });
};
 
window.trackPurchaseClick = function () {
  dlPush({ event: "purchase_click" });
};
