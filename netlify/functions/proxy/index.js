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
      httpsAgent: false, // Set this to false to bypass SSL verification (not recommended for production)
      // Alternatively, you can provide a custom certificate authority (CA) bundle:
      // ca: fs.readFileSync('path/to/custom-ca.crt'),
    });

    const response = await axiosInstance.get(url);

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
