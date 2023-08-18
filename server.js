
const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');


const app = express();

// Use your Stripe secret key here
const stripe = new Stripe('sk_test_51NgJv6JEGWdGSBGGJD2LvNetCnpVHlnmZ9ATXCeZGKFrCOm66L2j3EpJa151EeIjoyU5zh79xbIFQUYH9ry9PRXr00vrvVRwke');

app.use(cors());
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
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

    res.json({ id: session.id });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
