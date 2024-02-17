import React from "react";

const CourceForm = ({handleSubmit,value,setValue}) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Enter the Cource Name"
            value={value}
            onChange={(e)=>setValue(e.target.value)}
          />
        
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        </div>
      </form>
    </div>
  );
};

export default CourceForm;
