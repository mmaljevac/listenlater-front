import { useContext, useState } from "react";
import { AppContext } from "../AppContext";
import { Navigate } from "react-router-dom";

const Search = () => {
  const { curUser } = useContext(AppContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://ws.audioscrobbler.com/2.0/?method=album.search&album=${searchTerm}&limit=12&api_key=6114c4f9da678af26ac5a4afc15d9c4f&format=json`
      );
      const data = await response.json();

      setSearchResults(data.results.albummatches.album);
      console.log(searchResults);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAlbumClick = async (album) => {
    try {
      // Ovdje dodajte kod za slanje odabranog albuma na backend
      // Primjer: fetch('backend-url', { method: 'POST', body: JSON.stringify(album) });
      console.log("Album poslan na backend:", album);
    } catch (error) {
      console.error("Error sending album to backend:", error);
    }
  };

  return curUser ? (
    <div className="content">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Album name"
      />{" "}
      <br></br>
      <button onClick={handleSearch}>Search</button>
      <ul>
        {searchResults.map((album) => (
          <li key={album.name} onClick={() => handleAlbumClick(album)}>
            <a href={album.url}>
              <div>
                <img src={album.image[3]["#text"]} /> <br/>
                {album.name} <br/> {album.artist}
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <Navigate to={{ pathname: "/login" }} />
  );
};

export default Search;
