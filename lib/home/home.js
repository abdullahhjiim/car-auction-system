const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getUpcomingAuctions(type) {

  let fetchOptions = {};

  if (type === "dynamic") {
    fetchOptions = {
      cache: "no-store",
    };
  } else if (type === "revalidated") {
    fetchOptions = {
      next: {
        revalidate: 86400, // second
      },
    };
  }

  const res = await fetch(`${base_url}/upcoming-auctions`, fetchOptions);

  return res.json();
}


// const [loading, setLoading] = useState(false);
// const [data, setData] = useState(null);
// useEffect(() => {
//   setLoading(true);
//   authAxios
//     .get("/upcoming-auctions")
//     .then((res) => {
//       setData(res?.data?.data);
//       setLoading(false);
//     })
//     .catch((err) => {
//       setLoading(false);
//     });
// }, []);