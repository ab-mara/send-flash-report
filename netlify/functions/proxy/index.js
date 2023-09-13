const https = require("https");

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

    // Make the request using await
    const response = await new Promise((resolve, reject) => {
      const request = https.get(url, requestOptions, (response) => {
        let data = "";

        response.on("data", (chunk) => {
          data += chunk;
        });

        response.on("end", () => {
          resolve(response);
        });
      });

      request.on("error", (error) => {
        reject(error);
      });
    });

    // Read the response data
    let data = "";
    response.on("data", (chunk) => {
      data += chunk;
    });

    // Wait for the response to end
    await new Promise((resolve) => {
      response.on("end", resolve);
    });

    // Return the API response data in the proxy function's response
    return {
      statusCode: 200,
      body: JSON.stringify(data), // Assuming response data is JSON
      headers: {
        "Content-Type": "application/json",
      },
    };
  } catch (error) {
    console.error(error);

    // Handle errors and return an appropriate response
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
};
