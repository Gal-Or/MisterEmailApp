import { Link } from "react-router-dom";

export function HomePage() {

    return (
        <>
            <h1>Home Page</h1>
            <Link to={"/inbox?folder=inbox&txt=&isRead=null&compose=new&to=help@gmail.com&subject=Help"}>Quick Send - Help</Link>
        </>
    )
}