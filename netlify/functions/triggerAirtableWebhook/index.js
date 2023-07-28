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
        body: JSON.stringify({ message: "Webhook triggered successfully." }),
      };
    } else {
      return {
        statusCode: response.status,
        body: JSON.stringify({ message: "Failed to trigger webhook." }),
      };
    }
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error." }),
    };
  }
};
