'use client'
import * as XLSX from 'xlsx';
//import { join } from 'path';
//import { cwd } from 'process';

export default function Presidents() { return ( 
    <>
<button onClick={async () => {
    /* fetch JSON data and parse */
    const url = "http://localhost:3000/api/tampil/route";
    const raw_data = await (await fetch(url)).json();
  
    /* filter for the Presidents */
    //const prez = raw_data.filter(row => row.terms.some(term => term.type === "prez"));
  
    /* sort by first presidential term 
    prez.forEach(row => row.start = row.terms.find(term => term.type === "prez").start);
    prez.sort((l,r) => l.start.localeCompare(r.start));
  */
    /* flatten objects */
    const rows = raw_data.map(row => ({
      EmployeId: row.employeId,
      JenisKehadiran: row.jenisKehadiran
    }));
  
    /* generate worksheet and workbook */
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Dates");
  
    /* fix headers */
    XLSX.utils.sheet_add_aoa(worksheet, [["employeId", "jenisKehadiran"]], { origin: "A1" });
  
    /* calculate column width */
   // const max_width = rows.reduce((w, r) => Math.max(w, r.employeId.length), 10);
   // worksheet["!cols"] = [ { wch: max_width } ];
  
    /* create an XLSX file and try to save to Presidents.xlsx */
    XLSX.writeFile(workbook, "Presidents.xlsx", { compression: true });
  }}><b>Click to Generate file!</b></button> 
  </>
); }