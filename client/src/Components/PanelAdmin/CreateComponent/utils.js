import { useDispatch } from "react-redux";
import {
  createProduct,
  createDiscount,
} from "../../../redux/actions/actions.js";

function dispatchDataToDiscount(newProduct) {
  const dispatch = useDispatch();
  dispatch(createDiscount(newProduct));
}

function dispatchDataToCreate(newProduct) {
  const dispatch = useDispatch();
  dispatch(createProduct(newProduct));
}

module.exports = {
  dispatchDataToCreate,
  dispatchDataToDiscount,
};
