import { AllPosts } from "../components/AllPosts";
export default async function Page() {

  return (
    <AllPosts/>
  )
}
const useTenants = () => {
const getPostData =  async () => {
   try {
      const response = await fetch("/api/posts[[0]"); // Adjust limit as needed

      if (!response.ok) {
        throw new Error("Failed to fetch tenants");
      }

      const data = await response.json();
    } catch (err) {
      console.log('error', err);
      
    }

      // useEffect(() => {
      //   getPostData();
      // }, []);
   
  };
}
