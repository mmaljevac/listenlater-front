import { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { AppContext } from "../AppContext";

const Home = () => {
  const { curUser } = useContext(AppContext);

  const [albums, setAlbums] = useState([]);

  const fetchAlbums = async () => {
    if (curUser) {
      await fetch(
        `http://localhost:8080/albums/getAlbumsByUser/${curUser.id}`,
        {
          method: "GET",
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          console.log(response);
          if (
            response.status === 204 ||
            response.headers.get("Content-Length") === "0"
          ) {
            return;
          }

          return response.json();
        })
        .then((data) => {
          console.log(data);
          console.log("------");
          if (data) {
            setAlbums(data);
          }
          console.log(albums);
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });
    } else {
      return <Navigate to={{ pathname: "/login" }} />;
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:8080/albums/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        fetchAlbums();
        return response.json();
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };

  return curUser ? (
    <div className="content">
      <p>Hello, {curUser.username}</p>
      <ul>
        {albums.map((album) => (
          <li key={album.name}>
            <a href={album.imgUrl}>
              <div>
                <img src={album.imgUrl} /> <br />
                <p>{album.name}</p>
                {album.artist}
              </div>
            </a>
            <Link onClick={(e) => handleDelete(album.id)}>X</Link>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <Navigate to={{ pathname: "/login" }} />
  );
};

export default Home;
