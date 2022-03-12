import React from "react";

export default function CategoryForm({ name, setName, handleSubmit, loading }) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
          required
        />
        <button disabled={loading} className="btn btn-outline-primary mt-2">
          Save
        </button>
      </div>
    </form>
  );
}
