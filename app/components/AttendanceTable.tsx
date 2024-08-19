'use client'

import React, { useState} from "react";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";
import { attendanceTable } from "../lib/db/schema";
import { AttProps, createbulkAttendance, deleteAttendance } from "../actions/auth_actions";

export default function AttendanceTable({attendances}:{attendances:attendanceTable}) {
    //file
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [jsonData, setJsonData] = useState("");
    console.log(file);
    // json stringified (purpose of previewing)
    function previewData() {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target?.result;
                if (data) {
                    const workbook = XLSX.read(data, { type: "binary"});
                    const sheetName = workbook.SheetNames[0];
                    const workSheet = workbook.Sheets[sheetName];
                    const json = XLSX.utils.sheet_to_json(workSheet)
                    setJsonData(JSON.stringify(json, null, 2))
                    
                }
            }
            reader.readAsBinaryString(file)
        }
    }

    function importData() {
        if (file) {
            setLoading(true);
            const reader = new FileReader();
            reader.onload = async(e) => {
                const data = e.target?.result;
                if (data) {
                    const workbook = XLSX.read(data, { type: "binary"});
                    const sheetName = workbook.SheetNames[0];
                    const workSheet = workbook.Sheets[sheetName];
                    const json: AttProps[] = XLSX.utils.sheet_to_json(workSheet)
                    try { 
                        await createbulkAttendance(json)
                        setLoading(false)
                    } catch (error) {
                      console.log(error)  
                    }
                }
            }
            reader.readAsBinaryString(file)
        }
    }

    async function deleteData() {
        try {
            await deleteAttendance()
        } catch (error) {
            console.log(error)
        }
    }

    return (
       <div className="py-8">
         <div className="flex items-center gap-8">      
            <div className="">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload file</label>
            <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" accept=".xls,.xlsx" onChange={(e)=>setFile(e.target.files?e.target.files[0]:null)} />
            </div>
            <Button className="bg-slate-500" onClick={previewData} >Preview Data</Button>
            <Button className="bg-red-400" onClick={importData}>Import Data</Button>
            <Button className="bg-blue-600" onClick={deleteData}>Delete Data</Button>
        </div>
        <pre>{jsonData}</pre>
        {
            loading?(
                <p>Saving data, please wait..</p>
            ):(
                <div className="relative overflow-x-auto py-8">
    {attendances&&attendances.length>0 &&
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Employe Id
                </th>
                <th scope="col" className="px-6 py-3">
                    Jenis Kehadiran
                </th>
                <th scope="col" className="px-6 py-3">
                    Tanggal
                </th>
                <th scope="col" className="px-6 py-3">
                    Start Time
                </th>
                <th scope="col" className="px-6 py-3">
                    End Time
                </th>
                <th scope="col" className="px-6 py-3">
                    Lokasi
                </th>
            </tr>
        </thead>
        <tbody>
            {attendances.map((attendance)=>{
                return(
                    <tr key={attendance.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {attendance.employeId}
                </th>
                <td className="px-6 py-4">
                {attendance.jenisKehadiran}
                </td>
                <td className="px-6 py-4">
                {attendance.tanggal}
                </td>
                <td className="px-6 py-4">
                {attendance.startTime}
                </td>
                <td className="px-6 py-4">
                {attendance.endTime}
                </td>
                <td className="px-6 py-4">
                {attendance.lokasi}
                </td>
            </tr>
          
                )
            })}
    
        </tbody>
    </table>}
</div>
            )
        }

       </div>
    );
};