const DEMO_LOCK_ID = 73429161;

async function acquireDemoLock(connection, lockHandle) {
  const [rows] = await connection.query(
    `SELECT pg_try_advisory_lock(${DEMO_LOCK_ID}) AS acquired`,
    { transaction: lockHandle }
  );
  if (!rows[0]?.acquired) {
    throw new Error(
      'Another demo database maintenance operation is already running.'
    );
  }
}

async function releaseDemoLock(connection, lockHandle) {
  await connection.query(
    `SELECT pg_advisory_unlock(${DEMO_LOCK_ID})`,
    { transaction: lockHandle }
  );
}

async function withDemoLock(connection, operation) {
  const lockConnection = await connection.connectionManager.getConnection();
  const lockHandle = { connection: lockConnection };
  let acquired = false;
  try {
    await acquireDemoLock(connection, lockHandle);
    acquired = true;
    return connection.transaction(operation);
  } finally {
    if (acquired) await releaseDemoLock(connection, lockHandle);
    connection.connectionManager.releaseConnection(lockConnection);
  }
}

async function cleanMutableDemoData({ connection, models }) {
  return withDemoLock(connection, async (transaction) => {
    const {
      Cart,
      Cart_items: CartItems,
      Data_user: DataUser,
      Order_details: OrderDetails,
      Order_items: OrderItems,
      Shopping_session: ShoppingSession,
      User,
      favorites: Favorites,
    } = models;

    await User.update(
      { dataUserId: null, shoppingSessionId: null },
      { where: {}, transaction }
    );
    await ShoppingSession.update(
      { cartItemId: null },
      { where: {}, transaction }
    );
    await Favorites.destroy({ where: {}, transaction });
    await CartItems.destroy({ where: {}, transaction });
    await OrderItems.destroy({ where: {}, force: true, transaction });
    await OrderDetails.destroy({ where: {}, force: true, transaction });
    await Cart.destroy({ where: {}, force: true, transaction });
    await DataUser.destroy({ where: {}, transaction });
    await ShoppingSession.destroy({ where: {}, transaction });
    await User.destroy({ where: {}, force: true, transaction });

    return { cleaned: true };
  });
}

module.exports = {
  DEMO_LOCK_ID,
  acquireDemoLock,
  releaseDemoLock,
  withDemoLock,
  cleanMutableDemoData,
};
