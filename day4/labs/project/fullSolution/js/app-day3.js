"use strict";

/**
 * DAY 3 (Wednesday) — Vanilla JS, NO AJAX
 * Features:
 * - Render customers from in-memory arrays
 * - Filter customers from the search box (#customerSearch)
 * - Click customer -> render orders
 * - Click order -> render order details + total
 * - Reset clears selection + clears search
 *
 * Notes:
 * - "Show more" is not part of Day 3. If it exists in HTML, we hide it.
 */

/* ----------------------------- Sample data ----------------------------- */

const SAMPLE_CUSTOMERS = [
  { CustomerID: "ALFKI", CompanyName: "Alfreds Futterkiste", Country: "Germany" },
  { CustomerID: "ANATR", CompanyName: "Ana Trujillo Emparedados", Country: "Mexico" },
  { CustomerID: "AROUT", CompanyName: "Around the Horn", Country: "United Kingdom" },
  { CustomerID: "BONAP", CompanyName: "Bon app'", Country: "France" },
  { CustomerID: "BSBEV", CompanyName: "B's Beverages", Country: "United Kingdom" },
  { CustomerID: "FRANK", CompanyName: "Frankenversand", Country: "Germany" },
  { CustomerID: "VINET", CompanyName: "Vins et alcools Chevalier", Country: "France" },
];

const SAMPLE_ORDERS = [
  { OrderID: 10248, CustomerID: "VINET", OrderDate: "/Date(836434800000)/" },
  { OrderID: 10249, CustomerID: "VINET", OrderDate: "/Date(836521200000)/" },
  { OrderID: 10250, CustomerID: "ALFKI", OrderDate: "/Date(836602800000)/" },
  { OrderID: 10251, CustomerID: "BSBEV", OrderDate: "/Date(836689200000)/" },
  { OrderID: 10252, CustomerID: "FRANK", OrderDate: "/Date(836775600000)/" },
  { OrderID: 10253, CustomerID: "BONAP", OrderDate: "/Date(836862000000)/" },
];

const SAMPLE_ORDER_DETAILS = [
  { OrderID: 10248, ProductName: "Queso Cabrales", UnitPrice: 14.0, Quantity: 12, Discount: 0.0 },
  { OrderID: 10248, ProductName: "Fried Mee", UnitPrice: 9.8, Quantity: 10, Discount: 0.0 },

  { OrderID: 10249, ProductName: "Tofu", UnitPrice: 18.6, Quantity: 9, Discount: 0.0 },

  { OrderID: 10250, ProductName: "Chai", UnitPrice: 14.4, Quantity: 10, Discount: 0.15 },

  { OrderID: 10251, ProductName: "Chang", UnitPrice: 15.2, Quantity: 6, Discount: 0.0 },

  { OrderID: 10252, ProductName: "Aniseed Syrup", UnitPrice: 8.0, Quantity: 40, Discount: 0.0 },

  { OrderID: 10253, ProductName: "Chef Anton's Seasoning", UnitPrice: 22.0, Quantity: 5, Discount: 0.0 },
];

/* ----------------------------- DOM bindings ---------------------------- */

const el = {
  customersTbody: document.getElementById("customersTbody"),
  ordersTbody: document.getElementById("ordersTbody"),
  detailsTbody: document.getElementById("orderDetailsTbody"),

  customerSearch: document.getElementById("customerSearch"),
  showMoreBtn: document.getElementById("showMoreBtn"), // should not exist for Day 3, but harmless

  selectedCustomerLabel: document.getElementById("selectedCustomerLabel"),
  selectedOrderLabel: document.getElementById("selectedOrderLabel"),
  orderTotalLabel: document.getElementById("orderTotalLabel"),

  customerCounter: document.getElementById("customerCounter"),
  statusMessage: document.getElementById("statusMessage"),

  resetBtn: document.getElementById("resetBtn"),
};

const state = {
  query: "",
  selectedCustomerId: null,
  selectedOrderId: null,
};

/* ----------------------------- Entry point ----------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  // Hide "show more" if it still exists (Day 3 does not use it)
  if (el.showMoreBtn) el.showMoreBtn.style.display = "none";

  guardRequiredElements();
  bindEvents();

  setStatus("Ready (Day 3: local data)", "info");

  // Initial render (no filter)
  renderCustomers(getFilteredCustomers());
  updateCustomerCounter(getFilteredCustomers().length, SAMPLE_CUSTOMERS.length);

  clearOrders("Select a customer to view orders.");
  clearDetails("Select an order to view line items.");
  updateResetButton();
});

/* ------------------------------ Guards -------------------------------- */

function guardRequiredElements() {
  const required = [
    ["customersTbody", el.customersTbody],
    ["ordersTbody", el.ordersTbody],
    ["detailsTbody", el.detailsTbody],
    ["customerSearch", el.customerSearch],
    ["resetBtn", el.resetBtn],
    ["customerCounter", el.customerCounter],
    ["statusMessage", el.statusMessage],
    ["selectedCustomerLabel", el.selectedCustomerLabel],
    ["selectedOrderLabel", el.selectedOrderLabel],
    ["orderTotalLabel", el.orderTotalLabel],
  ];

  for (const [name, node] of required) {
    if (!node) {
      throw new Error(`Missing required element: #${name} (check your IDs in index.html)`);
    }
  }
}

/* ------------------------------ Events --------------------------------- */

function bindEvents() {
  // Search / filter customers
  el.customerSearch.addEventListener("input", () => {
    state.query = el.customerSearch.value.trim().toLowerCase();

    // Simplest correct behaviour: filtering clears selection
    clearSelection();

    const filtered = getFilteredCustomers();
    renderCustomers(filtered);
    updateCustomerCounter(filtered.length, SAMPLE_CUSTOMERS.length);

    setStatus("Filtered customers.", "info");
  });

  // Customer click selection (event delegation)
  el.customersTbody.addEventListener("click", (evt) => {
    const row = evt.target.closest("tr[data-customer-id]");
    if (!row) return;
    selectCustomer(row.dataset.customerId);
  });

  // Customer keyboard selection (Enter / Space)
  el.customersTbody.addEventListener("keydown", (evt) => {
    if (evt.key !== "Enter" && evt.key !== " ") return;
    const row = evt.target.closest("tr[data-customer-id]");
    if (!row) return;
    evt.preventDefault();
    selectCustomer(row.dataset.customerId);
  });

  // Order selection
  el.ordersTbody.addEventListener("click", (evt) => {
    const row = evt.target.closest("tr[data-order-id]");
    if (!row) return;
    selectOrder(Number(row.dataset.orderId));
  });

  el.ordersTbody.addEventListener("keydown", (evt) => {
    if (evt.key !== "Enter" && evt.key !== " ") return;
    const row = evt.target.closest("tr[data-order-id]");
    if (!row) return;
    evt.preventDefault();
    selectOrder(Number(row.dataset.orderId));
  });

  // Reset (clears search + selection)
  el.resetBtn.addEventListener("click", () => {
    state.query = "";
    el.customerSearch.value = "";
    clearSelection();

    renderCustomers(getFilteredCustomers());
    updateCustomerCounter(getFilteredCustomers().length, SAMPLE_CUSTOMERS.length);

    setStatus("Reset complete.", "info");
  });
}

/* ------------------------------ Rendering ------------------------------ */

function renderCustomers(customers) {
  el.customersTbody.textContent = "";

  if (customers.length === 0) {
    el.customersTbody.innerHTML = `<tr><td colspan="3">No customers match your search.</td></tr>`;
    return;
  }

  for (const c of customers) {
    const tr = document.createElement("tr");
    tr.className = "row is-clickable";
    tr.dataset.customerId = c.CustomerID;
    tr.tabIndex = 0;
    tr.setAttribute("aria-selected", "false");

    tr.appendChild(td(c.CustomerID));
    tr.appendChild(td(c.CompanyName));
    tr.appendChild(td(c.Country));

    el.customersTbody.appendChild(tr);
  }
}

function renderOrders(orders) {
  el.ordersTbody.textContent = "";

  if (orders.length === 0) {
    clearOrders("No orders for this customer.");
    return;
  }

  for (const o of orders) {
    const tr = document.createElement("tr");
    tr.className = "row is-clickable";
    tr.dataset.orderId = String(o.OrderID);
    tr.tabIndex = 0;
    tr.setAttribute("aria-selected", "false");

    tr.appendChild(td(String(o.OrderID)));
    tr.appendChild(td(formatDotNetDate(o.OrderDate)));
    tr.appendChild(td(formatMoney(orderTotalFor(o.OrderID)), "right"));

    el.ordersTbody.appendChild(tr);
  }
}

function renderOrderDetails(lines) {
  el.detailsTbody.textContent = "";

  if (lines.length === 0) {
    clearDetails("No order details found.");
    return;
  }

  let total = 0;

  for (const line of lines) {
    const lineTotal = line.UnitPrice * line.Quantity * (1 - line.Discount);
    total += lineTotal;

    const tr = document.createElement("tr");
    tr.appendChild(td(line.ProductName));
    tr.appendChild(td(String(line.Quantity), "right"));
    tr.appendChild(td(formatMoney(line.UnitPrice), "right"));
    tr.appendChild(td(formatMoney(lineTotal), "right"));

    el.detailsTbody.appendChild(tr);
  }

  el.orderTotalLabel.textContent = `Order total: ${formatMoney(total)}`;
}

/* ----------------------------- Selection ------------------------------ */

function selectCustomer(customerId) {
  state.selectedCustomerId = customerId;
  state.selectedOrderId = null;

  const customer = SAMPLE_CUSTOMERS.find((c) => c.CustomerID === customerId);
  el.selectedCustomerLabel.textContent = customer
    ? `Selected: ${customer.CompanyName} (${customer.CustomerID})`
    : `Selected: ${customerId}`;
  el.selectedOrderLabel.textContent = "Selected: none";

  markSelectedRow(el.customersTbody, "data-customer-id", customerId);
  clearSelectedRows(el.ordersTbody);

  const orders = SAMPLE_ORDERS.filter((o) => o.CustomerID === customerId);
  renderOrders(orders);

  clearDetails("Select an order to view line items.");
  updateResetButton();
  setStatus(`Customer selected (${customerId}).`, "info");
}

function selectOrder(orderId) {
  state.selectedOrderId = orderId;

  el.selectedOrderLabel.textContent = `Selected: ${orderId}`;
  markSelectedRow(el.ordersTbody, "data-order-id", String(orderId));

  const lines = SAMPLE_ORDER_DETAILS.filter((d) => d.OrderID === orderId);
  renderOrderDetails(lines);

  updateResetButton();
  setStatus(`Order selected (${orderId}).`, "info");
}

function clearSelection() {
  state.selectedCustomerId = null;
  state.selectedOrderId = null;

  el.selectedCustomerLabel.textContent = "Selected: none";
  el.selectedOrderLabel.textContent = "Selected: none";

  clearSelectedRows(el.customersTbody);
  clearSelectedRows(el.ordersTbody);

  clearOrders("Select a customer to view orders.");
  clearDetails("Select an order to view line items.");
  updateResetButton();
}

/* ------------------------------ Filtering ------------------------------ */

function getFilteredCustomers() {
  const q = state.query;
  if (!q) return SAMPLE_CUSTOMERS;

  return SAMPLE_CUSTOMERS.filter((c) => {
    const id = String(c.CustomerID).toLowerCase();
    const name = String(c.CompanyName).toLowerCase();
    const country = String(c.Country).toLowerCase();
    return id.includes(q) || name.includes(q) || country.includes(q);
  });
}

/* ------------------------------ Helpers ------------------------------- */

function td(text, className = "") {
  const cell = document.createElement("td");
  if (className) cell.className = className;
  cell.textContent = text;
  return cell;
}

function clearOrders(message) {
  el.ordersTbody.innerHTML = `<tr><td colspan="3">${escapeText(message)}</td></tr>`;
}

function clearDetails(message) {
  el.detailsTbody.innerHTML = `<tr><td colspan="4">${escapeText(message)}</td></tr>`;
  el.orderTotalLabel.textContent = `Order total: ${formatMoney(0)}`;
}

function updateCustomerCounter(shown, total) {
  el.customerCounter.textContent = `${shown} shown out of ${total} total`;
}

function setStatus(message, level) {
  el.statusMessage.textContent = message;
  el.statusMessage.dataset.level = level;
}

function updateResetButton() {
  el.resetBtn.disabled = !(state.selectedCustomerId || state.selectedOrderId || state.query);
}

function clearSelectedRows(tbody) {
  const rows = tbody.querySelectorAll("tr.is-selected");
  rows.forEach((r) => {
    r.classList.remove("is-selected");
    r.setAttribute("aria-selected", "false");
  });
}

function markSelectedRow(tbody, dataAttrName, value) {
  const rows = tbody.querySelectorAll("tr");
  rows.forEach((r) => {
    r.classList.remove("is-selected");
    r.setAttribute("aria-selected", "false");
  });

  const selector = `tr[${dataAttrName}="${cssEscape(value)}"]`;
  const selected = tbody.querySelector(selector);
  if (selected) {
    selected.classList.add("is-selected");
    selected.setAttribute("aria-selected", "true");
  }
}

function orderTotalFor(orderId) {
  const lines = SAMPLE_ORDER_DETAILS.filter((d) => d.OrderID === orderId);
  return lines.reduce((sum, l) => sum + l.UnitPrice * l.Quantity * (1 - l.Discount), 0);
}

function formatMoney(value) {
  return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(value);
}

function formatDotNetDate(dotNetDateString) {
  const match = /Date\((\d+)\)/.exec(String(dotNetDateString));
  if (!match) return "Unknown";
  return new Date(Number(match[1])).toLocaleDateString("en-GB");
}

function escapeText(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function cssEscape(s) {
  return String(s).replaceAll('"', '\\"');
}
