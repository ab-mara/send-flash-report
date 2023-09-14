const Parser = require("rss-parser");
const parser = new Parser();

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

    const feed = await parser.parseURL(feedUrl);
    const jsonFeed = {
      items: feed.items.map((item) => ({
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
      })),
    };

    return {
      statusCode: 200,
      body: JSON.stringify(jsonFeed),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch or parse RSS feed" }),
    };
  }
};
