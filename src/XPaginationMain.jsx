import { useEffect, useState } from "react";
import XPaginationFunc from "./XPaginationFunc";
const ENDPOINT = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

const PAGE_ENTRIES = 10;

function App() {
  const [empData, setEmpData] = useState([]);
  const [empPerPage, setEmpPerPage] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEmployeeData = async () => {
    try {
      let rest = await fetch(ENDPOINT);
      let restData = await rest.json();
      setEmpData(restData);
      setLoading(false);
    } catch (err) {
      alert("failed to fetch data");
      setError("Failed to fetch data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  useEffect(() => {
    let top = (currPage - 1) * PAGE_ENTRIES;
    let bottom = top + PAGE_ENTRIES;
    setEmpPerPage(empData.slice(top, bottom));
  }, [empData, currPage]);

  return (
    <div>
      <center>
        <header>
          <h1>Employee Data Table</h1>
        </header>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <div>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {empPerPage.map((emp) => (
                  <tr key={emp.id}>
                    <td>{emp.id}</td>
                    <td>{emp.name}</td>
                    <td>{emp.email}</td>
                    <td>{emp.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <XPaginationFunc
              page={currPage}
              maxPage={Math.ceil(empData.length / PAGE_ENTRIES)}
              setPage={setCurrPage}
            />
          </div>
        )}
      </center>
    </div>
  );
}

export default App;
