/**
 * Fulfillment cost estimator — shared by SPA + SEO static pages.
 */
(function () {
  'use strict';

  function detectLang() {
    var bodyLang = document.body && document.body.getAttribute('data-seo-language');
    var htmlLang = document.documentElement.lang;
    var lang = (bodyLang || htmlLang || 'vi').toLowerCase();
    if (lang.indexOf('en') === 0) return 'en';
    if (lang.indexOf('es') === 0) return 'es';
    return 'vi';
  }

  function copyFor(lang) {
    if (lang === 'es') {
      return {
        inUse: 'En uso',
        ownTracking: 'Tracking propio',
        included: 'Incluido',
        includedBox: 'Caja incluida',
        free: 'Gratis',
        customerLabel: 'Cliente aporta',
        contact: 'Contactar',
        noteAio7: 'Pedidos de hasta 800g con etiqueta USPS de SpeeGo usan la tarifa all-in-one de $7. Estimación solo de referencia.',
        noteAio10: 'Pedidos de 800g a 2,5kg con etiqueta USPS de SpeeGo usan la tarifa all-in-one de $10. Estimación solo de referencia.',
        noteNoLabelLight: 'Pedidos bajo 800g sin etiqueta SpeeGo: $2.50/pedido (caja incluida). Materiales extra se suman aparte.',
        noteNoLabelMid: 'Pedidos de 800g a 2,5kg sin etiqueta SpeeGo: $3.00/pedido (caja incluida). Materiales extra se suman aparte.',
        noteHeavy: 'Pedidos sobre 2,5kg = manejo por tramo de peso + USPS + embalaje.',
        noteHeavyOwn: 'Pedidos sobre 2,5kg con tracking propio = manejo por tramo + embalaje; sin cargo USPS SpeeGo.'
      };
    }
    if (lang === 'en') {
      return {
        inUse: 'In use',
        ownTracking: 'Own tracking',
        included: 'Included',
        includedBox: 'Box included',
        free: 'Free',
        customerLabel: 'Customer-provided',
        contact: 'Contact us',
        noteAio7: 'Orders up to 800g with SpeeGo’s USPS label use the all-in-one $7 rate. Estimate for reference only.',
        noteAio10: 'Orders from 800g to 2.5kg with SpeeGo’s USPS label use the all-in-one $10 rate. Estimate for reference only.',
        noteNoLabelLight: 'Under 800g without SpeeGo’s USPS label: $2.50/order (box included). Extra materials are added separately.',
        noteNoLabelMid: '800g–2.5kg without SpeeGo’s USPS label: $3.00/order (box included). Extra materials are added separately.',
        noteHeavy: 'Over 2.5kg = outbound fee by weight band + USPS + packaging.',
        noteHeavyOwn: 'Over 2.5kg with own tracking = outbound fee by weight band + packaging; no SpeeGo USPS charge.'
      };
    }
    return {
      inUse: 'Đang sử dụng',
      ownTracking: 'Tracking riêng',
      included: 'Đã bao gồm',
      includedBox: 'Đã bao gồm hộp',
      free: 'Miễn phí',
      customerLabel: 'Khách tự cung cấp',
      contact: 'Liên hệ',
      noteAio7: 'Đơn đến 800g sử dụng label USPS của SpeeGo áp dụng giá All-in-one $7. Ước tính chỉ để tham khảo.',
      noteAio10: 'Đơn trên 800g đến 2,5kg sử dụng label USPS của SpeeGo áp dụng giá All-in-one $10. Ước tính chỉ để tham khảo.',
      noteNoLabelLight: 'Đơn dưới 800g không dùng label SpeeGo: $2.50/đơn, đã bao gồm hộp. Vật liệu bổ sung cộng riêng.',
      noteNoLabelMid: 'Đơn 800g–2,5kg không dùng label SpeeGo: $3.00/đơn, đã bao gồm hộp. Vật liệu bổ sung cộng riêng.',
      noteHeavy: 'Đơn trên 2,5kg = phí xuất kho theo khoảng cân + phí USPS + phí bao bì.',
      noteHeavyOwn: 'Đơn trên 2,5kg dùng tracking riêng = phí xuất kho theo khoảng cân + phí bao bì; không cộng phí USPS SpeeGo.'
    };
  }

  function money(value) {
    return '$' + value.toFixed(2);
  }

  window.calculateFulfillmentCost = function calculateFulfillmentCost() {
    var section = document.getElementById('uoc-tinh-chi-phi');
    var weightInput = document.getElementById('calcWeight');
    var zoneSelect = document.getElementById('calcZone');
    if (!section || !weightInput) return;

    var billable = Math.max(0.1, parseFloat(weightInput.value) || 1);
    var zone = Math.max(1, parseInt(zoneSelect ? zoneSelect.value : '1', 10) || 1);
    var labelEl = document.getElementById('useSpeegoLabel');
    var useSpeegoLabel = labelEl ? labelEl.checked : true;
    var statusEl = document.getElementById('shippingChoiceStatus');
    var copy = copyFor(detectLang());

    if (statusEl) statusEl.textContent = useSpeegoLabel ? copy.inUse : copy.ownTracking;
    if (zoneSelect) zoneSelect.disabled = !useSpeegoLabel;

    var packageChoices = Array.prototype.slice.call(
      section.querySelectorAll('input[name="estimate-packaging"]:checked')
    );
    var includedCarton = !useSpeegoLabel && billable <= 5.512;
    var packageCost = packageChoices.reduce(function (sum, choice) {
      if (includedCarton && choice.getAttribute('data-package') === 'carton') return sum;
      var unitPrice = Number(choice.value) || 0;
      var pkg = choice.getAttribute('data-package');
      var quantitySelect = section.querySelector('.ff-package-quantity[data-quantity-for="' + pkg + '"]');
      var quantity = quantitySelect ? Math.max(1, Math.floor(Number(quantitySelect.value) || 1)) : 1;
      return sum + unitPrice * quantity;
    }, 0);

    var total;
    var service;
    var shipping;
    var note;
    var canEstimate = true;

    if (!useSpeegoLabel && billable < 1.764) {
      total = 2.5 + packageCost;
      service = '$2.50';
      shipping = copy.customerLabel;
      note = copy.noteNoLabelLight;
    } else if (!useSpeegoLabel && billable <= 5.512) {
      total = 3 + packageCost;
      service = '$3.00';
      shipping = copy.customerLabel;
      note = copy.noteNoLabelMid;
    } else if (billable <= 1.764) {
      total = 7 + packageCost;
      service = '$7.00';
      shipping = copy.included;
      note = copy.noteAio7;
    } else if (billable <= 5.512) {
      total = 10 + packageCost;
      service = '$10.00';
      shipping = copy.included;
      note = copy.noteAio10;
    } else {
      var handling = billable <= 15 ? 2.5
        : billable <= 30 ? 3.25
        : billable <= 50 ? 4.5
        : billable <= 70 ? 6.35
        : billable <= 100 ? 7.75
        : billable <= 150 ? 10 : 0;
      var zoneFactor = 0.45 * zone;
      var weightFactor = (billable - 1) * 0.85;
      var uspsRate = useSpeegoLabel ? (5.20 + zoneFactor + weightFactor) : 0;
      canEstimate = Boolean(handling);
      total = handling + packageCost + uspsRate;
      service = handling ? money(handling) : copy.contact;
      shipping = useSpeegoLabel ? money(uspsRate) : copy.customerLabel;
      note = useSpeegoLabel ? copy.noteHeavy : copy.noteHeavyOwn;
    }

    var resWeight = document.getElementById('calcResultWeight');
    var resAio = document.getElementById('calcResultAio');
    var resPkg = document.getElementById('calcResultPkg');
    var resShip = document.getElementById('calcResultShip');
    var resTotal = document.getElementById('calcResultTotal');
    var resNote = document.getElementById('calcEstimateNote');

    if (resWeight) resWeight.textContent = billable.toFixed(2) + ' lbs';
    if (resAio) resAio.textContent = service;
    if (resPkg) {
      resPkg.textContent = packageCost
        ? money(packageCost)
        : (billable <= 5.512 ? (useSpeegoLabel ? copy.included : copy.includedBox) : copy.free);
    }
    if (resShip) resShip.textContent = shipping;
    if (resTotal) resTotal.textContent = canEstimate ? money(total) : copy.contact;
    if (resNote) resNote.textContent = note;
  };

  function bindEstimator() {
    if (window.__ffCalcDelegated) return;
    window.__ffCalcDelegated = true;
    document.addEventListener('input', function (e) {
      if (e.target && e.target.closest && e.target.closest('#uoc-tinh-chi-phi')) {
        window.calculateFulfillmentCost();
      }
    });
    document.addEventListener('change', function (e) {
      if (e.target && e.target.closest && e.target.closest('#uoc-tinh-chi-phi')) {
        window.calculateFulfillmentCost();
      }
    });
  }

  function boot() {
    bindEstimator();
    window.calculateFulfillmentCost();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  // SPA hash navigation may inject the form after first boot
  window.addEventListener('hashchange', function () {
    setTimeout(function () {
      window.calculateFulfillmentCost();
    }, 80);
  });
})();
