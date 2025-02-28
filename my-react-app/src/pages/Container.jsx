import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

function Container() {
    return (
        <>
            <Header>


            </Header>
            <div style={{ flex: 1, padding: "100px 25px 20px 25px" }}>
                <Outlet />
            </div>
            <Footer>

            </Footer>
        </>
    )
}
export default Container;