import { parse } from 'csv-parse/sync';
import { promises as fs } from 'fs';

const content = await fs.readFile('src/content/data.csv');
// console.log(content)

const records = parse(content, {
  delimiter: ',',
  columns: true,
  skip_empty_lines: true
  // encoding: 'utf8'
});

records.forEach(record => {
  console.log(Object.keys(record))
  const title = record['Unterschritt = Titel']
  const fileContent = `---
id: ${parseInt(record['ID'])}
title: "${title}"
phase: "${record['Phase']}"
step: "${record['Schritt']}"
pubDate: 2023-11-24
locale: de
tags: ${JSON.stringify(record['Tags '].split(',').map(tag => tag.trim()))}
links: ${JSON.stringify(record['Verlinkung zu anderen Texten (Listen Titel)'].split(',').map(links => parseInt(links.trim())))}
type: article
---

${record['Text']}
`;

fs.writeFile(`src/content/articles/${title.toLowerCase().replace(/\W/g, '')}.de.md`, fileContent)

});
