import db from "@/app/lib/db";
import { attendanceTable, userTable } from "@/app/lib/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export const GET = async (request: NextRequest) => {
    //const data1 = await db.select().from(attendanceTable);
    //console.log ("data:", data1);
    return NextResponse.json(
       // message: "GET request succensfull",
        //data: data1,
      //data1
      //versi ini sudah sampai buat API Endpoint Drizzle ORM yg menquery lebih dari 1 table dan sudah bisa export xls
      //ini bisa dipakai utk 1 table saja : await db.select().from(attendanceTable)
      await db.select({
        EmployeId: attendanceTable.employeId,
        FullName: userTable.fullName,
        JenisKehadiran: attendanceTable.jenisKehadiran,
        AreaDesc: userTable.homebase,
        OfficeDesc: userTable.office,
        Date: attendanceTable.tanggal,
        ClockIn: attendanceTable.startTime,
        ClockOut: attendanceTable.endTime,
        Lokasi: attendanceTable.lokasi
      }).from(attendanceTable).leftJoin(userTable, eq(attendanceTable.employeId, userTable.id))
);
};