import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  putProductById,
  getProductById,
  createDiscount,
  putInventory,
  putDiscount,
} from "../../../redux/actions/actions.js";
import { useParams } from "react-router-dom";
import "./ChangeComponent.css";


function ChangeComponent() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetail);
  const msg = useSelector((state) => state.productChangedMsg);
  const history = useHistory();



  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  const [newProduct, setNewProduct] = useState({
    name: productDetails.length > 0 ? productDetails[0].name : "",
    price: productDetails.length > 0 ? productDetails[0].price : "",
    brand: productDetails.length > 0 ? productDetails[0].brand : "",
    model: productDetails.length > 0 ? productDetails[0].model : "",
    image: productDetails.length > 0 ? productDetails[0].image : "",
    quantity: "",
    category: productDetails.length > 0 ? productDetails[0].categoryName : "",
    details: [],
    discount:
      productDetails.length > 0
        ? productDetails[0].discountName
          ? productDetails[0].discountName
          : ""
        : "",
  });
  const [discountt, setDiscountt] = useState({
    name: `${newProduct.discount}`,
    description: '',
    percent: 0,
    active: 0,
  });

  const handleDiscount = (e) => {
    setDiscountt({
      ...discountt,
      [e.target.name]: e.target.value,
    });
  };

  const handleChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === 'discount') {
      setDiscountt({
        ...discountt,
        name: e.target.value,
      });
    }
  };

  const handleDetailChange = (e) => {
    setNewProduct({
      ...newProduct,
      details: [{ ...newProduct.details[0], [e.target.name]: e.target.value }],
    });
  };

  function dispatchDataToChange(id, newProduct) {
    dispatch(putProductById(id, newProduct));
  }

  function dispatchDataToChangeInventory(id, newProduct) {
    dispatch(putInventory(id, newProduct));
  }

  function dispatchDataToChangeDiscount(newProduct) {
    if (newProduct.discount) {
      dispatch(putDiscount(newProduct));
    }
  }

  function dispatchDataToDiscount(newProduct) {
    dispatch(createDiscount(newProduct));
  }

  return (
    <div className="form-container">
      {productDetails.length > 0 ? (
        <form
          onSubmit={(e) => {
            dispatchDataToChange(productDetails[0].id, newProduct);
            dispatchDataToChangeInventory(productDetails[0].id, newProduct);
            dispatchDataToChangeDiscount(discountt);
            dispatchDataToDiscount(discountt);
            e.preventDefault();
           
          }}
          className="form"
        >
          <div className="form-header">
            <h1 className="form-title">Change Product</h1>
          </div>
          <label className="form-label">New name of product:</label>
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleChange}
            placeholder="Write the name here..."
            className="form-input"
          ></input>
          <label className="form-label">New Price:</label>
          <input
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleChange}
            placeholder="Price at here"
            className="form-input"
          ></input>
          <label className="form-label">Have new Brand?</label>
          <select
            name="brand"
            className="form-input"
            onChange={handleChange}
            value={newProduct.brand}
          >
            <option></option>
            <option>Alphacool</option>
            <option>Antec</option>
            <option>ASUS</option>
            <option>ASRock</option>
            <option>Apevia</option>
            <option>ARCTIC</option>
            <option>AMD</option>
            <option>be quiet!</option>
            <option>Biostar</option>
            <option>BenQ</option>
            <option>Corsair</option>
            <option>Cooler Master</option>
            <option>Crucial</option>
            <option>Cryorig</option>
            <option>Diamond Multimedia</option>
            <option>DEEPCOOL</option>
            <option>Dragonwar</option>
            <option>DIYPC</option>
            <option>Das Keyboard</option>
            <option>Dland</option>
            <option>EagleTec</option>
            <option>ECS Elitegroup</option>
            <option>EVGA</option>
            <option>Fractal Design</option>
            <option>Gelid Solutions</option>
            <option>Gigabyte</option>
            <option>G.Skill</option>
            <option>Gray Star</option>
            <option>Happy</option>
            <option>HIS</option>
            <option>HUO JI</option>
            <option>HP</option>
            <option>Intel</option>
            <option>Insignia</option>
            <option>Kingston</option>
            <option>Kensington</option>
            <option>Logitech</option>
            <option>MSI</option>
            <option>Mushkin</option>
            <option>Marshal</option>
            <option>NZXT</option>
            <option>Noctua</option>
            <option>Phanteks</option>
            <option>PowerColor</option>
            <option>Patriot Memory</option>
            <option>PNY</option>
            <option>Qisan</option>
            <option>Rosewill</option>
            <option>Redragon</option>
            <option>Razer</option>
            <option>SilverStone Technology</option>
            <option>SAMSUNG</option>
            <option>Seasonic</option>
            <option>Supermicro</option>
            <option>SteelSeries</option>
            <option>Sapphire Technologys</option>
            <option>Seagate</option>
            <option>Thermaltake</option>
            <option>Thermalright</option>
            <option>Toshiba</option>
            <option>VisionTek</option>
            <option>Western Digital</option>
            <option>White Label</option>
            <option>XFX</option>
            <option>ZOTAC</option>
          </select>

          {msg ? <h2 className="sucessMsg">{`${msg}`}</h2> : <></>}

          {newProduct.brand === "" ? (
            <>
              <label className="form-label">Have new Model?</label>
              <input
                className="form-input"
                disabled
                placeholder="Before insert a brand"
              ></input>
            </>
          ) : newProduct.brand.length ? (
            <>
              <label className="form-label">Have new Model?</label>
              <input
                className="form-input"
                name="model"
                value={newProduct.model}
                onChange={handleChange}
                placeholder="Insert model"
              ></input>
            </>
          ) : (
            <></>
          )}
          <label className="form-label">New image of product:</label>
          <input
            type="text"
            name="image"
            value={newProduct.image}
            onChange={handleChange}
            placeholder="Image Product at here"
            className="form-input"
          ></input>

          <label className="form-label">Details:</label>
          <input
            type="text"
            name="brand"
            onChange={handleDetailChange}
            placeholder="brand"
            className="form-input"
          ></input>
          <input
            type="text"
            name="cosito"
            onChange={handleDetailChange}
            placeholder="cosito"
            className="form-input"
          ></input>
          <label className="form-label">Category:</label>
          <select
            name="category"
            className="form-input"
            onChange={handleChange}
            value={newProduct.category}
          >
            <option></option>
            <option>cases</option>
            <option>case_fan</option>
            <option>cpu_fan</option>
            <option>gpus</option>
            <option>keyboards</option>
            <option>motherboards</option>
            <option>mouses</option>
            <option>processors</option>
            <option>power_supply</option>
            <option>ram</option>
            <option>storage</option>
          </select>
          <label className="form-label">Stock:</label>
          <input
            type="text"
            name="quantity"
            value={newProduct.quantity}
            onChange={handleChange}
            placeholder="Quantity of product"
            className="form-input"
          ></input>

          {productDetails[0].discountName ? (
            <>
              <label className="form-label">Discount:</label>
              <input
                type="text"
                name="discount"
                value={newProduct.discount}
                onChange={handleChange}
                placeholder="Discount at here :D"
                className="form-input"
              ></input>
            </>
          ) : (
            <></>
          )}

          {newProduct.discount ? (
            <>
              <label className="form-label">Description of discount:</label>
              <input
                type="text"
                name="description"
                value={discountt.description}
                onChange={handleDiscount}
                placeholder="Description of discount"
              ></input>
              <label className="form-label">Percent discount:</label>
              <input
                type="text"
                name="percent"
                value={discountt.percent}
                onChange={handleDiscount}
                placeholder="Quantity of product"
              ></input>
              <label className="form-label">
                State discount(0 = inactive; 1 = active):
              </label>
              <input
                type="number"
                name="active"
                value={discountt.active}
                onChange={handleDiscount}
                placeholder="Quantity of product"
              ></input>
            </>
          ) : (
            <></>
          )}

          <input type="submit" className="btn-submit"></input>
        </form>
      ) : (
        <p>No se cargo correctamente</p>
      )}
    </div>
  );
}

export default ChangeComponent;
