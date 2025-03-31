const InputField = ({ label, text, onChange }) => {
  const id = label.toLowerCase().replace(/\s+/g, '-'); // Create a unique id based on the label

  return (
    <div className="relative w-full sm:flex sm:justify-between py-3">
      <input
        type="text"
        id={id}
        name={id}
        value={text}
        onChange={onChange}
        className="w-full sm:w-3/4 px-3 py-2 transition duration-100 border rounded-md outline-none peer focus:ring-2 focus:ring-secondaryColor"
        required
      />
      <label
        htmlFor={id}
        className="absolute px-1 tracking-wide transition duration-200 bg-white pointer-events-none left-2 top-5 text-secondaryColor peer-focus:-translate-y-5 peer-focus:-translate-x-3 peer-focus:scale-75 peer-valid:-translate-y-5 peer-valid:-translate-x-3 peer-valid:scale-75"
      >
        {label}
      </label>
    </div>
  );
};

export default InputField;