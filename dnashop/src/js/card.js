// const payments = Square.payments(appId, locationId);
// const card = await payments.card({
//     "postalCode": "12345",
//     "style": {
//         "input": {
//             "color": "red",
//         }
//     "@media screen and (max-width: 600px)": {
//             "input": {
//                 "fontSize": "12px",
//             }
//         }
//     }
// });
const payments = Square.payments(appId, locationId);

const card = await payments.card();

await card.attach('#card');

const form = document.querySelector('#card-payment');
let token;
form.addEventListener('submit', async (event) => {
    
    event.preventDefault();

    const tokenResult = await card.tokenize(); // the card nonce
    if (tokenResult.status === 'OK') {
        token = tokenResult.token;
} else {
        console.error(tokenResult.errors);
}       
});

token = await card.tokenize();


module.exports = [form]