import App from '../app/_app'

const Index = (props: any) => {
    console.log(props)
    return (
        <div>
            {props.user ? (
                <>
                    <span>Signed in as : {props.user.email}</span>
                    <button onClick={props.signOut}>Sign Out</button>
                </>
            ) : (
                <button onClick={props.signIn}>Sign In</button>
            )}
        </div>
    )
}

export default Index