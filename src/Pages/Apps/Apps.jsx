import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FaThLarge, FaTable } from "react-icons/fa";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import HorizontalCard from "../../Components/Shared/Card/HorizontalCard";
import Loading from "../../Components/Shared/Loading/Loading";

const Apps = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [viewType, setViewType] = useState("grid");
  const [dateSort, setDateSort] = useState("");
  const [nameSort, setNameSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 6;

  useEffect(() => {
    const savedView = localStorage.getItem("viewType") || "grid";
    setViewType(savedView);
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ["apps", currentPage, searchQuery, dateSort, nameSort],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/apps/accepted/paginated?page=${currentPage}&limit=${limit}&search=${searchQuery}&date=${dateSort}&name=${nameSort}`
      );
      return res.data;
    },
    keepPreviousData: true,
    staleTime: 60 * 1000,
  });

  const apps = data?.data || [];
  const totalPages = data?.totalPages || 0;

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    setSearchQuery(e.target.search.value.trim());
  };

  const handleViewChange = (type) => {
    setViewType(type);
    localStorage.setItem("viewType", type);
  };

  if (isLoading)
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Loading />
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto my-20 px-4 md:px-0">
      {/* Go Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-xl mb-6 text-primary hover:underline"
      >
        <IoIosArrowRoundBack size={30} /> Go Back
      </button>

      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          className="flex items-center gap-2 w-full md:w-auto"
        >
          <input
            type="text"
            name="search"
            placeholder="Search by app name..."
            className="input input-bordered w-full md:w-80"
            defaultValue={searchQuery}
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>

        {/* Sort & View Toggle */}
        <div className="flex items-center gap-4">
          {/* Sort by Date */}
          <div className="flex items-center gap-1">
            <label className="text-gray-700 font-medium">Sort by Date:</label>
            <button
              onClick={() => {
                setDateSort(dateSort === "asc" ? "desc" : "asc");
                setCurrentPage(1);
              }}
              className="btn btn-sm btn-outline btn-primary"
            >
              {dateSort === "asc"
                ? "⬆️ Asc"
                : dateSort === "desc"
                ? "⬇️ Desc"
                : "Sort"}
            </button>
          </div>

          {/* Sort by Name */}
          {/* <div className="flex items-center gap-1">
            <label className="text-gray-700 font-medium">Sort by Name:</label>
            <button
              onClick={() => {
                setNameSort(nameSort === "asc" ? "desc" : "asc");
                setCurrentPage(1);
              }}
              className="btn btn-sm btn-outline btn-primary"
            >
              {nameSort === "asc"
                ? "A-Z"
                : nameSort === "desc"
                ? "Z-A"
                : "Sort"}
            </button>
          </div> */}

          {/* View Toggle */}
          <button
            onClick={() => handleViewChange("grid")}
            className={`text-2xl ${
              viewType === "grid" ? "text-primary" : "text-gray-400"
            }`}
          >
            <FaThLarge />
          </button>
          <button
            onClick={() => handleViewChange("table")}
            className={`text-2xl ${
              viewType === "table" ? "text-primary" : "text-gray-400"
            }`}
          >
            <FaTable />
          </button>
        </div>
      </div>

      {/* Render Apps */}
      {viewType === "grid" ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {apps.map((app) => (
            <HorizontalCard key={app._id} app={app} />
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra table-bordered w-full border border-gray-300">
            <thead>
              <tr>
                <th>#</th>
                <th>App Name</th>
                <th>Title</th>
                <th>Tags</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {apps.map((app, index) => (
                <tr key={app._id}>
                  <th>{index + 1}</th>
                  <td>{app.name}</td>
                  <td>{app.title}</td>
                  <td>{app.tags?.join(", ")}</td>
                  <td>{new Date(app.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline btn-primary"
                      onClick={() => navigate(`/appsDetails/${app._id}`)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded-lg border ${
                currentPage === page
                  ? "bg-primary text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Apps;
