import { Cart_item, Product, Shopping_session } from '../../db'

const addCartItem = async (shopId, productId, quantity) => {
  const item = await Cart_item.create({ quantity })
  item.setShopping_session(shopId)
  item.setProduct(productId)
  return item
}

export default { addCartItem }