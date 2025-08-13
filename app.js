const tableBody = document.getElementById('table-body');

async function fetchCryptoPrices() {
  try {
    const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
    if (!res.ok) throw new Error('Failed to fetch data');

    const data = await res.json();

    tableBody.innerHTML = '';

    data.forEach(coin => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td><img src="${coin.image}" alt="${coin.name}" width="20" style="vertical-align:middle; margin-right:8px;">${coin.name}</td>
        <td>${coin.symbol.toUpperCase()}</td>
        <td>$${coin.current_price.toLocaleString()}</td>
      `;
      tableBody.appendChild(row);
    });

  } catch (error) {
    tableBody.innerHTML = `<tr><td colspan="3">Error loading data</td></tr>`;
    console.error(error);
  }
}

// Fetch prices immediately and then every 60 seconds
fetchCryptoPrices();
setInterval(fetchCryptoPrices, 60000);
