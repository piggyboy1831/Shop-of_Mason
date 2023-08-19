var stripe = Stripe('pk_live_51NgJv6JEGWdGSBGG6m79uQhK2T2fivcYYydMNJV3nLgfXq83nGYo3wBQ4X8oFyIYvbbQWVJ5nzXBZSHRBrJoySCa00QeYO6Tvo');
document.getElementById('checkout-button').addEventListener('click', async () => {
    // Create a Checkout Session using your Stripe secret key
    const session = await fetch('/api/checkout', {
        method: 'POST',
    }).then(res => res.json());

    // Redirect to the Stripe Checkout page
    const result = await stripe.redirectToCheckout({
        sessionId: session.id,
    });

    if (result.error) {
        alert(result.error.message);
    }
});
