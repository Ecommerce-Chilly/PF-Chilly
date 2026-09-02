export function groupOrders(orderItems = []) {
  const groups = new Map();

  for (const item of orderItems) {
    const key = item.checkoutSessionId || `legacy-${item.id}`;
    const existing = groups.get(key);

    if (existing) {
      existing.items.push(item);
      continue;
    }

    groups.set(key, {
      id: key,
      createdAt: item.createdAt,
      items: [item],
    });
  }

  return [...groups.values()].sort(
    (left, right) => new Date(right.createdAt) - new Date(left.createdAt)
  );
}
