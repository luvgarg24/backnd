const icons = {
  dashboard: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="7" height="8" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="15" width="7" height="6" rx="1.5"/></svg>',
  plug: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22v-5"/><path d="M9 8V2"/><path d="M15 8V2"/><path d="M18 8v3a6 6 0 0 1-12 0V8Z"/></svg>',
  boxes: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7.5 4.3 4.5 2.6 4.5-2.6"/><path d="M3 7.1 12 12l9-4.9"/><path d="M12 22V12"/><path d="M3 7.1v9.8L12 22l9-5.1V7.1L12 2Z"/></svg>',
  truck: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 17h4V5H2v12h3"/><path d="M14 8h4l4 4v5h-3"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="16.5" cy="17.5" r="2.5"/></svg>',
  target: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/></svg>',
  users: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9"/><path d="M16 3.1a4 4 0 0 1 0 7.8"/></svg>',
  wallet: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 7V6a2 2 0 0 0-2-2H5a3 3 0 0 0 0 6h14a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H5a3 3 0 0 1-3-3V7"/><path d="M16 14h.01"/></svg>',
  headset: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 14v-2a9 9 0 0 1 18 0v2"/><path d="M21 14v3a2 2 0 0 1-2 2h-2v-7h2a2 2 0 0 1 2 2Z"/><path d="M3 14v3a2 2 0 0 0 2 2h2v-7H5a2 2 0 0 0-2 2Z"/><path d="M13 21h2a4 4 0 0 0 4-4"/></svg>',
  settings: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 15.5A3.5 3.5 0 1 0 12 8a3.5 3.5 0 0 0 0 7.5Z"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1A2 2 0 1 1 4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.3 7A2 2 0 1 1 7.1 4.2l.1.1a1.7 1.7 0 0 0 1.9.3h.1a1.7 1.7 0 0 0 .9-1.6V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1A2 2 0 1 1 19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9v.1a1.7 1.7 0 0 0 1.6.9h.1a2 2 0 1 1 0 4H21a1.7 1.7 0 0 0-1.6 1Z"/></svg>',
  search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
  bell: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>',
  plus: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
  download: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/></svg>',
  "arrow-up-right": '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>',
  check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 13 4 4L19 7"/></svg>'
};

const connections = [
  { name: "Shopify", detail: "Orders, catalog, payments", status: "Live", tone: "ok", logo: "SH" },
  { name: "Amazon", detail: "Marketplace sync", status: "Live", tone: "ok", logo: "AZ" },
  { name: "Meta Ads", detail: "Spend delayed 22 min", status: "Delay", tone: "warning", logo: "MA" },
  { name: "Shiprocket", detail: "Logistics events", status: "Live", tone: "ok", logo: "SR" },
  { name: "Unicommerce", detail: "Warehouse stock", status: "Review", tone: "alert", logo: "UC" }
];

const inventory = [
  { sku: "Glow Serum 30ml", note: "9 days of cover", stock: 31, tone: "#b7791f" },
  { sku: "Hydra Cleanser", note: "Reorder by Thursday", stock: 22, tone: "#c65a46" },
  { sku: "Vitamin C Minis", note: "Healthy across FCs", stock: 76, tone: "#2f806d" },
  { sku: "Night Repair Kit", note: "Bundle component low", stock: 42, tone: "#3e6f93" }
];

const ads = [
  { channel: "Meta", value: 78, roas: "4.1x", color: "#3e6f93" },
  { channel: "Google", value: 66, roas: "3.5x", color: "#2f806d" },
  { channel: "Amazon", value: 52, roas: "2.9x", color: "#6b5ca8" },
  { channel: "Influencer", value: 36, roas: "1.8x", color: "#b7791f" }
];

const tasks = [
  { title: "Approve PO for Hydra Cleanser", meta: "Vendor quote expires today", tag: "Supply" },
  { title: "Fix Meta catalog mismatch", meta: "17 products affected", tag: "Ads" },
  { title: "Review COD exception batch", meta: "Mumbai lane is above threshold", tag: "Risk" },
  { title: "Launch winback cohort", meta: "8,420 customers eligible", tag: "CRM" }
];

function hydrateIcons() {
  document.querySelectorAll("[data-icon]").forEach((node) => {
    const icon = icons[node.dataset.icon];
    if (icon) {
      node.insertAdjacentHTML("afterbegin", icon);
    }
  });
}

function renderConnections() {
  const root = document.querySelector("#connectionList");
  root.innerHTML = connections
    .map(
      (item) => `
        <div class="connection-row">
          <span class="connection-logo" aria-hidden="true">${item.logo}</span>
          <div>
            <span class="row-title">${item.name}</span>
            <span class="row-meta">${item.detail}</span>
          </div>
          <span class="pill ${item.tone === "ok" ? "" : item.tone}">${item.status}</span>
        </div>
      `
    )
    .join("");
}

function renderInventory() {
  const root = document.querySelector("#inventoryList");
  root.innerHTML = inventory
    .map(
      (item) => `
        <div class="inventory-row">
          <div>
            <strong>${item.sku}</strong>
            <span>${item.note}</span>
          </div>
          <span class="stock-meter" aria-label="${item.stock}% stock cover">
            <span style="--stock: ${item.stock}%; --meter: ${item.tone}"></span>
          </span>
        </div>
      `
    )
    .join("");
}

function renderAds() {
  const root = document.querySelector("#adsBars");
  root.innerHTML = ads
    .map(
      (item) => `
        <div class="ad-row">
          <span>${item.channel}</span>
          <div class="ad-track" aria-label="${item.channel} spend share">
            <div class="ad-fill" style="--value: ${item.value}%; --color: ${item.color}"></div>
          </div>
          <strong>${item.roas}</strong>
        </div>
      `
    )
    .join("");
}

function renderTasks() {
  const root = document.querySelector("#taskList");
  root.innerHTML = tasks
    .map(
      (item) => `
        <div class="task-row">
          <span class="task-check">${icons.check}</span>
          <div>
            <strong>${item.title}</strong>
            <span>${item.meta}</span>
          </div>
          <span class="pill">${item.tag}</span>
        </div>
      `
    )
    .join("");
}

function wireNavigation() {
  const navItems = Array.from(document.querySelectorAll(".nav-item"));
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      navItems.forEach((nav) => {
        nav.classList.remove("is-active");
        nav.removeAttribute("aria-current");
      });
      item.classList.add("is-active");
      item.setAttribute("aria-current", "page");
    });
  });
}

hydrateIcons();
renderConnections();
renderInventory();
renderAds();
renderTasks();
wireNavigation();
