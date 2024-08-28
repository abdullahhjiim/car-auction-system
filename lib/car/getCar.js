
const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;

export default async function getCar(id, token) {
  const result = await fetch(`${base_url}/lot-details/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  return result.json();
}
export async function getSimilarCar(id) {
  const result = await fetch(`${base_url}/lot/${id}/similar-vehicles`, {
    cache: "no-store",
  });
  return result.json();
}
export async function getBrands() {
  const result = await fetch(`${base_url}/top-makes-with-count`, {
    cache: "no-store",
  });
  return result.json();
}
export async function getOverview() {
  const result = await fetch(`${base_url}/overview-counters`, {
    cache: "no-store",
  });
  return result;
}
export async function getVehicleDetails(id, token = null) {
  try {
    const result = await fetch(`${base_url}/lot-details/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if(result?.status == 200) {
      return await result.json();
    }
    return null;    
  } catch(error) {
    return null;
  }
}
