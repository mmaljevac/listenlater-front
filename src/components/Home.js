import { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { AppContext } from "../AppContext";

const Home = () => {
  const { curUser } = useContext(AppContext);

  const [albums, setAlbums] = useState([]);


    useEffect(() => {
      
      const fetchData = async () => {
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
  
      fetchData();
    
    }, []);

  

  return curUser ? (
    <div className="content">
      <p>Hello, {curUser.username}</p>
      <ul>
        {albums.map((album) => (
          <li key={album.name}>
            <a href={album.url}>
              <div>
                <img src={album.imgUrl} /> <br/>
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

export default Home;
