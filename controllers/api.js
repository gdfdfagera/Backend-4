const axios = require('axios');


const API = "58U4QMAI4ZXD0YHI"

const getPrice = async (userRequest) => {
    try {
        const symbol = userRequest.body.symbol;
        const apiUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API}`;
        
        const response = await axios.get(apiUrl);
        const price = response.data['Global Quote']['05. price'];
        
    
        return { symbol, price };
      } catch (error) {
        console.error('Error fetching Pokemon information:', error.message);
        return;
      }
};

const getStockPrice = async (userRequest) => {
  try {
      const { coinId, vsCurrency } = userRequest.body;
      const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=${vsCurrency}`);
      return response;
    } catch (error) {
      console.error('Error fetching Pokemon information:', error.message);
      return;
    }
};

module.exports = { 
  getPrice,
  getStockPrice
};