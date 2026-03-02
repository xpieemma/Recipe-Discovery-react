import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";


export default function Navbar() {
   return (
   <nav>
      <div>
         <Link to ="/"> 🍳 Recipe Discovery</Link>
         <div>
            <Link to ="/">Home</Link>
            <Link to ="/favorites">Favorites</Link>
         </div>
      </div>

<SearchBar />

   </nav>
   );
}