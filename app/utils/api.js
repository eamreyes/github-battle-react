const id = "YOUR_CLIENT_ID";
const sec = "YOUR_SECRET_ID";
const params = `?client_id=${id}&client_secret=${sec}`;


async function getProfile(username) {
    const response = await fetch(`https://api.github.com/users/${username}${params}`)
        .catch(handleError);
    return response.json();
}

async function getRepos(username) {
    const response = await fetch(`https://api.github.com/users/${username}/repos${params}&per_page=100`);

    return response.json();
}

function getStarCount(repos) {
    return repos.reduce((count, { stargazers_count }) => count + stargazers_count, 0);
}

function calculateScore({ followers }, repos) {
    return (followers * 3) + getStarCount(repos);
}

function handleError(error) {
    console.warn(error);
    return null;
}

async function getUserData(player) {
    const [profile, repos] = await Promise.all([getProfile(player), getRepos(player)]).catch(handleError);
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
        const playerStats = await  Promise.all(players.map(getUserData)).catch(handleError);
        return playerStats == null
            ? playerStats
            : sortPlayers(playerStats);
    },

    fetchPopularRepos: async (language) => {
        const encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}
            &sort=stars&order=desc&type=Repositories`);
            
        const response = await fetch(encodedURI).catch(handleError);
        const repos = await response.json();
        return repos.items;
    }
}

export default api;
