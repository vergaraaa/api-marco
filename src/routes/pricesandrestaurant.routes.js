const { Router } = require("express");
const router = Router();

const { getPriceAndMenu, getTicketPriceDiscount, updateTicketPriceDiscount, createPriceAndMenu, getUrlMenu, updateUrlMenu, getTicketPriceGeneral, updateTicketPriceGeneral } = require('../controllers/pricesandrestaurant.controller')

router.route('/')
    .get(getPriceAndMenu)
    .post(createPriceAndMenu);

router.route('/ticketPriceGeneral')
    .get(getTicketPriceGeneral)
    .put(updateTicketPriceGeneral);

router.route('/ticketPriceDiscount')
    .get(getTicketPriceDiscount)
    .put(updateTicketPriceDiscount);

router.route('/urlMenu')
    .get(getUrlMenu)
    .put(updateUrlMenu);

module.exports = router;