
const Stripe = require('stripe');
const stripe = new Stripe('sk_test_51NgJv6JEGWdGSBGGJD2LvNetCnpVHlnmZ9ATXCeZGKFrCOm66L2j3EpJa151EeIjoyU5zh79xbIFQUYH9ry9PRXr00vrvVRwke'); // Please replace this with your secret key

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
