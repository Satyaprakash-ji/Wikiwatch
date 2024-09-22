import axios from "axios"

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzA1Y2VjYWNhOTVkYWZjMjNjN2FjNmQ0YzFjYzczMCIsIm5iZiI6MTcyMDI4Nzc1OC43ODM5NDEsInN1YiI6IjY2ODk3ZTNmMmY4MTM0NzI0Yjg5MDQzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.O6fnru_b2fk99ZMox3y4NaLA3doMJ2nf8fashIQYfQ0'
      }
});

export default instance