/* eslint-disable react/prop-types */
const Dropdown = ({title, options, handleDropdown}) => {
  return (
    <div className="select">
      <select defaultValue="0" name="format" id="format" onChange={handleDropdown}>
        <option value="0" disabled>
          {title}
        </option>
        {options.map((option, index) => (
            <option key={index} value={option} >
                {option.toUpperCase()}
            </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
