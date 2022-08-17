import { createContext, useReducer } from "react"
import { createRenderer } from "react-dom/test-utils"
import githubReducer from './GithubReducer'

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({children}) => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    } 

    const [state, dispatch] = useReducer(githubReducer, initialState)


    //get a single user
    const getUser = async (login) => {
        setLoading()
        
        const response = await fetch(`${GITHUB_URL}/users/${login}`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
            }
        })

        if(response.status === 404) {
            //remember how to do this kind of redirect
            window.location = '/notfound'
        } else {
            //destructure just the items array from all the data that comes back 
            const data = await response.json()
    
            dispatch({
                type: 'GET_USER',
                payload: data,
            })

        }

    }

    // get user repos 
    const getUserRepos = async (login) => {
        setLoading()

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

        dispatch({
            type: 'GET_REPOS',
            payload: data,
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
        ...state,
        dispatch,
        handleClear,
        getUser,
        getUserRepos,
    }}>
        {children}
    </GithubContext.Provider>

}

export default GithubContext