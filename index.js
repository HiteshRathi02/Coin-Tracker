const sortMarketCapBtn = document.getElementById("sortMarketCapBtn");
const sortPercentChangeBtn = document.getElementById("sortPercentChangeBtn");
const inputSearch = document.getElementById("searchInput");

inputSearch.addEventListener("input", (e) => {
  const keyword = e.target.value.trim().toLowerCase();
  const searchTerm = data.filter(coin =>
    coin.name.toLowerCase().includes(keyword) ||
    coin.symbol.toLowerCase().includes(keyword)
  );
  addDataToTable(searchTerm);
})

sortMarketCapBtn.addEventListener("click", () => {
  let sortedData = [...data].sort((a, b) => b.market_cap - a.market_cap);
  addDataToTable(sortedData);
});

sortPercentChangeBtn.addEventListener("click", () => {
  let sortedData = data.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
  addDataToTable(sortedData);
});

const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";
let data;

window.addEventListener("load", async () => {
  const response = await fetch(url);
  data = await response.json();
  addDataToTable(data);
});

function addDataToTable(data) {
  const table = document.getElementById("crypto-table");
  table.innerHTML = "";
  data.map(coin => {
    const priceChange = coin.price_change_percentage_24h;
    const colorClass = priceChange >= 0 ? 'positive' : 'negative';
    table.innerHTML += `
      <tr>
        <td><img src="${coin.image}" alt="${coin.name}" width="30" height="30"></td>
        <td>${coin.name}</td>
        <td>${coin.symbol.toUpperCase()}</td>
        <td>$${coin.current_price.toFixed(2)}</td>
        <td>$${coin.total_volume.toLocaleString()}</td>
        <td>$${coin.market_cap.toLocaleString()}</td>
        <td class=${colorClass}>${coin.price_change_percentage_24h.toFixed(2)}%</td>
      </tr>
    `;
  });
}