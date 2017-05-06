import fs from 'fs';
import path from 'path';

export default function (dir, cb) {
  fs.readdir(dir, (err, files) => {
    files
      .map(file => {
        const extension = file.split('.').pop();
        return { file, extension };
      })
      .filter(({ extension }) => extension === 'in')
      .forEach(({ file }) => {
        const filePath = path.join(dir, file);
        fs.readFile(filePath, (err, buff) => {
          const str = buff.toString();

          const result = cb(str);

          fs.writeFile(filePath.replace('.in', '.out'), result, (err) => {
            if (!err) {
              console.log(`${file} solved`);
            }
          });
        })
      })
  })
}
