export async function fetchData(pathParam){
    try {
 
       let response = await fetch(`${domenPartUrl}${pathParam}`);
     
       if (!response.ok) {
         console.log("Cannot fetch data form the server");
         throw new Error("HTTP Error: " + response.status);
       }
   
       const data = await response.json();
   
       return data;
     } catch (error) {
       console.error("Error while loading movie information", error);
       return null;
     }
   }

   export async function fetchNextPageData(pathAndSearchParams, pageNum){
    const newData = await fetchData(`${pathAndSearchParams}&page=${pageNum}`);
    return newData.results;
  }