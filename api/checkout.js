
const Stripe = require('stripe');
const stripe = new Stripe('YOUR_STRIPE_SECRET_KEY'); // Please replace this with your secret key

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [{
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Your Product Name',
                        },
                        unit_amount: 10000, // This is in cents, so $100.00
                    },
                    quantity: 1,
                }],
                mode: 'payment',
                success_url: 'YOUR_SUCCESS_URL',
                cancel_url: 'YOUR_CANCEL_URL',
            });
            res.status(200).json({ id: session.id });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ error: 'Only POST requests are allowed' });
    }
};
