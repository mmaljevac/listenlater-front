import { useContext, useState } from "react";
import { AppContext } from "../AppContext";
import { Navigate, useNavigate } from "react-router-dom";

const Search = () => {
  const { curUser } = useContext(AppContext);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    if (searchTerm) {
      try {
        const response = await fetch(
          `https://ws.audioscrobbler.com/2.0/?method=album.search&album=${searchTerm}&limit=30&api_key=6114c4f9da678af26ac5a4afc15d9c4f&format=json`
        );
        const data = await response.json();

        setSearchResults(data.results.albummatches.album);
        console.log(searchResults);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  const handleAlbumClick = async (album) => {
    console.log(album);
    const name = album.name;
    const artist = album.artist;
    const imgUrl = album.image[3]["#text"];
    const idUser = curUser.id;
    await fetch("http://localhost:8080/albums", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, artist, imgUrl, idUser }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };

  return curUser ? (
    <div className="content">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Album name"
        style={{ textAlign: "center" }}
      />{" "}
      <br></br>
      <button onClick={handleSearch}>Search</button>
      <ul className="seachUl">
        {searchResults.map((album) => (
          <li
            className="seachLi"
            key={album.name}
            onClick={() => handleAlbumClick(album)}
          >
            <a>
              <div className="searchItems">
                <div className="addButton">+</div>
                <img src={album.image[3]["#text"]} />
                <aside>
                  {album.name} • {album.artist}
                </aside>
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
