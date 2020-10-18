const {readFile}  = require('fs').promises;
const {promisify} = require('util');
const parse       = promisify(require('csv-parse'));
import * as firebase from 'firebase/app'
import 'firebase/firestore'

if (process.argv.length < 3) {
    console.error('Please include a path to a csv file');
    process.exit(1);
}


const db = new firebase.firestore();

function writeToFirestore(records) {
    const batchCommits = [];
    let batch = db.batch();
    records.forEach((record, i) => {
        const docRef = db.collection('jobs').doc(record.SUBDIVISION);
        batch.set(docRef, record);
        if ((i + 1) % 500 === 0) {
            console.log(`Writing record ${i + 1}`);
            batchCommits.push(batch.commit());
            batch = db.batch();
        }
    });
    batchCommits.push(batch.commit());
    return Promise.all(batchCommits);
}

async function importCsv(csvFileName) {
    const fileContents = await readFile(csvFileName, 'utf8');
    const records = await parse(fileContents, { columns: true });
    try {
        await writeToFirestore(records);
    }
    catch (e) {
        console.error(e);
        process.exit(1);
    }
    console.log(`Wrote ${records.length} records`);
}

importCsv(process.argv[2]).catch(e => console.error(e));