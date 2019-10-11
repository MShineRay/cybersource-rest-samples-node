'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);
var readline = require('readline-sync');

function createPaymentInstrumentTokenizedCard(callback, profileid) {
	try {
		var configObject = new configuration();
		var requestObj = new cybersourceRestApi.CreatePaymentInstrumentRequest();

		var card = new cybersourceRestApi.TmsV1InstrumentIdentifiersPaymentInstrumentsGet200ResponseEmbeddedCard();
		card.expirationMonth = '09';
		card.expirationYear = '2017';
		card.type = 'visa';
		card.issueNumber = '01';
		card.startMonth = '01';
		card.startYear = '2016';
		requestObj.card = card;

		var buyerInformation = new cybersourceRestApi.TmsV1InstrumentIdentifiersPaymentInstrumentsGet200ResponseEmbeddedBuyerInformation();
		buyerInformation.companyTaxID = '12345';
		buyerInformation.currency = 'USD';
		requestObj.buyerInformation = buyerInformation;

		var billTo = new cybersourceRestApi.TmsV1InstrumentIdentifiersPaymentInstrumentsGet200ResponseEmbeddedBillTo();
		billTo.firstName = 'John';
		billTo.lastName = 'Smith';
		billTo.company = 'Cybersource';
		billTo.address1 = '8310 Capital of Texas Highwas North';
		billTo.address2 = 'Bluffstone Drive';
		billTo.locality = 'Austin';
		billTo.administrativeArea = 'TX';
		billTo.postalCode = '78731';
		billTo.country = 'US';
		billTo.email = 'john.smith@test.com';
		billTo.phoneNumber = '+44 2890447951';
		requestObj.billTo = billTo;

		var processingInformation = new cybersourceRestApi.TmsV1InstrumentIdentifiersPaymentInstrumentsGet200ResponseEmbeddedProcessingInformation();
		processingInformation.billPaymentProgramEnabled = true;
		requestObj.processingInformation = processingInformation;

		var instrumentIdentifier = new cybersourceRestApi.TmsV1InstrumentIdentifiersPaymentInstrumentsGet200ResponseEmbeddedInstrumentIdentifier();
		var instrumentIdentifierCard = new cybersourceRestApi.TmsV1InstrumentIdentifiersPost200ResponseCard();
		instrumentIdentifierCard.number = '411111111111112';
		instrumentIdentifier.card = instrumentIdentifierCard;

		requestObj.instrumentIdentifier = instrumentIdentifier;


		var instance = new cybersourceRestApi.PaymentInstrumentApi(configObject);

		instance.createPaymentInstrument( profileid, requestObj, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
			}

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Create a Payment Instrument : ' + JSON.stringify(response['status']));
			callback(error, data, response);
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
}
if (require.main === module) {	
		var profileid = readline.question("\nEnter missing header parameter <profile-id>: ");
		createPaymentInstrumentTokenizedCard(function () {
		console.log('\nCreatePaymentInstrument end.');
	},profileid);
}
module.exports.createPaymentInstrumentTokenizedCard = createPaymentInstrumentTokenizedCard;
