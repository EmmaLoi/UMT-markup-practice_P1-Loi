const BASE_URL = "http://localhost:3000";

async function getBouquets(page = 1, limit = 4) {
  try {
    const response = await axios.get(`${BASE_URL}/bouquets`, {
      params: {
        _page: page,
        _per_page: limit,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to fetch bouquets:", error);
    return {
      data: [],
      pages: 0,
      items: 0,
      error: true,
    };
  }
}

async function getBouquetById(id) {
  try {
    const response = await axios.get(`${BASE_URL}/bouquets/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch bouquet:", error);
    return null;
  }
}

async function getBestsellers() {
  try {
    const response = await axios.get(`${BASE_URL}/bestsellers`);

    return { data: response.data, error: false };
  } catch (error) {
    console.error("Failed to fetch bestsellers:", error);
    return { data: [], error: true };
  }
}

async function getBestsellerById(id) {
  try {
    const response = await axios.get(`${BASE_URL}/bestsellers/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch bestseller:", error);
    return null;
  }
}

async function getFeedback() {
  try {
    const response = await axios.get(`${BASE_URL}/feedback`);
    return { data: response.data, error: false };
  } catch (error) {
    console.error("Failed to fetch feedback:", error);
    return { data: [], error: true };
  }
}
