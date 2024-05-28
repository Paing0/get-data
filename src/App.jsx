import { useState, useEffect } from "react";

function App() {
  const [userData, setUserData] = useState([]);
  const [singleUserData, setSingleUserData] = useState(null);
  const [id, setId] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await response.json();
    setError(false);
    setSingleUserData(null);
    setUserData(data);
  };

  const getSingleData = async (e) => {
    e.preventDefault();
    if (id < 1) {
      setError(true);
      setId("");
      return;
    }
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${id}`
    );
    setError(false);
    const data = await response.json();
    setSingleUserData(data);
    setId("");
  };

  const handleGetAllData = (e) => {
    e.preventDefault();
    fetchAllData();
  };

  return (
    <>
      <form onSubmit={getSingleData}>
        <input
          type="number"
          value={id}
          onChange={(e) => {
            setId(e.target.value);
          }}
          placeholder="Enter Id"
        />
        <button type="submit">Get data</button>
        <button onClick={handleGetAllData}>Get all data</button>
      </form>
      <div>{error && <h2>Please enter a valid id.</h2>}</div>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          {/* get id specific data */}
          {singleUserData ? (
            <tr>
              <td>{singleUserData.id}</td>
              <td>{singleUserData.title}</td>
              {singleUserData.completed ? (
                <td className="completed">Completed</td>
              ) : (
                <td className="not-completed">Not Completed</td>
              )}
            </tr>
          ) : (
            // get all the data
            userData.map((userDatum) => (
              <tr key={userDatum.id}>
                <td>{userDatum.id}</td>
                <td>{userDatum.title}</td>
                {userDatum.completed ? (
                  <td className="completed">Completed</td>
                ) : (
                  <td className="not-completed">Not Completed</td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
}

export default App;
