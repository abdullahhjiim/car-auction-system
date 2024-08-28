const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;
export async function pageDataByEvent (event) {
    const result =  await fetch(`${base_url}/page-by-event/${event}`, { cache: 'no-store' })
    return result.json();
}

