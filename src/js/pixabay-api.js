export default function fetchData (params) {
  return axios.get(`https://pixabay.com/api/?${params}`)  
}

