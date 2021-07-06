import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import Recipe from "./Recipe";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

export default function Home() {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState();
  const [areas, setArea] = useState();
  const [recipes, setRecipes] = useState([]);
  const [category, setCategory] = useState({});

  return (
    <div className="container home">
      <header>
        <h1 className="m-4">Food Recipes </h1>
      </header>
      <Search
        search={search}
        setSearch={setSearch}
        setQuery={setQuery}
        query={query}
        areas={areas}
        setArea={setArea}
        recipes={recipes}
        setRecipes={setRecipes}
        category={category}
        setCategory={setCategory}
      />
      <Content
        areas={areas}
        setArea={setArea}
        query={query}
        search={search}
        setSearch={setSearch}
        recipes={recipes}
        setRecipes={setRecipes}
        category={category}
        setCategory={setCategory}
      />
    </div>
  );
}

// {Search Functionality section}
function Search({ search, setSearch }) {
  const [filter, showFilter] = useState(false);
  return (
    <div className="food-search-box">
      <input
        className="search-bar"
        type="text"
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />
    </div>
  );
}

// Content Section

function Content({ search, recipes, setRecipes }) {
  const PORT = "http://localhost:5000/pizzas";
  const getPizzas = async () => {
    const response = await fetch(PORT);
    const meal = await response.json();
    setRecipes(meal);
  };
  useEffect(() => {
    getPizzas();
  }, []);
  return (
    <Container>
      <h3 className="cuisine-title">Explore New Tastes</h3>
      <div className="row row-cols-1 row-cols-md-4">
        {recipes
          .filter((recipe) => {
            if (search === "") {
              return recipe;
            } else if (
              recipe.title.toLowerCase().includes(search.toLowerCase())
            ) {
              return recipe;
            }
          })
          .map((recipe, index) => (
            <Recipe
              key={index}
              title={recipe.title}
              image={recipe.img}
              ingredient={recipe.strInstructions}
              cuisineType={recipe.strArea}
              index={index}
              setRecipes={setRecipes}
              recipes={recipes}
            />
          ))}
      </div>
    </Container>
  );
}
