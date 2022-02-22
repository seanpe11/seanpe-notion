const { Client } = require('@notionhq/client');
const { Pomodoro, setPomodoros,  }  = require('./firebase-db/pomodoro')
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
            priority: actionItem.properties['Priority'].select.name,
            url: actionItem.url,
        }
    })
    return pomodoroTasks
}

function pomodoroDate(){
    
}

async function initPomodoro(req, res){
    const tasks = await getTodayTasks()
    tasks.forEach(task => {
        task.completed = 0
        task.running = false
        task.created_at = new Date()
    })
    // send to firebase

    console.log(tasks)


    // res.send.status(200)
}
initPomodoro()

module.exports.getTodayTasks = getTodayTasks
module.exports.initPomodoro = initPomodoro