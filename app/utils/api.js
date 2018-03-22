const axios = require('axios');

const id = "YOUR_CLIENT_ID";
const sec = "YOUR_SECRET_ID";
const params = `?client_id=${id}&client_secret=${sec}`;


async function getProfile(username) {
    const profile = await axios.get(`https://api.github.com/users/${username}${params}`)
        .handleError(handleError);
    return profile.data;
}

function getRepos(username) {
    return axios.get(`https://api.github.com/users/${username}/repos${params}&per_page=100`);
}

function getStarCount(repos) {
    return repos.data.reduce((count, { stargazers_count }) => count + stargazers_count, 0);
}

function calculateScore({ followers }, repos) {
    return (followers * 3) + getStarCount(repos);
}

function handleError(error) {
    console.warn(error);
    return null;
}

async function getUserData(player) {
    const [profile, repos] = await Promise.all([getProfile(player), getRepos(player)]).handleError(handleError);
    return ({
        profile,
        score: calculateScore(profile, repos),
    });
}

function sortPlayers(players) {
    return players.sort((a, b) => b.score - a.score);
}

const api = {

    battle: async (players) => {
        const players = await  Promise.all(players.map(getUserData)).handleError(error);
        return players == null
            ? players
            : sortPlayers(players);
    },

    fetchPopularRepos: async (language) => {
        const encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}
            &sort=stars&order=desc&type=Repositories`);
        const result = await axios.get(encodedURI).handleError(handleError);

        return result.data.items;
    }
}

export default api;