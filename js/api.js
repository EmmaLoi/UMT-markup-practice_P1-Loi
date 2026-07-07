const BASE_URL = "https://flora-backend-eao9.onrender.com/api";
const STATIC_URL = "https://flora-backend-eao9.onrender.com";

function normalizeBouquet(bouquet) {
  return {
    ...bouquet,
    price: `$${bouquet.price}`,
    image: bouquet.photoURL?.startsWith("/photos")
      ? `${STATIC_URL}${bouquet.photoURL}`
      : bouquet.photoURL,
    image2x: bouquet.photoURL?.startsWith("/photos")
      ? `${STATIC_URL}${bouquet.photoURL}`
      : bouquet.photoURL,
    alt: bouquet.title,
  };
}

async function getBouquets(page = 1, limit = 4) {
  try {
    const response = await axios.get(`${BASE_URL}/bouquets`);

    const allBouquets = response.data.map(normalizeBouquet);
    const start = (page - 1) * limit;
    const end = start + limit;
    const data = allBouquets.slice(start, end);

    return {
      data,
      pages: Math.ceil(allBouquets.length / limit),
      items: allBouquets.length,
      error: false,
    };
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
    return normalizeBouquet(response.data);
  } catch (error) {
    console.error("Failed to fetch bouquet:", error);
    return null;
  }
}

async function getBestsellers() {
  try {
    const response = await axios.get("./db.json");

    return {
      data: response.data.bestsellers,
      error: false,
    };
  } catch (error) {
    console.error("Failed to fetch bestsellers:", error);
    return { data: [], error: true };
  }
}

async function getBestsellerById(id) {
  try {
    const response = await axios.get("./db.json");

    return (
      response.data.bestsellers.find((bouquet) => bouquet.id === Number(id)) ||
      null
    );
  } catch (error) {
    console.error("Failed to fetch bestseller:", error);
    return null;
  }
}

async function getFeedback() {
  try {
    const response = await axios.get(`${BASE_URL}/feedback`);

    return {
      data: response.data,
      error: false,
    };
  } catch (error) {
    console.error("Failed to fetch feedback:", error);

    return {
      data: [],
      error: true,
    };
  }
}
