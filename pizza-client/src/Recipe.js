import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import { useReducer, useState } from "react";
import { MdDelete } from "react-icons/md";
import { CgAdd } from "react-icons/cg";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { useHistory } from "react-router";
import { Button } from "react-bootstrap";
import { strCtx } from "./usecontext";
import { Prizecart } from "./Prizecart";

const initialState = { count: 0 };
const countReducer = (count, action) => {
  console.log(count + "  " + action);
  switch (action.type) {
    case "INCREMENT": {
      return count < 0 ? { count: 0 } : { count: count + 1 };
    }
    case "DECREMENT": {
      return count <= 0 ? { count: 0 } : { count: count - 1 };
    }
    default: {
      return count;
    }
  }
};

export default function Recipe({
  title,
  image,
  ingredient,
  index,
  setRecipes,
  recipes,
}) {
  const [active, setActive] = useState(true);
  const [content, showContent] = useState(false);
  const history = useHistory();

  const [state, dispatch] = useReducer(countReducer, initialState);
  return (
    <div key={index} className="recipe">
      <div className="col mb-4 card">
        <div
          onClick={() => {
            showContent((on) => !on);
            history.push(`/home/ingredient/${title}`);
          }}
        >
          <img src={image} className="card-img-top food-image" alt={title} />
          <button className="card-title food-label">{title}</button>
        </div>
        <span className="top-right-hover">
          <button
            className="delete-btn"
            onClick={() => setRecipes(recipes.filter((e, i) => i !== index))}
          >
            <MdDelete />
          </button>
        </span>
      </div>
      {/* {active ? (
        <Button
          className="add-to-cart"
          size="sm"
          onClick={() => setActive(false)}
        >
          Add to Cart <CgAdd />
        </Button>
      ) : (
        <div className="cart-add">
          <Button
            className="decrement color"
            size="sm"
            onClick={() => {
              dispatch({ type: "DECREMENT" });
            }}
          >
            <AiOutlineMinusCircle />
          </Button>
          <span>{state.count}</span>
          <Button
            className="increment color"
            size="sm"
            onClick={() => dispatch({ type: "INCREMENT" })}
          >
            <CgAdd />
          </Button>
        </div>
      )} */}
      <Ingredient
        content={content}
        showContent={showContent}
        ingredient={ingredient}
        title={title}
      />
    </div>
  );
}

function Ingredient({ title, content, showContent, ingredient }) {
  const history = useHistory();
  return content ? (
    <div className="ingredient">
      <button
        className="btn btn-secondary btn-sm close"
        onClick={() => {
          showContent((on) => !on);
          history.goBack();
        }}
      >
        &times;
      </button>
      <div className="ingredient-lines">
        <h4>{title}</h4>
        <p style={{ fontFamily: "serif" }}>{ingredient}</p>
      </div>
    </div>
  ) : null;
}
