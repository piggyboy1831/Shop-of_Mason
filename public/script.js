var stripe = Stripe('pk_live_51Ngh9zFdGU3te0jr4oITamY8AcZa5vz7SaibWvGtEapSLmnH8aqgsrSr2Y7SGaORw3EH3LexOUCU1brT9qMv7Yyi00XlX8wT4M');
document.getElementById('checkout-button').addEventListener('click', async () => {
  
    const session = await fetch('/api/checkout', {
        method: 'POST',
    }).then(res => res.json());
   
    const result = await stripe.redirectToCheckout({
        sessionId: session.id,
    });

    if (result.error) {
        alert(result.error.message);
    }
});
