import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';
import { cleanPlantCost } from './utils';

const CartItem = ({ onContinueShopping }) => {
	const cart = useSelector((state) => state.cart.items);
	const dispatch = useDispatch();

	// Calculate total amount for all products in the cart
	const calculateTotalAmount = () => {
		let total = 0;
		cart.forEach((plant) => {
			const { cost, quantity } = plant;
			total += cleanPlantCost(cost) * quantity;
		});
		return total;
	};

	const handleContinueShopping = () => {
		onContinueShopping();
	};

	const handleIncrement = (item) => {
		const { name, quantity } = item;
		dispatch(updateQuantity({ name, quantity: quantity + 1 }));
	};

	const handleDecrement = (item) => {
		const { name, quantity } = item;
		if (quantity > 1) {
			dispatch(updateQuantity({ name, quantity: quantity - 1 }));
		}
	};

	const handleRemove = (item) => {
		const { name } = item;
		dispatch(removeItem(name));
	};

	// Calculate total cost based on quantity for an item
	const calculateTotalCost = (item) => {
		const { cost, quantity } = item;
		const cleanedCost = cleanPlantCost(cost);
		return cleanedCost * quantity;
	};

	const handleCheckout = () => {
		alert('Functionality to be added for future reference');
	};

	return (
		<div className='cart-container'>
			<h2 style={{ color: 'black' }}>
				Total Cart Amount: ${calculateTotalAmount()}
			</h2>
			<div>
				{cart.map((item) => (
					<div className='cart-item' key={item.name}>
						<img className='cart-item-image' src={item.image} alt={item.name} />
						<div className='cart-item-details'>
							<div className='cart-item-name'>{item.name}</div>
							<div className='cart-item-cost'>{item.cost}</div>
							<div className='cart-item-quantity'>
								<button
									className='cart-item-button cart-item-button-dec cart-disabled'
									onClick={() => handleDecrement(item)}
									disabled={item.quantity === 1}
								>
									-
								</button>
								<span className='cart-item-quantity-value'>
									{item.quantity}
								</span>
								<button
									className='cart-item-button cart-item-button-inc'
									onClick={() => handleIncrement(item)}
								>
									+
								</button>
							</div>
							<div className='cart-item-total'>
								Total: ${calculateTotalCost(item)}
							</div>
							<button
								className='cart-item-delete'
								onClick={() => handleRemove(item)}
							>
								Delete
							</button>
						</div>
					</div>
				))}
			</div>
			<div
				style={{ marginTop: '20px', color: 'black' }}
				className='total_cart_amount'
			></div>
			<div className='continue_shopping_btn'>
				<button
					className='get-started-button'
					onClick={(e) => handleContinueShopping(e)}
				>
					Continue Shopping
				</button>
				<br />
				<button
					className='get-started-button1 checkout-disabled'
					onClick={handleCheckout}
					disabled={cart.length === 0}
				>
					Checkout
				</button>
			</div>
		</div>
	);
};

export default CartItem;
