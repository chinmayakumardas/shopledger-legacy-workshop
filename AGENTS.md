# ShopLedger

## Stack

- Node.js with CommonJS modules.
- Express 4 with `body-parser` for the server and API.
- Browser UI built with HTML, CSS, and vanilla JavaScript.
- Application data stored in `data/db.json`.

## Module map

- `server.js`: creates the Express app, serves `public/`, mounts API routers, and serves invoice pages.
- `routes/`: products and coupons, orders, customers and settlements, reports and pricing preview endpoints.
- `lib/`: store (`store.js`), order operations (`orders.js`), pricing and tax (`pricing.js`, `tax.js`, `coupons.js`), inventory (`inventory.js`), ledger (`ledger.js`), reports (`reports.js`), invoice rendering (`invoice.js`), and date helpers (`dates.js`).
- `public/`: page markup (`index.html`), browser behavior (`js/app.js`), and styles (`css/style.css`).
- `config.js`: server, shop, tax, inventory, and coupon configuration.
- `data/db.json`: file-backed products, customers, orders, settlements, and ID counters.

## Commands

- `npm start`: run the app with `node server.js`.
- `npm test`: currently a placeholder that exits with an error; no test suite is configured.

## Change rules

- Write characterization tests before changing behaviour.
- Change only the module the ticket is about.
- Tests must never read or write `data/db.json`.
- Add no dependencies.
