import { useContext, useEffect, useState } from "react";
import { AppContext } from "../AppContext";
import { Navigate } from "react-router-dom";

const Admin = () => {
  const { curUser } = useContext(AppContext);

  const [users, setUsers] = useState([]);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    if (!(curUser && curUser.admin)) {
      return <Navigate to={{ pathname: "/" }} />
    }
    
    fetchUsers();
    fetchAlbums();
  }, []);

  const fetchUsers = async () => {
      await fetch(
        `http://localhost:8080/users`,
        {
          method: "GET",
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          if (data) {
            setUsers(data);
          }
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });
  };

  const fetchAlbums = async () => {
    await fetch(
      `http://localhost:8080/albums`,
      {
        method: "GET",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setAlbums(data);
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
};

  return <div>
  <h2>Users</h2>
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Username</th>
        <th>Email</th>
        <th>Admin</th>
      </tr>
    </thead>
    <tbody>
      {users.map(user => (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.username}</td>
          <td>{user.email}</td>
          <td>{user.admin ? 'Yes' : 'No'}</td>
        </tr>
      ))}
    </tbody>
  </table>
  <h2>Saved albums</h2>
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Artist</th>
        <th>User ID</th>
      </tr>
    </thead>
    <tbody>
      {albums.map(albums => (
        <tr key={albums.id}>
          <td>{albums.id}</td>
          <td>{albums.name}</td>
          <td>{albums.artist}</td>
          <td>{albums.idUser}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>;
};

export default Admin;
