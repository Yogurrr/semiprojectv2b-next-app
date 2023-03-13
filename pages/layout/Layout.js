import Nav from "./Nav";
import Header from "./Header";

const Layout = ({children}) => {
    return (
            <html lang="ko">
                <head>
                    <meta charSet="UTF-8" />
                    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta name="theme-color" content="#000000" />
                    <link rel="stylesheet" href="/css/normalize.css" />
                    <link rel="stylesheet" href="/css/main.css" />
                    <link rel="stylesheet" href="/css/project2.css" />
                    <title>SemiProjectV2</title>
                </head>
                <body>
                <div className="container">
                    <Header />
                    <Nav />
                    <main>{children}</main>
                    <footer className="footer">
                        <p>copyright &copy; 2023. yogurrr. All Rights Reserved.</p>
                    </footer>
                </div>
                </body>
            </html>
    );
}

export default Layout;