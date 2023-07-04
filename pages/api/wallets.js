// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as fs from "fs";
import * as path from "path";

export default function handler(req, res) {
  const jsonDirectory = "./public/Whitelist"

  const allJSONs = fs.readdirSync(jsonDirectory).filter(file => path.extname(file) === '.json');

  const finalArray = [];

  allJSONs.forEach(file => {
    const fileData = fs.readFileSync(path.join(jsonDirectory, file));
    const json = JSON.parse(fileData);
    finalArray.push(...json);
  })

  res.status(200).json(finalArray);
}
