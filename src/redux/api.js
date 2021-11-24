import axios from 'axios'
const APP_ID="af483def"
const APP_KEY="e1e896f9aaff32f00ef5f0d0ab152487"

export const getRecipies=async (query)=>{
    const URL= `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;
   return await axios.get(URL);
} 