var stripe = Stripe('pk_test_51NgJv6JEGWdGSBGGi5MsU1ELs3cmi7lEWtVWAotSUymF3s9bn8LpEf1WFLNCTmKWBKHFkEgNS9qc4hiH8xF3fJvL00HFTnUmLw');
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
