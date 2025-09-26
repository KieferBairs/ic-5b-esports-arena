// Coding Challenge 5 (In class)

// Esports Arena catalog (price per unit)
const products = [
  { id: 201, name: "Pro Mouse (wired)",   category: "gear",    price: 39.99 },
  { id: 202, name: "Team Jersey",         category: "apparel", price: 49.5  },
  { id: 203, name: "Energy Drink 6-pack", category: "snacks",  price: 12.0  },
  { id: 204, name: "Arena Day Pass",      category: "access",  price: 15.0  },
  { id: 205, name: "Switchable Keycaps",  category: "gear",    price: 19.0  },
]

// Example cart (product & quantity)
const cart = [
  { productId: 202, qty: 1 },
  { productId: 203, qty: 2 },
  { productId: 204, qty: 1 },
  { productId: 205, qty: 1 },
]

// Try: "regular", "student", "member", or "vip"
const customerType = "member";

// Task 1 
function getCategoryDiscount(category) {
    switch (category) {
        case "gear":
            return .1
            break;
        case "apparel":
            return .15
            break;
        case "snacks":
            return .08
            break;
        case "access":
            return .05
            break;
        default:
            return 0
            break;
    }
}

// Task 2
function priceAfterCategoryDiscount(product){
    let rate = getCategoryDiscount(product.category);
    return product.price * (1-rate);
}

// Task 3

function findProductById(id) {
   for (let p of products) {
    if (p.id === id) return p;
   }
    return null;  
}

// Task 4

function lineItemTotal(cartItem) {
  const product = findProductById(cartItem.productId);
  if (!product || cartItem.qty <= 0) return 0;
  const unit = priceAfterCategoryDiscount(product);
  return unit * cartItem.qty;
}

// Task 5

function orderSubtotal(cart) {
  let total = 0;
  for (let item of cart) {
    total += lineItemTotal(item);
  }
  return total;
}

// Task 6

function customerAdjustmentRate(customerType) {
  switch (customerType) {
    case "student": return 0.03;
    case "member": return 0.05;
    case "vip": return 0.10;
    default: return 0;
  }
}

// Task 7 

function orderTotal(cart, customerType) {
  const sub = orderSubtotal(cart);
  const adj = customerAdjustmentRate(customerType);
  return sub * (1 - adj);
}

// Task 8 

function formatCurrency(amount) {
  return "$" + amount.toFixed(2);
}

// Task 9 

function printReceipt(cart, customerType) {
  let sub = 0;
  for (let item of cart) {
    const product = findProductById(item.productId);
    if (!product) continue;
    const unit = priceAfterCategoryDiscount(product);
    const line = unit * item.qty;
    console.log(`${product.name} x${item.qty} @ ${formatCurrency(unit)} = ${formatCurrency(line)}`);
    sub += line;
  }
  const adjRate = customerAdjustmentRate(customerType);
  const final = sub * (1 - adjRate);

  console.log("Subtotal: " + formatCurrency(sub));
  console.log(`Customer Adjustment (${customerType}): ${adjRate * 100}%`);
  console.log("Final Total: " + formatCurrency(final));
}


// Run Reciept

printReceipt(cart, customerType);
