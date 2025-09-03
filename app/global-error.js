"use client"



export default function GlobalError({error,reset}){
    return(
        <html>
            <body>
                <main>
                    <h1>Application Crashed</h1>
                    <p>{error.message}</p>
                    <button onClick={() => reset()}>Try Again</button>
                </main>
            </body>
        </html>
    )
}