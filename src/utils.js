import { URLS, USER } from './consts';

export const timestamp = () =>{
  return Math.floor( new Date().getTime() / 1000);
}


export const getUrl = (url, type, params ) => {
  if (type === "POST"){
    return `${URLS.BASE_URL}${url}?developer=${USER}`
  } else {
    let result = new URL(`${URLS.BASE_URL}${url}`);
    result.search = new URLSearchParams({
      ...params,
      developer:USER,
    }).toString();
    return result
  }
  
}