import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Recipeform = () => {
  const [recipes, setRecipes] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    imageUrl: ""
  });
  const [editIndex, setEditIndex] = useState(null);
  
  const navigate = useNavigate();

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
      // Edit existing recipe
      const updated = [...recipes];
      updated[editIndex] = formData;
      setRecipes(updated);
      setEditIndex(null);
    } else {
      // Add new recipe
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
    if (confirm("Do you want to delete this recipe?")) {
      const updated = recipes.filter((_, i) => i !== index);
      setRecipes(updated);
    }
  };

  const handleEdit = (index) => {
    setFormData(recipes[index]);
    setEditIndex(index);
  };


  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    alert("You have been logged out!");
    navigate("/login");
  };

  

  return (
    <div className="container py-5">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h1 className="display-5 text-white fw-bold">Recipe Collection</h1>
          <p className="lead text-white">Add, edit and delete your recipes</p>
        </div>
        <button
          className="btn btn-danger px-4 fw-semibold"
          onClick={handleLogout}
          style={{ borderRadius: "25px" }}
        >
          Logout
        </button>
      </div>

      {/* Recipe Form */}
      <div className="recipe-card card shadow-lg border-0 mb-4" style={{ borderRadius: "15px" }}>
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
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="auth-input form-select text-dark form-select-lg"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Snacks">Snacks</option>
                  <option value="Dessert">Dessert</option>
                  <option value="Beverage">Beverage</option>
                </select>
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

            <div className="text-center mb-4">
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

      {/* Recipe Cards */}
      <div className="row">
        {recipes.length > 0 ? (
          recipes.map((recipe, index) => (
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

                  {/* Edit & Delete Buttons (Icons Removed) */}
                  <div className="mt-auto d-flex justify-content-start gap-2">
                    <button
                      className="btn btn-sm btn-outline-light fw-semibold"
                      onClick={() => handleEdit(index)}
                      style={{ borderRadius: "20px" }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger fw-semibold"
                      onClick={() => handleDelete(index)}
                      style={{ borderRadius: "20px" }}
                    >
                      Delete
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
              <p className="text-white-50">Try adding one!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recipeform;
