
const Stripe = require('stripe');
const stripe = new Stripe('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'); 
module.exports = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [{
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Coding Help',
                        },
                        unit_amount: 10000, 
                    },
                    quantity: 1,
                }],
                mode: 'payment',
                success_url: 'https://shop-of-masons.vercel.app/',
                cancel_url: 'https://shop-of-masons.vercel.app/',
            });
            res.status(200).json({ id: session.id });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ error: 'Only POST requests are allowed' });
    }
};

