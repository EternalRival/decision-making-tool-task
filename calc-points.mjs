import { readFileSync } from 'node:fs';
import { EOL } from 'node:os';
import { resolve } from 'node:path';

const xCheckHeading = '## Functional Requirements';
const fileName = 'README.md';

function getFileContent(fileName) {
  return readFileSync(resolve(fileName), { encoding: 'utf8' });
}

function getSectionContent({ content, sectionName, sectionChar }) {
  let headingChars = sectionName.match(new RegExp(`${sectionChar}+`, 'gm'));

  if (!headingChars) {
    throw new Error('Section chars not found');
  }

  [headingChars] = headingChars;

  let startIndex = content.indexOf(`${EOL}${sectionName}`);

  if (startIndex < 0) {
    throw new Error('Section not found');
  }

  startIndex += 1;

  const startIndexWithOffset = startIndex + sectionName.length + 1;

  let endIndex = content.indexOf(`${EOL}${headingChars} `, startIndexWithOffset);

  if (endIndex < 0) {
    endIndex = content.indexOf(`${EOL}${sectionChar}`, startIndexWithOffset);
  }

  return content.slice(startIndex, endIndex);
}

function getSectionPoints({ sectionContent, pointsPattern }) {
  const pointsMatches = sectionContent.matchAll(pointsPattern);
  let points = 0;

  for (const match of pointsMatches) {
    points += Number(match[1]);
  }

  return points;
}

const functionalPoints = getSectionPoints({
  sectionContent: getSectionContent({
    content: getFileContent(fileName),
    sectionChar: '#',
    sectionName: xCheckHeading,
  }),
  pointsPattern: /^\d+\. \(\+(\d+)\) /gm,
});

console.log(functionalPoints);
