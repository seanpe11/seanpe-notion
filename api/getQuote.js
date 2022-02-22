const { Client } = require('@notionhq/client');
const { parse } = require('dotenv');
const { parseNotionText, plainNotionTextJson } = require("./util.js") 
require('dotenv').config({ path: require('find-config')('.env') })

const notion = new Client({ auth: process.env.NOTION_API_KEY });

function randInt(max) {
    return Math.floor(Math.random() * max)
}

async function getRandomQuote(req, res) {
    const pageId = '5d43fa370eb24a89bbba1da3c192c49d';
    let results = []
    let response = await notion.blocks.children.list({
        block_id: pageId,
        page_size: 100,
    });
    results = results.concat(response.results)
    while(response.has_more)
    {
        response = await notion.blocks.children.list({
            block_id: pageId,
            page_size: 100,
            start_cursor: response.next_cursor
        });
        results = results.concat(response.results)
    }
    results.filter(block => block.type === "paragraph")
    const block_id = results[randInt(results.length)].id
    

    const block = await notion.blocks.retrieve({
        block_id: block_id
    })
    
    if (block.type == "paragraph"){
        // console.log(parseNotionText(block.paragraph.text))
        if(req.query.json){
            res.send(plainNotionTextJson(block.paragraph.text))
        } else{
            res.send(parseNotionText(block.paragraph.text))
        }
    }
    
}

// getQuote()

module.exports.getRandomQuote = getRandomQuote


