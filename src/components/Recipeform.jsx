import { useState, useEffect } from "react";

const Recipeform = () => {
  const [recipes, setRecipes] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    imageUrl: ""
  });
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  // Load from localStorage
  useEffect(() => {
    const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    setRecipes(storedRecipes);
  }, []);

  // Save to localStorage whenever recipes change
  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      // Editing existing recipe
      const updated = [...recipes];
      updated[editIndex] = formData;
      setRecipes(updated);
      setEditIndex(null);
    } else {
      // Adding new recipe
      setRecipes([...recipes, formData]);
    }

    setFormData({
      name: "",
      category: "",
      description: "",
      imageUrl: ""
    });
  };

  const handleDelete = (index) => {
    const updated = recipes.filter((_, i) => i !== index);
    setRecipes(updated);
  };

  const handleEdit = (index) => {
    setFormData(recipes[index]);
    setEditIndex(index);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = () => {
    const sorted = [...recipes].sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (sortOrder === "asc") return nameA > nameB ? 1 : -1;
      else return nameA < nameB ? 1 : -1;
    });
    setRecipes(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Filter recipes based on search term
  const filteredRecipes = recipes.filter(
    (r) =>
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="display-4 text-white fw-bold mb-3">Recipe Collection</h1>
        <p className="lead text-white">Add, search, sort, edit and delete your recipes</p>
      </div>

   

      {/* Recipe Form */}
      <div className="recipe-card card shadow-lg border-0 mb-5" style={{ borderRadius: "15px" }}>
        <div className="card-body p-4">
          <h3 className="card-title text-white mb-4 text-center">
            {editIndex !== null ? "Edit Recipe" : "Add New Recipe"}
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <label className="form-label text-white fw-semibold">Recipe Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter recipe name"
                  className="auth-input form-control form-control-lg"
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label text-white fw-semibold">Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="e.g., Dinner, Breakfast"
                  className="auth-input form-control form-control-lg"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label text-white fw-semibold">Image URL</label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="auth-input form-control form-control-lg"
              />
            </div>

            <div className="mb-4">
              <label className="form-label text-white fw-semibold">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="A short description of the recipe..."
                className="auth-input form-control"
                rows="4"
                required
              />
            </div>

            <div className="text-center">
              <button
                className="btn btn-primary btn-lg px-5 py-3 fw-semibold"
                type="submit"
                style={{ borderRadius: "25px" }}
              >
                {editIndex !== null ? "Update Recipe" : "Add Recipe"}
              </button>
            </div>
          </form>
     
        </div>
      </div>
        {/* Search & Sort Controls */}
      <div className="d-flex justify-content-center align-items-center gap-3 mb-4 mt-4 flex-wrap">
        <input
          type="text"
          className="form-control auth-input"
          placeholder="🔍 Search by name or category..."
          value={searchTerm}
          onChange={handleSearch}
          style={{ maxWidth: "300px" }}
        />
        <button
          className="btn btn-outline-light fw-semibold "
          onClick={handleSort}
          style={{ borderRadius: "20px" }}
        >
          Sort {sortOrder === "asc" ? "A → Z" : "Z → A"}
        </button>
      </div>
      {/* Recipe Cards */}
      <div className="row">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe, index) => (
            <div key={index} className="col-md-6 col-lg-4 mb-4">
              <div
                className="card h-100 shadow-sm recipe-card bg-transparent text-white"
                style={{
                  borderRadius: "15px",
                  border: "1px solid rgba(255, 255, 255, 0.2)"
                }}
              >
                {recipe.imageUrl && (
                  <img
                    src={recipe.imageUrl}
                    alt={recipe.name}
                    className="card-img-top"
                    style={{
                      height: "200px",
                      objectFit: "cover",
                      borderTopLeftRadius: "15px",
                      borderTopRightRadius: "15px"
                    }}
                    onError={(e) => {
                      e.target.src =
                        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjM2EzYTRhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iI2VjZWVlZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==";
                    }}
                  />
                )}

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold mb-2">{recipe.name}</h5>
                  {recipe.category && (
                    <p className="text-white-50 mb-2">
                      <small>{recipe.category}</small>
                    </p>
                  )}

                  <p
                    className="card-text small"
                    style={{
                      maxHeight: "120px",
                      overflowY: "auto",
                      lineHeight: "1.4"
                    }}
                  >
                    {recipe.description}
                  </p>

                  {/* Edit & Delete Buttons */}
                  <div className="mt-auto d-flex justify-content-between">
                    <button
                      className="btn btn-sm btn-outline-light fw-semibold"
                      onClick={() => handleEdit(index)}
                      style={{ borderRadius: "20px" }}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger fw-semibold"
                      onClick={() => handleDelete(index)}
                      style={{ borderRadius: "20px" }}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="text-center py-5">
              <h4 className="text-white mb-2">No recipes found</h4>
              <p className="text-white-50">Try adding or searching for one!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recipeform;
