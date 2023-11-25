import { parse } from 'csv-parse/sync';
import { promises as fs } from 'fs';

const content = await fs.readFile('src/content/data.csv');
console.log(content)

const records = parse(content, {
  delimiter: ',',
  columns: true,
  skip_empty_lines: true
  // encoding: 'utf8'
});

records.forEach(record => {
  const title = record['Unterschritt = Titel']
  const fileContent = `---
title: "${title}"
phase: "${record['Phase']}"
step: "${record['Schritt']}"
pubDate: 2023-11-24
locale: de
tags: [${record['Tags ']}]
links: []
type: article
---

${record['Text']}
`;

fs.writeFile(`src/content/articles/${title.toLowerCase().replace(/\W/g, '')}.de.md`, fileContent)

});
