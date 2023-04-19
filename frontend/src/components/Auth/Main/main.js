import styles from './stylesMain.css';


const Main = () => {

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    }

    return (
        <div className="main_container">
            <nav className="navbar">
                <h1>
                    {/* <h1>fakebook</h1> */}
                    <button className= "white_btn" onClick={handleLogout}>
                        Logout
                    </button>
                </h1>
            </nav>
        </div>
    )
};

export default Main; 