import { useEffect, useState } from "react"

// export const useFetch=(url:string,dataType?:any)=>
export const useFetch = <T>(url: string) =>
     {
  const [data,setData]=useState<T | null>(null);
  console.log(data);
  // const [data, setData] = useState<typeof dataType | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const data = await fetch(url);
        const res = await data.json();
        if (!res.success) {
          setError(res.error || "something went wrong");
          return;
        }
        setData(res.data);
      } catch (error: any) {
        console.log(error);
        setError(error.message || "something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchdata();
  }, [url]);
  return { data, loading, error };
};
