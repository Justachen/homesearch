import logo from '../resources/logo.svg';
import './header.css';

function Header() {
    return (
        <header className="App-header">
   			<img src={logo} className="App-logo" alt="logo" />
   			<nav>
	   			<ul className="Nav-links">
	   				<li><a href="#">Services</a></li>
					<li><a href="#">Dashboard</a></li>
	   				<li><a href="#">About</a></li>
	   			</ul>
   			</nav>
    	</header>
    );
}

export default Header;