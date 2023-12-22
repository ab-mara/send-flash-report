const axios = require("axios");

exports.handler = async (event) => {
  try {
    const { recordID } = event.queryStringParameters;

    if (!recordID) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing "recordID" parameter.' }),
      };
    }

    const data = {
      recordID: recordID,
    };

    const airtableWebhookURL = process.env.AT_WEBHOOK_URL_FLASH;

    const response = await axios.post(airtableWebhookURL, data);

    if (response.status === 200) {
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*", // Replace * with your Softr app's domain if possible
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS", // Add the allowed HTTP methods used by your Softr app
        },
        body: JSON.stringify({
          message: "Flash Report triggered successfully.",
        }),
      };
    } else {
      return {
        statusCode: response.status,
        headers: {
          "Access-Control-Allow-Origin": "*", // Replace * with your Softr app's domain if possible
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS", // Add the allowed HTTP methods used by your Softr app
        },
        body: JSON.stringify({ message: "Failed to trigger webhook." }),
      };
    }
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*", // Replace * with your Softr app's domain if possible
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS", // Add the allowed HTTP methods used by your Softr app
      },
      body: JSON.stringify({ message: "Internal server error." }),
    };
  }
};
