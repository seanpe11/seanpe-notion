const { Client } = require('@notionhq/client');
require('dotenv').config({ path: require('find-config')('.env') })

const notion = new Client({ auth: process.env.NOTION_API_KEY })

async function getTodayTasks(){
    const databaseId = 'aa868e17670f4177a931bcba8ad03a20';

    const today = new Date()
    today.setHours(today.getHours() + 24)
    const response = await notion.databases.query({
        database_id: databaseId,
        filter: {
            "and": [
                {
                    "property": "Done",
                    "checkbox": {
                        "equals": false
                    }
                },
                {
                    "property": "Do Date",
                    "date": {
                        "on_or_before": today.toISOString()
                    }
                }
            ]
        }
    })
    const pomodoroTasks = response.results.map(actionItem => {
        return {
            title: actionItem.properties['Action Item'].title[0].plain_text,
            story_points: actionItem.properties['Story Points'].number,
            est_pomo: actionItem.properties['Est. Pomos'].number,
            url: actionItem.url,
        }
    })
    console.log(pomodoroTasks)
}

module.exports.getTodayTasks = getTodayTasks
// module.exports.loadPomodoro()