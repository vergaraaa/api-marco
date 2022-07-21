const PriceAndMenu = require('../models/PriceAndMenu.js');

pricesAndRestaurantCtrl = {};

pricesAndRestaurantCtrl.getPriceAndMenu = async(req, res) => {
    const priceAndMenu = await PriceAndMenu.find();
    // res.set('Cache-Control', 'no-store');
    res.json(priceAndMenu);
}

pricesAndRestaurantCtrl.createPriceAndMenu = async(req, res) => {
    const newPriceAndMenu = new PriceAndMenu(req.body);
    await newPriceAndMenu.save()
    res.json({ message: 'Price and menu created', success: true });
}

pricesAndRestaurantCtrl.getTicketPriceGeneral = async(req, res) => {
    const priceAndMenu = await PriceAndMenu.find();
    const ticketPrice = priceAndMenu[0].ticketPriceGeneral;
    res.json({ ticketPriceGeneral: ticketPrice });
}

pricesAndRestaurantCtrl.getTicketPriceDiscount = async(req, res) => {
    const priceAndMenu = await PriceAndMenu.find();
    const ticketPriceDiscount = priceAndMenu[0].ticketPriceDiscount;
    res.json({ ticketPriceDiscount: ticketPriceDiscount });
}

pricesAndRestaurantCtrl.getUrlMenu = async(req, res) => {
    const priceAndMenu = await PriceAndMenu.find();
    const urlMenu = priceAndMenu[0].urlMenu;
    res.json({ urlMenu: urlMenu });
}

pricesAndRestaurantCtrl.updateTicketPriceGeneral = async(req, res) => {
    const newPrice = await PriceAndMenu.findOneAndUpdate({ 'ticketPriceGeneral': req.body.ticketPriceGeneral }, { 'ticketPriceGeneral': req.body.newPrice });
    console.log(req.body);
    console.log(newPrice);
    res.json('price general updated succesfully');
}

pricesAndRestaurantCtrl.updateTicketPriceDiscount = async(req, res) => {
    await PriceAndMenu.findOneAndUpdate({ 'ticketPriceDiscount': req.body.ticketPriceDiscount }, { 'ticketPriceDiscount': req.body.newPrice });
    res.json('price discount updated succesfully');
}

pricesAndRestaurantCtrl.updateUrlMenu = async(req, res) => {
    const response = await PriceAndMenu.findOneAndUpdate({ 'urlMenu': req.body.urlMenu }, { 'urlMenu': req.body.newUrlMenu });
    res.json("url menu updated succesfully");
}

module.exports = pricesAndRestaurantCtrl;