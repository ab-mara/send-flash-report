const xml2js = require("xml2js");

console.log("Loading function");

exports.handler = async (event, context) => {
  try {
    const { queryStringParameters } = event;
    const { feedUrl } = queryStringParameters;

    if (!feedUrl) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing feedUrl parameter" }),
      };
    }

    // Fetch the RSS feed XML
    const response = await fetch(feedUrl);
    const xml = await response.text();

    // Parse the XML to JSON
    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(xml);

    // Convert the parsed data to the desired JSON format
    const jsonFeed = {
      items: result.rss.channel[0].item.map((item) => ({
        title: item.title[0],
        link: item.link[0],
        pubDate: item.pubDate[0],
      })),
    };

    return {
      statusCode: 200,
      body: JSON.stringify(jsonFeed),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch or parse RSS feed" }),
    };
  }
};
