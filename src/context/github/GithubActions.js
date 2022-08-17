const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

//get search results
export const searchUsers = async (text) => {

    const params = new URLSearchParams({
        q: text
    })

    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
        headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
        }
    })

    //destructure just the items array from all the data that comes back 
    const { items } = await response.json()

    return items
}


//get a single user
export const getUser = async (login) => {

    const response = await fetch(`${GITHUB_URL}/users/${login}`, {
        headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
        }
    })

    if (response.status === 404) {
        //remember how to do this kind of redirect
        window.location = '/notfound'
    } else {
        //destructure just the items array from all the data that comes back 
        const data = await response.json()

        return data

    }

}

// get user repos 
export const getUserRepos = async (login) => {

    const params = new URLSearchParams({
        sort: 'created',
        per_page: 10
    })

    const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
        headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
        }
    })

    //destructure just the items array from all the data that comes back 
    const data = await response.json()

    return data
}