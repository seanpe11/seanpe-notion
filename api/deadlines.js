const { Client } = require('@notionhq/client');
const { parse } = require('dotenv');
const { parseNotionText, plainNotionTextJson } = require("./util.js") 
require('dotenv').config({ path: require('find-config')('.env') })

const notion = new Client({ auth: process.env.NOTION_API_KEY });

async function getDeadlines(req, res) {
  const databaseId = 'aa868e17670f4177a931bcba8ad03a20';
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      "and": [
        {
            "property": "Deadline",
            "date": {
                is_not_empty: true
            }
        },
        {
            "property": "Done",
            "checkbox": {
                equals: false
            }
        }
      ]
    },
    sorts: [
      {
        property: 'Deadline',
        direction: 'ascending',
      },
    ],
  });

    const deadlines = response.results.map((obj) => {
        const deadline = obj.properties.Deadline.date.start
        const action_item_string = obj.properties['Action Item'].title.reduce((prev, curr) => {
            return prev + curr.plain_text
        }, "")
        let name = "none"
        
        if (obj.properties["Priority"].select){
          name = obj.properties["Priority"].select.name
        }
  
        // console.log(action_item_string)
        return { action_item: action_item_string, deadline: deadline, priority: name }
    })

    res.json(deadlines)

};

module.exports.getDeadlines = getDeadlines