import { createContext, useReducer } from "react"
import githubReducer from './GithubReducer'

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({children}) => {
    const initialState = {
        users: [],
        loading: false
    } 

    const [state, dispatch] = useReducer(githubReducer, initialState)


    //get search results
    const searchUsers = async (text) => {
        setLoading()

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

        dispatch({
            type: 'GET_USERS',
            payload: items,
        })
    }

    // Set loading 
    const setLoading = () => dispatch({type: 'SET_LOADING'})

    // Clear the users from state
    function handleClear() {
        dispatch({
            type: 'CLEAR_USERS',
            payload: []
        })
    }

    return <GithubContext.Provider 
    value={{
        users: state.users,
        loading: state.loading,
        searchUsers,
        handleClear,
    }}>
        {children}
    </GithubContext.Provider>

}

export default GithubContext