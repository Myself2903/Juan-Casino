import '../styles/UserCard.css'

const UserCard = props => {
    const params = props.params
    return(
        <div className="userCard">
            <div className="userPicture">
                <img className="profilePicture" src={params['picture']} alt="fotoDePerfil"/>
            </div>
            <div className="userInfo">
                <p>{params['username']} #{params['iduser']}</p>
                {params['name'] && params['surname'] ? <p>{params['name']} {params['surname']}</p> : <></>}
                {params['email'] ? <p>{params['email']}</p>: <></>}
                <p>{params['birthdate']}</p>
            </div>
        </div>
    )
}

export default UserCard