'use client'
import * as XLSX from 'xlsx';
import { Button } from '@/components/ui/button';
//import { join } from 'path';
//import { cwd } from 'process';

export default function ExportXls() { return ( 
    <>
    <div className="px-6 py-4">
<Button className="px-6 py-4" onClick={async () => {
    /* fetch JSON data and parse */
    //const url = "http://localhost:3000/api/tampil/route";
    const url ="./api/tampil/route"
    const raw_data = await (await fetch(url)).json();
  
    /* filter for the Presidents */
    //const prez = raw_data.filter(row => row.terms.some(term => term.type === "prez"));
  
    /* sort by first presidential term 
    prez.forEach(row => row.start = row.terms.find(term => term.type === "prez").start);
    prez.sort((l,r) => l.start.localeCompare(r.start));
  */
    /* flatten objects */
    //di excell juga bisa datatype nya diubah menjadi custom hh:mm utk manipulasi waktu string
    const rows = raw_data.map(row => ({
      EmployeId: row.EmployeId,
      FullName: row.FullName,
      JenisKehadiran: row.JenisKehadiran,
      AreaDesc: row.AreaDesc,
      OfficeDesc: row.OfficeDesc,
      Date: row.Date,
      ClockIn: row.ClockIn,
      ClockOut: row.ClockOut,
      Break: "1:00",
      Working: Number((row.ClockOut).substring(0,2))-Number((row.ClockIn).substring(0,2)),//+":"+(Number((row.ClockOut).substring(3))-Number((row.ClockIn).substring(3))),
      StanTime: "8:00",
      OverTime: (Number((row.ClockOut).substring(0,2))-Number((row.ClockIn).substring(0,2))-8)<0 ? 0 : (Number((row.ClockOut).substring(0,2))-Number((row.ClockIn).substring(0,2))-8),
      StatusHadir: row.ClockIn ? "Hadir" : "Tidak Hadir",
      StatusTelat: Number((row.ClockIn).substring(0,2))>=8 && (row.ClockIn).substring(3)>0 ? "Terlambat":"Tepat Waktu",
      StatPulang: Number((row.ClockOut).substring(0,2))>=17 ? "Tepat Waktu":"Pulang Cepat",
      DurasiTelat: Number((row.ClockIn).substring(0,2))>=8 && (row.ClockIn).substring(3)>0 ? ((Number((row.ClockIn).substring(0,2))-8)+":"+(row.ClockIn).substring(3)) : "",
      Lokasi: row.Lokasi,
    }));

    /* generate worksheet and workbook */
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");
  
    /* fix headers */
    XLSX.utils.sheet_add_aoa(worksheet, [["Employed ID", "Full Name     ", "Jenis Kehadiran", "Employee Area Description ", "Employee Office Description", "Date  ", "Start Time", "End Time", "Break Time", "Working Hour", "Standart Time","Overtime","Status Kehadiran", "Status Keterlambatan", "Status Pulang", "Durasi Keterlambatan", "Lokasi     "]], { origin: "A1" });
  
    /* calculate column width */
   // const max_width = rows.reduce((w, r) => Math.max(w, r.employeId.length), 10);
   // worksheet["!cols"] = [ { wch: max_width } ];
  
    /* create an XLSX file and try to save to Presidents.xlsx */
    XLSX.writeFile(workbook, "TimeAttendance.xlsx", { compression: true });
  }}><b>Export Attendance</b></Button> 
  </div>
  </>
); }