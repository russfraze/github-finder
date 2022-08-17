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
        const {items} = await response.json()

        return items
    }