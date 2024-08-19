//import Image from "next/image";
import { validateRequest } from "./lib/auth";
import { redirect } from "next/navigation";
import { signOut } from "./actions/auth_actions";
import { Button } from "@/components/ui/button"
import { ambilNama } from "./actions/auth_actions";
import { rekapNormal, rekapCuti, rekapDinas, rekapIzin, rekapSakit, rekapVisit } from "./actions/auth_actions";
//import { count } from "console";
//import { string } from "zod";


export default async function Home() {
  const { user } = await validateRequest()
  const id = user?.id || ""
 // const id2 = "nyzp0hlx2ka20v7"
  const nama = await ambilNama(id)
  const rekapnormal = await rekapNormal(id)
  const rekapcuti = await rekapCuti(id)
  const rekapdinas = await rekapDinas(id)
  const rekapizin = await rekapIzin(id)
  const rekapsakit = await rekapSakit(id)
  const rekapvisit = await rekapVisit(id)

  if (!user) {
    return redirect("/sign-in")
  }
//<p>{JSON.stringify(user)}</p>
//<p>Protected route</p>
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="bg-blue-200 text-center text-sm items-center justify-between gap-2 border rounded-[8px] p-2">
      <div className="bg-blue-200">
      <p className="font-semibold">PT. Arita Prima Indonesia Tbk</p><br/>
      </div>
      <div className="bg-blue-200 text-sm">
      <p className="text-sm">Hi, {nama}</p>
      <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col bg-blue-500 text-center text-sm text-yellow-200 items-center justify-center gap-2 border rounded-[8px] p-2">
      <a href="/attendan">
                <img src="/iconattok.jpg" className="mr-4 h-11 items-center justify-center" />Attendance
            </a>
      </div>
        <div className="flex flex-col bg-blue-500 text-center text-sm text-yellow-200 items-center justify-center gap-2 border rounded-[8px] p-2">
        <a href="#" >
                <img src="/iconattendanceok.jpg" className="mr-4 h-11 items-center justify-center" />User Info !
            </a>
        </div>
      </div>
      </div>
      </div>
      <div className="px-10 py-1"></div>
      <div className="text-sm bg-blue-100 px-10 py-1 gap-2 border rounded-[8px] p-2">
        <div><br/>
      <p className="px-2 font-semibold">Kehadiran </p>
      <p className="px-2">Masuk Normal : {rekapnormal?.map((reka)=>reka.count)}<br/>
      Dinas Luar : {rekapdinas?.map((reka)=>reka.count)}<br/>
      Visit :{rekapvisit?.map((reka)=>reka.count)}</p><br/>
      <p className="px-2 font-semibold">Absent</p>
      <p className="px-2">Izin : {rekapizin?.map((reka)=>reka.count)}<br/>
      Cuti : {rekapcuti?.map((reka)=>reka.count)}<br/>
      Sakit :{rekapsakit?.map((reka)=>reka.count)}</p><br/>
      <form action={signOut}>
        <Button type="submit" className="w-full">Sign Out</Button>
      </form><br/>
        </div>
      </div>
    </main>
  );
}
