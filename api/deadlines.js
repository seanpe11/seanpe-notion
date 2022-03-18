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

<<<<<<< HEAD

async function getDropDates(req, res) {
  const databaseId = '62cd65d85420445d97bbce65ad697679';
=======
async function getNFTDropTimes(){
  const databaseId = 'aa868e17670f4177a931bcba8ad03a20';
>>>>>>> 8ed4821912c17889918bf03780222716e61a80e8
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      "and": [
        {
<<<<<<< HEAD
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
=======
            "property": "Deadline",
            "date": {
                is_not_empty: true
            },
        },
        {
            "property": "Done",
            "checkbox": {
                equals: false
            },
        },
        {
          "property": "Priority",
          "select": {
            equals: "NFT"
          },
>>>>>>> 8ed4821912c17889918bf03780222716e61a80e8
        },
      ]
    },
    sorts: [
      {
<<<<<<< HEAD
        property: 'Drop Date UTC',
=======
        property: 'Deadline',
>>>>>>> 8ed4821912c17889918bf03780222716e61a80e8
        direction: 'ascending',
      },
    ],
  });

<<<<<<< HEAD
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
=======
  const nftDropTimes = response.results.map((result) => {
    const deadline = obj.properties.Deadline.date.start
    const action_item_string = obj.properties['Action Item'].title.reduce((prev, curr) => {
      return prev + curr.plain_text
    }, "")
    return { deadline: deadline, project: action_item_string }
  })

  res.json(nftDropTimes)
}

module.exports.getDeadlines = getDeadlines
module.exports.getNFTDropTimes = getNFTDropTimes
>>>>>>> 8ed4821912c17889918bf03780222716e61a80e8
