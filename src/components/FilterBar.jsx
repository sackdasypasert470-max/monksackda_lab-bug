
import { categories } from "../data.js";

function FilterBar({value, setValue}) {
 
  const options = ["all", ...categories];
  return (
    <div className="filter-row">
      {options.map((c) => (
        <button
          key={c}
          className={"filter-btn" + (value === c ? " active" : "")}
          onClick={() => setValue(c)}
        >
          {c === "all" ? "ທັງໝົດ" : c}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
