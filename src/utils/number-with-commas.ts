export function numberWithCommas(number: number, decimals?: number) {
  return number.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
