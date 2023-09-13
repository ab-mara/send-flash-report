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

    https
      .get(url, (response) => {
        let data = "";

        response.on("data", (chunk) => {
          data += chunk;
        });

        response.on("end", () => {
          console.log(data); // The response data
        });
      })
      .on("error", (error) => {
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
