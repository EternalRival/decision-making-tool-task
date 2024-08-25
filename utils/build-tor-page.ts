import mds from 'markdown-styles';
import { copyFileSync, mkdirSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';

const sourceFilePath = resolve('README.md');
const tempDirPath = resolve(`dist/tor/source-${Date.now()}`);
const tempFilePath = resolve(tempDirPath, 'index.md');
const torPageDirPath = resolve('dist/tor');

const consoleMute = {
  log: console.log,
  enable(): void {
    console.log = (): void => void 0;
  },
  disable(): void {
    console.log = this.log;
  },
};

mkdirSync(tempDirPath, { recursive: true });
copyFileSync(sourceFilePath, tempFilePath);

consoleMute.enable();

mds.render(
  mds.resolveArgs({
    input: tempDirPath,
    output: torPageDirPath,
    layout: 'mixu-bootstrap-2col',
  }),
  () => {
    rmSync(tempDirPath, { recursive: true, force: true });
    consoleMute.disable();
    console.log('ToR page builded!');
  }
);
