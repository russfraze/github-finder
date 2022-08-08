import PropTypes from 'prop-types'

function UserItem({user}) {
    return (
        <div>
            <h3>{user.login}</h3>
        </div>
    )
}

export default UserItem
