import React from 'react';

const PlantCards = ({ plants, onclick }) => {
	return (
		<>
			{plants && (
				<div className='product-card'>
					<h3 className='product-title'>{plants.name}</h3>
					<img
						src={plants.image}
						alt={plants.title}
						className='product-image'
					/>
					<p className='product-price'>{plants.cost}</p>
					<p className=''>{plants.description}</p>
					<button className='product-button' onClick={onclick}>
						Add to Cart
					</button>
				</div>
			)}
		</>
	);
};

export default PlantCards;
