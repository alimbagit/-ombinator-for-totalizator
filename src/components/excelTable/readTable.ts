

import xlsx from 'xlsx';

export const ReadTable = (filename: string, sheetname: string) => {
    let workbook= xlsx.readFile(filename);
    console.log(workbook);

}