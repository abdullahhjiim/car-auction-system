const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;

// export const revalidate = 200 

export async function getNumbers(type) {
  // Returns a random integer from 1 to 10:

  let fetchOptions = {};

  if (type === "dynamic") {
    fetchOptions = {
      cache: "no-store",
    };
  } else if (type === "revalidated") {
    fetchOptions = {
      next: {
        // revalidate: 86400, // second
        revalidate: 1800
      },
    };
  }

  try {
    const res = await fetch(`${base_url}/overview-counters`, fetchOptions);

    return res.json();
  } catch(error) {
    return null;
  }
}
