import Nav from "./Nav";
import Header from "./Header";
import Head from "next/head";
import Link from "next/link";

const Layout = ({children, menu, meta}) => {
    console.log('layout - ', menu);

    const {title, description, icon} = meta;
    return (
                <>
                    <Head>
                        {/*<link rel="icon" href="%PUBLIC_URL%/favicon.ico" />*/}
                        <link rel="stylesheet" href="/css/normalize.css" />
                        <link rel="stylesheet" href="/css/main.css" />
                        <link rel="stylesheet" href="/css/project2.css" />
                        <title>{title}</title>
                        <link rel="icon" href={icon || "/favicon.ico"} />
                    </Head>
                    <body>
                        <div className="container">
                            <Header />
                            <Nav menu={menu} />
                            <main>{children}</main>
                            <footer className="footer">
                                <p>copyright &copy; 2023. yogurrr. All Rights Reserved.</p>
                            </footer>
                        </div>
                    </body>
                </>
    );
}

export default Layout;