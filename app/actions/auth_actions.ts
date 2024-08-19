"use server"
import { z } from "zod"
import { AttendSchema, SignInSchema, SignUpSchema } from "../types"
import { Argon2id } from "oslo/password"
import { generateId } from "lucia"
import db from "../lib/db"
import { attendanceTable, userTable } from "../lib/db/schema"
import { lucia, validateRequest } from "../lib/auth"
import { cookies } from "next/headers"
import { and, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { count } from "drizzle-orm"
import { table } from "console"
import { PgTable } from "drizzle-orm/pg-core"
//import { error } from "console"
export type AttProps = {
    "Employed ID": string,
    "Jenis Kehadiran": string,
    "Date": string,
    "Start Time": string,
    "End Time": string,
    "Lokasi": string
}

export const signUp = async (values: z.infer<typeof SignUpSchema>) => {
    console.log(values)
    const hashedPassword = await new Argon2id().hash(values.password)
    const userId = generateId(15) //jadi setelah password dienkripsi buat id panjangnya 15 karakter dan kirimkan ke variabel userId
    try {
        await db.insert(userTable).values({
            id: userId,
            username: values.username,
            hashedPassword,
            fullName: values.fullname,
            homebase: values.homebase,
            office: values.office,
            keterangan: values.confirmPassword
        }).returning({
            id: userTable.id,
            username: userTable.username,
            fullName: userTable.fullName,
            homebase: userTable.homebase,
            office: userTable.office
        })

        const session = await lucia.createSession(userId, {
            expiresIn: 60 * 60 * 24 * 30 //session yg dibuat akan expires dalam 60 detik 60 menit 24 jam 30 hari
        })

        const sessionCookie = lucia.createSessionCookie(session.id)

        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

        return {
            success: true,
            data: {
                userId,
            },
        }
    } catch (error: any) {
        return {
            error: error?.message,
        }
    }
}

export const signIn = async (values: z.infer<typeof SignInSchema>) => {
  const existingUser = await db.query.userTable.findFirst({
        where: (table) => eq(table.username, values.username),
    })
    if (!existingUser) {
        return {
            error: "User not found"
        }         
    }
    if (!existingUser.hashedPassword) {
        return {
            error: "Please input your Password"
        }
    }
    const isValidPassword = await new Argon2id().verify(existingUser.hashedPassword,values.password)
    if (!isValidPassword) {
        return {
            error: "Incorrect username or password"
        }
    }
    const session = await lucia.createSession(existingUser.id, {
        expiresIn: 60 * 60 * 24 * 38,
    })
    const sessionCookie = lucia.createSessionCookie(session.id)
    cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
    )

    return {
        success: "Logged in successfully",
    }
}

export const signOut = async () => {
    try {
        const { session } = await validateRequest()
        if (!session) {
            return {
                error: "Unauthorized",
            }
        }
        await lucia.invalidateSession(session.id)
        const sessionCookie = lucia.createBlankSessionCookie()
        cookies().set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes
        )
    } catch (error: any) {
        return {
            error: error?.message
        }        
    }
}

export const absentmsk = async (values: z.infer<typeof AttendSchema>) => {
    const idAbs = generateId(15); 
   // console.log(values)
   // const hashedPassword = await new Argon2id().hash(values.password)
   // const userId = generateId(15) //jadi setelah password dienkripsi buat id panjangnya 15 karakter dan kirimkan ke variabel userId
    try {
        await db.insert(attendanceTable).values({
            id: idAbs,
            employeId: values.employeID,
            jenisKehadiran: values.jenisKehadiran,
            tanggal: values.tanggal,
            startTime: values.startTime,
            lokasi: values.lokasi,
         // endTime: values.endTime
        }).returning({
            employeId: attendanceTable.employeId,
            jenisKehadiran: attendanceTable.jenisKehadiran,
            tanggal: attendanceTable.tanggal,
            startTime: attendanceTable.startTime,
            lokasi: attendanceTable.lokasi
        })

        return {
            success: true,
            data: {
               idAbs,
            },
        }
            
    } catch (error: any) {
        return {
            error: error?.message,
        }
    }
}

export const absentklr = async (values: z.infer<typeof AttendSchema>) => {
    try {
        await db.update(attendanceTable)
          .set({ endTime: values.endTime })  // Fields to update
          .where(and
            (
              eq(attendanceTable.employeId, values.employeID),       // Condition 1: id equals 1
              eq(attendanceTable.tanggal, values.tanggal) // Condition 2: name equals 'John'
            )
          )
         // .execute();
        console.log('Update successful!');
        return {
            success: true,
            //data: {
            //   idAbs,
            //},
        }
      } catch (error: any) {
        return {
            error: error?.message,
        }
    }
  }

  export async function getAttendance() {
    try {
        const attendances = await db.query.attendanceTable.findMany();
        return attendances;
    } catch (error) {
        console.log(error);
    }
  }

  export async function createAttendance(data: AttProps) {
    const idAbs = generateId(15); 
    try {
       await db.insert(attendanceTable).values({
        id: idAbs,
       // employeId: "nyzp0hlx2ka20v7"
       employeId: data["Employed ID"],
       jenisKehadiran: data["Jenis Kehadiran"],
       tanggal:   data["Date"],
       startTime: data["Start Time"],
       endTime: data["End Time"],
       lokasi: data["Lokasi"]
       // startTime: data["Start Time"],
       //. endTime: data["End Time"],
      //  lokasi: data["Lokasi"]
     // data yg diimport bisa juga utk sebagian table saja asal mandartory field wajib terisi
     // lokasi: values.lokasi,
     // endTime: values.endTime
    }).returning();
    revalidatePath("/importxls")  
    } catch (error) {
        console.log(error)
    }
  }

  export async function createbulkAttendance(attendances: AttProps[]) {
    try {
        for (const attendance of attendances) {
          // console.log ("dah ok ya")
           // console.log(attendance)
            await createAttendance(attendance)
        }
    } catch (error) {
        console.log(error);
    }
  }

  export async function deleteAttendance() {
    try {
        await db.delete(attendanceTable).returning();
        revalidatePath("/importxls");  
        } catch (error) {
        console.log(error);
    }
}

export async function ambilNama(id: string) {
    try {
        //const x = await db.select({FullName: userTable.fullName}).from(userTable).where(eq(userTable.id,id));
        const x = await db.query.userTable.findFirst({
            where: (table) => eq(table.id, id) ,
        })
        return x?.fullName
        } catch (error) {
        console.log(error);
    }
}

export async function rekapNormal(id: string) {
    try {
        return await db.select({ count: count(attendanceTable.employeId)}).from(attendanceTable).where(and(eq(attendanceTable.employeId,id),eq(attendanceTable.jenisKehadiran,"Normal")));
         // return db.select({ count: count(attendanceTable.employeId)}).from(attendanceTable).where(and(eq(attendanceTable.employeId,id),eq(attendanceTable.jenisKehadiran,"Normal")));    
       // type Result = {
       //     count: number;
       //   }[];
        //  return x
        } catch (error) {
        console.log(error);
    }
}

export async function rekapSakit(id: string) {
    try {
        return await db.select({ count: count(attendanceTable.employeId)}).from(attendanceTable).where(and(eq(attendanceTable.employeId,id),eq(attendanceTable.jenisKehadiran,"Sakit")));
        } catch (error) {
        console.log(error);
    }
}

export async function rekapDinas(id: string) {
    try {
        return await db.select({ count: count(attendanceTable.employeId)}).from(attendanceTable).where(and(eq(attendanceTable.employeId,id),eq(attendanceTable.jenisKehadiran,"Dinas Luar")));
        } catch (error) {
        console.log(error);
    }
}
     
export async function rekapIzin(id: string) {
    try {
        return await db.select({ count: count(attendanceTable.employeId)}).from(attendanceTable).where(and(eq(attendanceTable.employeId,id),eq(attendanceTable.jenisKehadiran,"Izin")));
        } catch (error) {
        console.log(error);
    }
}
     
export async function rekapCuti(id: string) {
    try {
        return await db.select({ count: count(attendanceTable.employeId)}).from(attendanceTable).where(and(eq(attendanceTable.employeId,id),eq(attendanceTable.jenisKehadiran,"Cuti")));
        } catch (error) {
        console.log(error);
    }
}
     
export async function rekapVisit(id: string) {
    try {
        return await db.select({ count: count(attendanceTable.employeId)}).from(attendanceTable).where(and(eq(attendanceTable.employeId,id),eq(attendanceTable.jenisKehadiran,"Visit")));
        } catch (error) {
        console.log(error);
    }
}
     