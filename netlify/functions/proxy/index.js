const https = require("https");
const http = require("http");

exports.handler = async (event, context) => {
  try {
    const url = event.queryStringParameters.url;
    if (!url) {
      return {
        statusCode: 400,
        body: "Missing URL parameter",
      };
    }

    // Define custom agent options to relax SSL certificate verification
    const agentOptions = {
      rejectUnauthorized: false, // Set to false to accept self-signed or expired certificates
    };

    // Use the custom agent options when making the request
    const agent = new https.Agent(agentOptions);

    // Construct the request options
    const requestOptions = {
      agent, // Use the custom agent
      method: "GET",
      headers: {
        // Add any necessary headers here
      },
    };

    // Make the request
    const request = https.get(url, requestOptions, (response) => {
      let data = "";

      response.on("data", (chunk) => {
        data += chunk;
      });

      response.on("end", () => {
        console.log(data); // The response data
      });
    });

    request.on("error", (error) => {
      console.error(error);
    });

    return {
      statusCode: 200,
      body: "Request sent",
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
