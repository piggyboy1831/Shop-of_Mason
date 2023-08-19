
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

