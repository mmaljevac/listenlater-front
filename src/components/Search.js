import { useState } from "react";

const Search = () => {
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

  return (
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
                <img
                  src={album.image[2]["#text"]}
                />{" "}
                <br></br>
                {album.name} by {album.artist}
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
