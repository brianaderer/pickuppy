import { useSession, signIn, signOut } from "next-auth/react";

const Index = (props: any) => {

    // `session` will match the returned value of `callbacks.session()` from `NextAuth()`
    const { data: session, status } = useSession()

    if( status == 'loading'){
        return(
            <h1>loading</h1>
        )
    }

    else{
        if (session) {
            return (
                <>

                    Signed in as {// @ts-ignore
                    session.user.email} <br/>
                    <button onClick={() => signOut()}>Sign out</button>
                </>
            )
        }
        return (
            <>
                Not signed in <br/>
                <button onClick={() => signIn()}>Sign in</button>
            </>
        )
    }
}

export default Index