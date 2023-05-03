const axios = require("axios");
const { XMLParser, XMLBuilder, XMLValidator } = require("fast-xml-parser");

module.exports = async (url) => {
  if (!url) {
    url = "https://lifehacker.com/rss";
  }

  let items;

  try {
    const response = await axios.get("https://lifehacker.com/rss");
    const parser = new XMLParser();
    items = parser.parse(response.data).rss.channel.item;
  } catch (err) {
    console.log(err);
  }

  const xmlItems = items.map((item) => {
    const builder = new XMLBuilder();
    return builder.build(item);
  });

  console.log(items);
};
