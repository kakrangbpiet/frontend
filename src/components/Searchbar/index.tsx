const SearchBar = ({ searchQuery, setSearchQuery }) => (
  <div className=" pr-4">
      <input
        type="text"
        className="w-[220px] bg-white/50 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-2"
        placeholder="Search Destination By Name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
  </div>
);

export default SearchBar;
