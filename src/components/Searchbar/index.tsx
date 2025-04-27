const SearchBar = ({ searchQuery, setSearchQuery }) => (
  <div className="mt-2">
    <div className="relative bg-white/50 rounded-md p-2"> 
      <input
        type="text"
        className="w-full bg-white/50 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-2"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <span className="text-xs italic text-black">
        Search by Package
      </span>
    </div>
  </div>
);

export default SearchBar;
