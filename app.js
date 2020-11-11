/**
 * Copyright 2017-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Messenger Platform Quick Start Tutorial
 *
 * This is the completed code for the Messenger Platform quick start tutorial
 *
 * https://developers.facebook.com/docs/messenger-platform/getting-started/quick-start/
 *
 * To run this code, you must do the following:
 *
 * 1. Deploy this code to a server running Node.js
 * 2. Run `npm install`
 * 3. Update the VERIFY_TOKEN
 * 4. Add your PAGE_ACCESS_TOKEN to your environment vars
 *
 */

'use strict';
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
// Imports dependencies and set up http server
const 
  request = require('request'), 
  express = require('express'),
  body_parser = require('body-parser'),
  app = express().use(body_parser.json()); // creates express http server

  app.get('/', function(req, res){
      res.send('<h1> So what are you doing here? and how did you get here? </h1>')
  })

// Sets server port and logs message on success
app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));

// Accepts POST requests at /webhook endpoint
app.post('/webhook', (req, res) => {  

  // Parse the request body from the POST
  let body = req.body;

  // Check the webhook event is from a Page subscription
  if (body.object === 'page') {

    body.entry.forEach(function(entry) {

      // Gets the body of the webhook event
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);


      // Get the sender PSID
      let sender_psid = webhook_event.sender.id;
      console.log('Sender ID: ' + sender_psid);

      // Check if the event is a message or postback and
      // pass the event to the appropriate handler function
      if (webhook_event.message) {
        handleMessage(sender_psid, webhook_event.message);        
      } else if (webhook_event.postback) {  
        handlePostback(sender_psid, webhook_event.postback);
      }
      
    });
    // Return a '200 OK' response to all events
    res.status(200).send('EVENT_RECEIVED');

  } else {
    // Return a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }

});

// Accepts GET requests at the /webhook endpoint
app.get('/webhook', (req, res) => {
  
  /** UPDATE YOUR VERIFY TOKEN **/
  const VERIFY_TOKEN = "messengerbot69^(";
  
  // Parse params from the webhook verification request
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];
    
  // Check if a token and mode were sent
  if (mode && token) {
  
    // Check the mode and token sent are correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      
      // Respond with 200 OK and challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);      
    }
  }
});

function handleMessage(sender_psid, received_message) {
  let response;
  // Checks if the message contains text

if (received_message.text == `Home`){
    // Create the payload for a basic text message, which
    // will be added to the body of our request to the Send API
  response = {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"generic",
        "elements":[
           {
            "title":"Welcome to SLOMO",
            "image_url":"https://scontent-hkt1-1.xx.fbcdn.net/v/t1.0-9/104289057_170515287790568_551123041044339932_o.jpg?_nc_cat=109&_nc_sid=8bfeb9&_nc_ohc=AGPWLgwFdx8AX-cwPEi&_nc_ht=scontent-hkt1-1.xx&oh=b4d2a3da3e1acc4faddbb6d01a86b023&oe=5FAA7408",
            "subtitle":"Geen Illusion - TEE",
            "default_action": {
              "type": "web_url",
              "url": "https://www.facebook.com/slomo.present",
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"postback",
                "title":"Talk to one of us",
                "payload":"normal_chat"
              },{
                "type":"postback",
                "title":"Check out our products",
                "payload":"check_product"
              },{
                "type":"postback",
                "title":"Order our product",
                "payload":"order_product"
              },            
            ]      
          }
        ]
      }
    }
  }
  }
  ////////////////////////////////////////////////////////////////////////////////
  else if (received_message.text == `Order now`){
    
  }
  else if (received_message.text == `get started`){
    response = {
      "attachment":{
        "type":"template",
        "payload":{
          "template_type":"button",
          "text":"Hello dear customer!, what lanuage do you want to use? \nសួស្តី​​! សូមស្វាគមន៍, តើអ្នកចង់ប្រើភាសាមួយ​ណា?",
          "buttons":[
            {
              "type": "postback",
              "title": "English",
              "payload": "eng",
            },
            {
              "type": "postback",
              "title": "ខ្មែរ",
              "payload": "kh",
            },
          ]
        }
      }
    }
  }

  else if (received_message.text == `Tee M`){
    response = {
      "attachment":{
        "type":"template",
        "payload":{
          "template_type":"button",
          "text":"Order Confromation:\nItem: Earthly-Fiction - TEE\nPhase 4,Collection 2\nSize: M\nQuantity: 1\nItem pirce: 17.99$\nDilivery pirce: to be determined",
          "buttons":[
            {
              "type": "postback",
              "title": "Confirm order",
              "payload": "confrirm_order",
            },
            {
              "type": "postback",
              "title": "No, change item",
              "payload": "check_product",
            },
          ]
        }
      }      
    }
  }
  else if (received_message.text == `Tee L`){
    response = {
      "attachment":{
        "type":"template",
        "payload":{
          "template_type":"button",
          "text":"Order Confromation:\nItem: Earthly-Fiction - TEE\nPhase 4,Collection 2\nSize: L\nQuantity: 1\nItem pirce: 17.99$\nDilivery pirce: to be determined",
          "buttons":[
            {
              "type": "postback",
              "title": "Confirm order",
              "payload": "confrirm_order",
            },
            {
              "type": "postback",
              "title": "No, change item",
              "payload": "check_product",
            },
          ]
        }
      }      
    }
  }
  else if (received_message.text == `Hoodie M`){
    response = {
      "attachment":{
        "type":"template",
        "payload":{
          "template_type":"button",
          "text":"Order Confromation:\nItem:Outer_Space - Hoodie\nPhase4 Collection2\nSize: M\nQuantity: 1\nItem pirce: 24.99$\nDilivery pirce: to be determined",
          "buttons":[
            {
              "type": "postback",
              "title": "Confirm order",
              "payload": "confrirm_order",
            },
            {
              "type": "postback",
              "title": "No, change item",
              "payload": "check_product",
            },
          ]
        }
      }      
    }
  }
  else if (received_message.text == `Hoodie L`){
    response = {
      "attachment":{
        "type":"template",
        "payload":{
          "template_type":"button",
          "text":"Order Confromation:\nItem:Outer_Space - Hoodie\nPhase4 Collection2\nSize: L\nQuantity: 1\nItem pirce: 24.99$\nDilivery pirce: to be determined",
          "buttons":[
            {
              "type": "postback",
              "title": "Confirm order",
              "payload": "confrirm_order",
            },
            {
              "type": "postback",
              "title": "No, change item",
              "payload": "check_product",
            },
          ]
        }
      }      
    }
  }
  
  // Send the response message
  callSendAPI(sender_psid, response);    
}

function handlePostback(sender_psid, received_postback) {
  console.log('ok')
   let response;
  // Get the payload for the postback
  let payload = received_postback.payload;

  // Set the response based on the postback payload
  if (payload === `normal_chat`){
    response = {
      'text' : "Send us your question and a human will reply to you as soon as possible.\nType \"Home\" to get back to the menu.",
    }
  }

  //show all product
  if (payload === `check_product`){
    response = {
      "attachment":{
        "type":"template",
        "payload":{
          "template_type":"generic",
          "elements":[
            
            //tshirt 
            {
              "title":"EARTHLY_FICTION - TEE / P4,CL2",
              "image_url":"https://cdn.discordapp.com/attachments/629306436563894273/771600428911558676/photo_2020-10-30_11-51-33.jpg",
              "subtitle":"Price 17.99$\nSize: M, L",
              "default_action": {
                "type": "web_url",
                "url": "https://www.facebook.com/slomo.present",
                "webview_height_ratio": "tall",
              },
              "buttons":[
                {
                  "type":"postback",
                  "title":"Order now",
                  "payload":"order_now_tee"
                },{
                  "type":"postback",
                  "title":"Sizes Details",
                  "payload":"size_tee"
                },{
                  "type":"postback",
                  "title":"Product Details",
                  "payload":"viewdetail_tee"
                },            
              ]      
            },
            
            //Hoodie
            {
              "title":"OUTER_SPACE - HOODIE / P4,CL2",
              "image_url":"https://cdn.discordapp.com/attachments/629306436563894273/771600444387622912/photo_2020-10-30_11-51-25.jpg",
              "subtitle":"Price 24.99$\nSize: M, L",
              "default_action": {
                "type": "web_url",
                "url": "https://www.facebook.com/slomo.present",
                "webview_height_ratio": "tall",
              },
              "buttons":[
                {
                  "type":"postback",
                  "title":"Order now",
                  "payload":"order_now_hoodie"
                },{
                  "type":"postback",
                  "title":"Sizes Details",
                  "payload":"size_hoodie"
                },{
                  "type":"postback",
                  "title":"Product Details",
                  "payload":"viewdetail_hoodie"
                },            
              ]      
            }
          ]
        }
      }
    }
  }

  //Tshirt response to button
  if (payload ===  `order_now_tee`){
    response = {
      "text": "Pick the size you want:\n*note you can order only 1 item at a time with the bot",
      "quick_replies":[
      {
        "content_type":"text",
        "title":"Tee M",
        "payload":"order_tee_M",
        "image_url":"https://www.iconsdb.com/icons/preview/red/circle-xxl.png"
      },{
        "content_type":"text",
        "title":"Tee L",
        "payload":"order_tee_L",
        "image_url":"https://www.iconsdb.com/icons/preview/blue/circle-xxl.png"
      }
    ]
    }
  }
  if (payload === `size_tee`){
    response = {
      'attachment':{
        'type': 'image',
          'payload': {
            'url': 'https://images.squarespace-cdn.com/content/v1/54fb4d7ce4b0cfdf3acad1a8/1558810195242-FJOU6U05YDAR0W39AJOT/ke17ZwdGBToddI8pDm48kOM0wi0zWgY49OChaGdbQod7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1Udq808UFTE3RUCYZpscC1JaI0xjbDb9OOCsv-L8MD1ND_7k-9-XsFQ9lvpTgv0wwCA/Tshirt+Size+chart.jpg?format=1000w',
          }
      }
    }
  }
  if (payload === `viewdetail_tee`){
    response = {
      'text' : "Material: ...\n...\n...",
    }
  }

  //Hoodie response to button
  else if (payload ===  `order_now_hoodie`){
    response = {
      "text": "Pick the size you want:\n*note you can order only 1 item at a time with the bot",
      "quick_replies":[
      {
        "content_type":"text",
        "title":"Hoodie M",
        "payload":"order_hoodie_M",
        "image_url":"https://www.iconsdb.com/icons/preview/red/circle-xxl.png"
      },{
        "content_type":"text",
        "title":"Hoodie L",
        "payload":"order_hoodie_L",
        "image_url":"https://www.iconsdb.com/icons/preview/blue/circle-xxl.png"
      }
    ]
    }
  }
  else if (payload === `viewdetail_hoodie`){
    response = {
      'text' : "Material: ...\n...\n...",
    }
  }
  else if (payload === `size_hoodie`){
    response = {
      'attachment':{
        'type': 'image',
          'payload': {
            'url': 'https://images.squarespace-cdn.com/content/v1/54fb4d7ce4b0cfdf3acad1a8/1558810195242-FJOU6U05YDAR0W39AJOT/ke17ZwdGBToddI8pDm48kOM0wi0zWgY49OChaGdbQod7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1Udq808UFTE3RUCYZpscC1JaI0xjbDb9OOCsv-L8MD1ND_7k-9-XsFQ9lvpTgv0wwCA/Tshirt+Size+chart.jpg?format=1000w',
          }
      }
    }
  }

  if (payload === `order_product`){
      response = {
        "text": "Pick an item you would like to order:",
        "quick_replies":[
        {
          "content_type":"text",
          "title":"Tee M",
          "payload":"<POSTBACK_PAYLOAD>",
          "image_url":"https://www.iconsdb.com/icons/preview/red/circle-xxl.png"
        },{
          "content_type":"text",
          "title":"Tee L",
          "payload":"<POSTBACK_PAYLOAD>",
          "image_url":"https://www.iconsdb.com/icons/preview/blue/circle-xxl.png"
        },{
          "content_type":"text",
          "title":"Hoodie M",
          "payload":"<POSTBACK_PAYLOAD>",
          "image_url":"https://www.iconsdb.com/icons/preview/blue/circle-xxl.png"
        },{
          "content_type":"text",
          "title":"Hoodie L",
          "payload":"<POSTBACK_PAYLOAD>",
          "image_url":"https://www.iconsdb.com/icons/preview/blue/circle-xxl.png"
        }
      ]
    }
  }

  if(payload === `confrirm_order`){
    response = {
      'text': "Please send us your \n- Phone number for contact \n- Delivery location \nto finish this process.\nWe will contact you back when your item is ready.\n\nThank for shopping with us. SLOMO"
    }
  }
  // Send the message to acknowledge the postback
  callSendAPI(sender_psid,response);
}


function callSendAPI(sender_psid, response) {
  // Construct the message body
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response,
  }

  // Send the HTTP request to the Messenger Platform
  request({
    "uri": "https://graph.facebook.com/v2.6/me/messages",
    "qs": { "access_token": PAGE_ACCESS_TOKEN },
    "method": "POST",
    "json": request_body
  }, (err, res, body) => {
    if (!err) {
      console.log('message sent!')
    } else {
      console.error("Unable to send message:" + err);
    }
  }); 
}