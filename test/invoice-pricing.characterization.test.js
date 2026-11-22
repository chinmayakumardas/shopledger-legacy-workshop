'use strict';

var test = require('node:test');
var assert = require('node:assert/strict');

var pricing = require('../lib/pricing');
var invoice = require('../lib/invoice');

test('invoice figures use the billed HSN slab when order lines omit gstRate', function () {
  // routes/orders.js stores hsn on order items, but does not store gstRate.
  var items = [{ id: 1, name: 'Rice', sku: 'GRN-001', hsn: '1006', price: 1000, qty: 1 }];
  var ledgerFigures = pricing.computeTotals(items, '');
  var invoiceFigures = invoice.computeInvoiceFigures({
    items: items,
    coupon: '',
    subtotal: ledgerFigures.subtotal,
    discount: ledgerFigures.discount,
    tax: ledgerFigures.tax,
    total: ledgerFigures.total
  });

  assert.equal(ledgerFigures.tax, 50);
  assert.equal(ledgerFigures.total, 1050);
  assert.equal(invoiceFigures.rows[0].gstPercent, 5);
  assert.equal(invoiceFigures.tax, ledgerFigures.tax);
  assert.equal(invoiceFigures.cgst + invoiceFigures.sgst, ledgerFigures.tax);
  assert.equal(invoiceFigures.total, ledgerFigures.total);
});

test('invoice figures match the billed GST and capped SAVE10 discount', function () {
  var items = [{
    id: 1,
    name: 'Rice',
    sku: 'GRN-001',
    hsn: '1006',
    price: 2000,
    qty: 1
  }];
  var ledgerFigures = pricing.computeTotals(items, 'SAVE10');
  var invoiceFigures = invoice.computeInvoiceFigures({
    items: items,
    coupon: 'SAVE10',
    subtotal: ledgerFigures.subtotal,
    discount: ledgerFigures.discount,
    tax: ledgerFigures.tax,
    total: ledgerFigures.total
  });

  assert.equal(ledgerFigures.discount, 150);
  assert.equal(ledgerFigures.tax, 92.5);
  assert.equal(ledgerFigures.total, 1942.5);
  assert.equal(invoiceFigures.rows[0].gstPercent, 5);
  assert.equal(invoiceFigures.tax, ledgerFigures.tax);
  assert.equal(invoiceFigures.discount, ledgerFigures.discount);
  assert.equal(invoiceFigures.total, ledgerFigures.total);
});
