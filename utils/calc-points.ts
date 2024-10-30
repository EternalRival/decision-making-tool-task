import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const EOL = '\n';

const xCheckHeading = '## Functional Requirements';
const torFileName = 'README.md';

function getFileContent(fileName: string): string {
  return readFileSync(resolve(fileName), { encoding: 'utf8' });
}

function getSectionContent({
  content,
  sectionName,
  sectionChar,
}: {
  content: string;
  sectionName: string;
  sectionChar: string;
}): string {
  let headingChars = sectionName.match(new RegExp(`${sectionChar}+`, 'gm'))?.[0];

  if (!headingChars) {
    throw new Error('Section chars not found');
  }

  let startIndex = content.indexOf(`${EOL}${sectionName}`);

  if (startIndex < 0) {
    throw new Error(`Section \`${sectionName}\` not found`);
  }

  startIndex += 1;

  const startIndexWithOffset = content.indexOf(EOL, startIndex) + 1;

  let endIndex: number;

  do {
    endIndex = content.indexOf(`${EOL}${headingChars} `, startIndexWithOffset);
    headingChars = headingChars.slice(0, -1);
  } while (endIndex < 0);

  return content.slice(startIndex, endIndex);
}

function getSectionPoints({
  sectionContent,
  pointsPattern,
}: {
  sectionContent: string;
  pointsPattern: RegExp;
}): number {
  const pointsMatches = sectionContent.matchAll(pointsPattern);

  return Array.from(pointsMatches).reduce((acc, [, linePoints]) => acc + Number(linePoints), 0);
}

const sectionChar = '#';
const pointsPattern = /^\d+\. \(\+(\d+)\) /gm;
const fileContent = getFileContent(torFileName).replace(/\r\n/g, '\n');

const functionalPoints = getSectionPoints({
  sectionContent: getSectionContent({
    content: fileContent,
    sectionChar,
    sectionName: xCheckHeading,
  }),
  pointsPattern,
});

const listOfLotsPoints = getSectionPoints({
  sectionContent: getSectionContent({
    content: fileContent,
    sectionChar,
    sectionName: '### List of lots',
  }),
  pointsPattern,
});

const wofModalPoints = getSectionPoints({
  sectionContent: getSectionContent({
    content: fileContent,
    sectionChar,
    sectionName: '### WoF Modal',
  }),
  pointsPattern,
});

const technicalPoints = getSectionPoints({
  sectionContent: getSectionContent({
    content: fileContent,
    sectionChar,
    sectionName: '## Technical Requirements',
  }),
  pointsPattern,
});
const configsPoints = getSectionPoints({
  sectionContent: getSectionContent({
    content: fileContent,
    sectionChar,
    sectionName: '### Code Formatting and Linting',
  }),
  pointsPattern,
});
const codeQualityPoints = getSectionPoints({
  sectionContent: getSectionContent({
    content: fileContent,
    sectionChar,
    sectionName: '### Code Quality',
  }),
  pointsPattern,
});

console.table({
  'Functional Requirements': functionalPoints,
  '  List of lots': listOfLotsPoints,
  '  WoF Modal': wofModalPoints,

  'Technical Requirements': technicalPoints,
  '  Code Formatting and Linting': configsPoints,
  '  Code Quality': codeQualityPoints,
});
