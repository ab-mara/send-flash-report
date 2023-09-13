const axios = require("axios");

exports.handler = async (event, context) => {
  try {
    const url = event.queryStringParameters.url;
    if (!url) {
      return {
        statusCode: 400,
        body: "Missing URL parameter",
      };
    }

    // Configure Axios to trust the certificate (example)
    const axiosInstance = axios.create({
      httpsAgent: false,
    });

    const response = await axiosInstance.get(url, {
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    });

    return {
      statusCode: response.status,
      body: JSON.stringify(response.data),
      headers: {
        "Content-Type": "application/json",
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
};
