const $ = (id) => document.getElementById(id);

const els = {
  length: $("length"),
  width: $("width"),
  houseType: $("houseType"),
  floors: $("floors"),
  floorsWrap: $("floorsWrap"),
  roofType: $("roofType"),
  roofOptions: $("roofOptions"),
  roofFactor: $("roofFactor"),
  tileRate: $("tileRate"),

  foundationRate: $("foundationRate"),
  rawRate: $("rawRate"),
  finishRate: $("finishRate"),
  fullRate: $("fullRate"),
  roofRate: $("roofRate"),

  calcBtn: $("calcBtn"),
  resetBtn: $("resetBtn"),
  copyBtn: $("copyBtn"),

  oneFloorArea: $("oneFloorArea"),
  totalFloorArea: $("totalFloorArea"),
  roofArea: $("roofArea"),
  tileQty: $("tileQty"),

  brickQty: $("brickQty"),
  steelQty: $("steelQty"),
  sandQty: $("sandQty"),
  cementQty: $("cementQty"),
  concreteQty: $("concreteQty"),
  plasterQty: $("plasterQty"),

  foundationCost: $("foundationCost"),
  rawCost: $("rawCost"),
  finishCost: $("finishCost"),
  fullCost: $("fullCost"),
  roofCost: $("roofCost"),
  grandTotal: $("grandTotal"),
};

const RATES = {
  brick: 280,
  steel: 0.035,
  sand: 0.46,
  cement: 0.18,
  concrete: 0.12,
  plaster: 3.2
};

let copiedText = "";

function formatNumber(value, digits = 2) {
  return Number(value).toLocaleString("vi-VN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: digits
  });
}

function formatCurrency(value) {
  return Number(value).toLocaleString("vi-VN") + " đ";
}

function toNumber(value) {
  const n = parseFloat(value);
  return Number.isFinite(n) ? n : 0;
}

function updateVisibility() {
  const isTang = els.houseType.value === "tang";
  const hasRoof = els.roofType.value === "nhat";

  els.floorsWrap.classList.toggle("hidden", !isTang);
  els.roofOptions.classList.toggle("hidden", !hasRoof);
}

function resetResults() {
  els.oneFloorArea.textContent = "0 m²";
  els.totalFloorArea.textContent = "0 m²";
  els.roofArea.textContent = "0 m²";
  els.tileQty.textContent = "0 viên";

  els.brickQty.textContent = "0 viên";
  els.steelQty.textContent = "0 tấn";
  els.sandQty.textContent = "0 m³";
  els.cementQty.textContent = "0 tấn";
  els.concreteQty.textContent = "0 m³";
  els.plasterQty.textContent = "0 m²";

  els.foundationCost.textContent = "0 đ";
  els.rawCost.textContent = "0 đ";
  els.finishCost.textContent = "0 đ";
  els.fullCost.textContent = "0 đ";
  els.roofCost.textContent = "0 đ";
  els.grandTotal.textContent = "0 đ";

  copiedText = "";
}

function calculate() {
  const length = toNumber(els.length.value);
  const width = toNumber(els.width.value);

  if (length <= 0 || width <= 0) {
    alert("Vui lòng nhập chiều dài và chiều rộng hợp lệ.");
    return;
  }

  const isTang = els.houseType.value === "tang";
  const floors = isTang ? parseInt(els.floors.value, 10) || 1 : 1;

  const hasRoof = els.roofType.value === "nhat";
  const roofFactor = toNumber(els.roofFactor.value) || 1.4;
  const tileRate = toNumber(els.tileRate.value) || 10;

  const foundationRate = toNumber(els.foundationRate.value);
  const rawRate = toNumber(els.rawRate.value);
  const finishRate = toNumber(els.finishRate.value);
  const fullRate = toNumber(els.fullRate.value);
  const roofRate = toNumber(els.roofRate.value);

  const oneFloorArea = length * width;
  const totalFloorArea = oneFloorArea * floors;

  const roofArea = hasRoof ? oneFloorArea * roofFactor : 0;
  const tileQty = hasRoof ? roofArea * tileRate * 1.05 : 0;

  const brickQty = totalFloorArea * RATES.brick;
  const steelQty = totalFloorArea * RATES.steel;
  const sandQty = totalFloorArea * RATES.sand;
  const cementQty = totalFloorArea * RATES.cement;
  const concreteQty = totalFloorArea * RATES.concrete;
  const plasterQty = totalFloorArea * RATES.plaster;

  const foundationCost = totalFloorArea * foundationRate;
  const rawCost = totalFloorArea * rawRate;
  const finishCost = totalFloorArea * finishRate;
  const fullCost = totalFloorArea * fullRate;
  const roofCost = roofArea * roofRate;
  const grandTotal = foundationCost + fullCost + roofCost;

  els.oneFloorArea.textContent = `${formatNumber(oneFloorArea)} m²`;
  els.totalFloorArea.textContent = `${formatNumber(totalFloorArea)} m²`;
  els.roofArea.textContent = `${formatNumber(roofArea)} m²`;
  els.tileQty.textContent = `${formatNumber(tileQty, 0)} viên`;

  els.brickQty.textContent = `${formatNumber(brickQty, 0)} viên`;
  els.steelQty.textContent = `${formatNumber(steelQty)} tấn`;
  els.sandQty.textContent = `${formatNumber(sandQty)} m³`;
  els.cementQty.textContent = `${formatNumber(cementQty)} tấn`;
  els.concreteQty.textContent = `${formatNumber(concreteQty)} m³`;
  els.plasterQty.textContent = `${formatNumber(plasterQty)} m²`;

  els.foundationCost.textContent = formatCurrency(foundationCost);
  els.rawCost.textContent = formatCurrency(rawCost);
  els.finishCost.textContent = formatCurrency(finishCost);
  els.fullCost.textContent = formatCurrency(fullCost);
  els.roofCost.textContent = formatCurrency(roofCost);
  els.grandTotal.textContent = formatCurrency(grandTotal);

  copiedText =
`TÍNH XÂY NHÀ
- Dài: ${formatNumber(length)} m
- Rộng: ${formatNumber(width)} m
- Loại nhà: ${isTang ? "Nhà tầng" : "Nhà cấp 4"}
- Số tầng: ${floors}
- Mái: ${hasRoof ? "Mái Nhật" : "Không mái"}

KẾT QUẢ
- Diện tích 1 sàn: ${formatNumber(oneFloorArea)} m²
- Tổng diện tích sàn: ${formatNumber(totalFloorArea)} m²
- Diện tích mái: ${formatNumber(roofArea)} m²
- Ngói: ${formatNumber(tileQty, 0)} viên

VẬT TƯ SƠ BỘ
- Gạch: ${formatNumber(brickQty, 0)} viên
- Thép: ${formatNumber(steelQty)} tấn
- Cát: ${formatNumber(sandQty)} m³
- Xi măng: ${formatNumber(cementQty)} tấn
- Bê tông: ${formatNumber(concreteQty)} m³
- Trát tường: ${formatNumber(plasterQty)} m²

CHI PHÍ
- Móng: ${formatCurrency(foundationCost)}
- Xây thô: ${formatCurrency(rawCost)}
- Hoàn thiện: ${formatCurrency(finishCost)}
- Xây + nội thất: ${formatCurrency(fullCost)}
- Mái: ${formatCurrency(roofCost)}
- Tổng tạm tính: ${formatCurrency(grandTotal)}`;
}

function resetForm() {
  els.length.value = "";
  els.width.value = "";
  els.houseType.value = "cap4";
  els.floors.value = "2";
  els.roofType.value = "none";
  els.roofFactor.value = "1.4";
  els.tileRate.value = "10";

  els.foundationRate.value = "600000";
  els.rawRate.value = "3800000";
  els.finishRate.value = "5500000";
  els.fullRate.value = "6500000";
  els.roofRate.value = "1000000";

  updateVisibility();
  resetResults();
}

async function copyResult() {
  if (!copiedText) {
    alert("Chưa có kết quả để copy.");
    return;
  }

  try {
    await navigator.clipboard.writeText(copiedText);
    alert("Đã copy kết quả.");
  } catch (error) {
    alert("Máy đang chặn copy tự động. Sếp tính lại rồi copy thủ công giúp tôi.");
  }
}

els.houseType.addEventListener("change", updateVisibility);
els.roofType.addEventListener("change", updateVisibility);
els.calcBtn.addEventListener("click", calculate);
els.resetBtn.addEventListener("click", resetForm);
els.copyBtn.addEventListener("click", copyResult);

updateVisibility();
resetResults();
