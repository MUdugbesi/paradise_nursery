export const cleanPlantCost = (cost) => {
	if (!cost.startsWith('$')) return;

	cost = cost.slice(1);
	return Number(cost);
};
