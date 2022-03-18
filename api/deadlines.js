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
      {
        property: 'Priority',
        direction: 'descending'
      }
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


async function getDropDates(req, res) {
  const databaseId = '62cd65d85420445d97bbce65ad697679';
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      "and": [
        {
            "property": "Drop Date UTC",
            "date": {
                is_not_empty: true
            }
        },
        {
            "property": "Drop Date UTC",
            "date": {
                next_week: {}
            }
        },
      ]
    },
    sorts: [
      {
        property: 'Drop Date UTC',
        direction: 'ascending',
      },
    ],
  });

    const dropDates = response.results.map((obj) => {
      const drop_date = obj.properties['Drop Date UTC'].date.start
      const project_string = obj.properties['Project'].title.reduce((prev, curr) => {
          return prev + curr.plain_text
      }, "")

      // console.log(action_item_string)
      return { project: project_string, drop_date: drop_date }
    })

    res.json(dropDates)

};

module.exports.getDeadlines = getDeadlines
module.exports.getDropDates = getDropDates
