import "./App.css";
import Card from "./components/Card";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState();
  const [fetchError, setFetchError] = useState(false);
  const [error, setError] = useState();
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  }
  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/search?search=${searchQuery}`);
      if (!response.ok) {
        setFetchError(true);
        setError("Data not found");
        return;
      }
      const data = await response.json();
      setData(data);
    } catch (err) {
      setError(err.message);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/get-data");
        if (response.ok) {
          const result = await response.json();
          console.log(result);
          setData(result);
        } else {
          setFetchError(true);
          setError("Failed to fetch data.");
        }
      } catch (error) {
        setFetchError(true);
        setError(error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <main className="flex m-0 p-0 w-full h-full fixed bg-[#f5f5f5]" id="main">
        <div className="h-full fixed bg-[#df5532] w-[236px]" id="sidebar">
          <div className="mt-3 ml-3 flex text-center items-center">
            <img src="/logo.svg" />
            <p className="text-white ml-1 uppercase">Logo</p>
          </div>
          <div className="mt-28 flex justify-center items-center text-white">
            <ul className="w-full">
              <a href="#">
                <li className="flex gap-5 p-4 pl-8 w-full hover:rounded-l-xl">
                  <img src="/dashboard.svg" />
                  Dashboard
                </li>
              </a>
              <a href="#">
                <li className="flex gap-5 p-2 pl-8 bg-gradient-to-r from-[rgba(255,255,255,0.4)] to-transparent rounded-l-xl">
                  <img src="/portfolio.svg" />
                  Portfolio
                </li>
              </a>
              <a href="#">
                <li className="flex gap-5 p-4 pl-8 w-full hover:rounded-l-xl">
                  <img src="/inputs.svg" />
                  Inputs
                </li>
              </a>
              <a href="#">
                <li className="flex gap-5 p-4 pl-8 w-full hover:rounded-l-xl">
                  <img src="/profile.svg" />
                  Profile
                </li>
              </a>
            </ul>
          </div>
        </div>
        <div
          id="container"
          className="ml-[236px] flex flex-col w-[calc(100%-236px)] h-full"
        >
          <div
            id="header"
            className="bg-white p-2 w-full flex justify-end gap-6 pr-12 border border-b items-center"
          >
            <img src="notification.svg" />
            <div id="user" className="flex justify-end items-center">
              <img src="user.svg" />
              <div id="user-info" className="flex text-sm flex-col ml-2">
                <h5 id="user-name" className="font-bold text-gray-700">
                  Lorem Ips.
                </h5>
                <p id="user-designation" className="text-gray-500">
                  Manager
                </p>
              </div>
            </div>
            <img src="dropdown.svg" />
          </div>
          <div
            className="bg-white m-8 h-[600px] rounded-lg p-5"
            id="main-container"
          >
            <h2 className="font-bold text-lg">Portfolio</h2>
            <div
              id="card-nav-filter-search"
              className="flex justify-between items-center"
            >
              <div className="w-fit">
                <ul className="flex gap-5 border border-transparent border-b-gray-500">
                  <a href="#">
                    <li className="p-4 text-[#df5532] border-transparent border-b-[#df5532] border-[3px]">
                      Project
                    </li>
                  </a>
                  <a href="#">
                    <li className="p-4">Saved</li>
                  </a>
                  <a href="#">
                    <li className="p-4">Shared</li>
                  </a>
                  <a href="#">
                    <li className="p-4">Achievement</li>
                  </a>
                </ul>
              </div>
              <div className="flex gap-5 justify-center items-center">
                <div className="flex gap-1">
                  <img src="filter.svg" />
                  <p>Filter</p>
                </div>
                <div className="flex justify-center relative items-center">
                  <input
                    onChange={handleSearchChange}
                    className="border p-2 pl-3 rounded-xl w-[20rem]"
                    placeholder="Search a project"
                    type="text"
                    name="search"
                  />
                  <button className="p-2 bg-[#df5532] rounded-lg absolute right-2" onClick={handleSearch}><img src="/search.svg"/></button>
                </div>
              </div>
            </div>
            {fetchError ? (
              <div
                id="cards-container"
                className="w-full h-[30rem] overflow-y-scroll"
              >
                {error}
              </div>
            ) : (
              <div
                id="cards-container"
                className="w-full h-[30rem] overflow-y-scroll"
              >
                {data &&
                  data.map((d) => (
                    <Card
                      key={d.id}
                      title={d.title}
                      image={d.image}
                      description={d.description}
                      authorName={d.author.name}
                      authorDetails={d.author.details}
                    />
                  ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
