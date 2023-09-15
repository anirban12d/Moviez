const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = process.env.VITE_APP_TMDB_TOKEN;

const headers = {
    Authorization: "bearer " + TMDB_TOKEN,
};

export default async function fetchDataFromApi(url, params) {
    try {
        const response = await fetch(BASE_URL + url + '?' + new URLSearchParams(params), {
            method: "GET",
            headers: {
                accept: 'application/json',
                Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOTI4OTJhN2Q4YTg5ODMxZTI5Y2EzOWMzMmFmODgwZiIsInN1YiI6IjY0ZjRiODBiOWU0NTg2MDEzYWY5MjQ0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5wVMJgusYZaABZfFgaBDx1cVVymZ82BV6lTlvZlde2o",
            },
            next: {
                revalidate: 60
            }
        })
        const data = await response.json();
        return data
    } catch (err) {
        return err;
    }
};