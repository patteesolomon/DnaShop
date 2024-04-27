// sandbox uri
import React, { useState, useMemo } from 'react';
const uri = 'EAAAl6OlvqSGmKDLEKEi-b6AbvpioukjAOej3ttoxXyF7BdzPPFSwQzfxRsx7H2z';

// messy useMemo stuffsfor the api
const { Client, Environment, ApiError } = require("square");

// api
let [sourceId, SetSourceId] = useState("");
let [idEmp, setIdEmp] = useState("");
let [apa, setAPA] = useState(false);
let [money, setMoney] = useState(0);
let [currency, setCurrency] = useState("");
let [app, setAppFeeMoney] = useState(0);
let [appCType, setAppFCurrency] = useState("");
let [autoComplete, setAutoC] = useState(false);

let [billingAdd, setBillingAdd] = useState({});
let [addLine1, setAddLine1] = useState('');
let [addLine2, setAddLine2] = useState('');
let [addLine3, setAddLine3] = useState('');
let [adminDL, setAdminDL] = useState('');
let [adminDL2, setAdminDL2] = useState('');
let [adminDL3, setAdminDL3] = useState('');
let [country, setCountry] = useState('');
let [fname, setFname] = useState('');
let [lname, setLname] = useState('');
let [locality, SetLocality] = useState('');

/**
 * postalCode string 
 * sublocality string
 * sublocality2 string
 * sublocality3 string
 * 
 */

/**
 * --{cash_details}--
 * buyer_supplied_money
 * change_back_money
 * 
 * customer_Details
 * customer_id
 * delay_action
 * delay_duration
 * 
 * --{External_Details}--
 * source
 * type
 * source_Id
 * ---{Source_Fee_Money}---
 * amount
 * currency
 * 
 * location_Id string
 * note string
 * order_id string
 * reference_id string
 * --{shipping_Address}--
 * addLine1 string
 * addLine2 string
 * addLine3 string
 * Admin DL1 string
 * Admin DL2 string
 * Admin DL3 string
 * coutry string
 * 
 */

// user login info

let [usern, setName] = useState("");
let [pass, setPass] = useState("");
let [add, setAdd] = useState("");
let [n, d] = useState("");
let [statementDescriptionModifier, setSDM] = useState("");
let [teamMID, SetTMID] = useState("");

let [tipM, setTipM] = useState(0);

let [veriF, setVerif] = useState("");

const client = new Client({
    bearerAuthCredentials: {
      accessToken: process.env.SQUARE_ACCESS_TOKEN
    },
  environment: Environment.Sandbox,
});

const { locationsApi } = client;

type Props = {}

async function getLocations() {
  try {
    let listLocationsResponse = await locationsApi.listLocations();

    let locations = listLocationsResponse.result.locations;

    locations.forEach(function (location: { id: string; name: string; address: { addressLine1: string; locality: string; }; }) {
      console.log(
        location.id + ": " +
          location.name +", " +
          location.address.addressLine1 + ", " +
          location.address.locality
      );
    });
  } catch (error : any) {
    if (error instanceof ApiError) {
      error.result.errors.forEach(function (e:any) {
        console.log(e.category);
        console.log(e.code);
        console.log(e.detail);
      });
    } else {
      console.log("Unexpected error occurred: ", error);
    }
  }
};

getLocations();

const SquareApi = async (props: Props) => {

  const reqSend = async () => {
      try {
          const response = await client.paymentsApi.createPayment({
              sourceId: 'cnon:card-nonce-ok',
              idempotencyKey: '818af249-5754-4031-a77e-bda7597894d6',
              amountMoney: {
              amount: 100,
              currency: 'USD'
              },
              tipMoney: {},
              appFeeMoney: {},
              billingAddress: {},
              shippingAddress: {},
              cashDetails: {
              buyerSuppliedMoney: {}
              },
              externalDetails: {
              type: null,
              source: null,
              sourceFeeMoney: {}
              }
          });

      console.log(response.result);
      } catch(error) {
      console.log(error);
      }
  }

  const createCheckout = async () => {
      try {
        const response = await client.checkoutApi.createCheckout(null,
        {
          idempotencyKey: null,
          order: {}
        });

        console.log(response.result);
      } catch(error) {
        console.log(error);
      }
  }
  
}

export default SquareApi