
//import { useForm } from "react-hook-form"

//import { useRouter } from "next/navigation"
//import { FileVideo2Icon } from "lucide-react";

//import Image from "next/image";
//<p>Protected route</p>
//<p>{JSON.stringify(user)}</p>
//<p>{user.id}</p>
//  {today}<br/>
import { ambilNama } from "../actions/auth_actions";
import { validateRequest } from "../lib/auth";
import { redirect } from "next/navigation";
import { signOut } from "../actions/auth_actions";
import { Button } from "@/components/ui/button"
import { AttendForm } from "../components/AttendForm";
import Clock from "../components/liveclock";

export default async function Attendance() {
  const { user } = await validateRequest()

  //munculin waktu
 const tgl = new Date();
 const jam = tgl.getHours().toString().padStart(2,'0');
 const mnt = tgl.getMinutes().toString().padStart(2,'0');
//const dtk = tgl.getSeconds().toString().padStart(2,'0');
 const clocked = `${jam}:${mnt}` //tgl.getTime()
//akhir munculin waktu
//munculin tanggal
const hari = ["Minggu","Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
const gethari = tgl.getDay();
const tang = tgl.getDate().toString().padStart(2,'0');
const tambln = (tgl.getMonth())+1
const bln = tambln.toString().padStart(2,'0');
const thn = tgl.getFullYear().toString().padStart(4,'0');
//const today = `${bln}/${tang}/${thn}`;
const tamptgl = [hari[gethari],', ',tang,' ', bulan[tgl.getMonth()],' ', thn]
const userId = user?.id || ""
//akhir munculin tanggal

const id = user?.id || ""
const nama = await ambilNama(id)

  if (!user) {
    return redirect("/sign-in")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-blue-300">
      <div className="flex flex-col">
        <div>
        <p className="font-semibold text-sm text-center">Hi, {nama}</p><br/>
        </div>
        <div className="text-sm text-center bg-blue-200 gap-2 border rounded-[8px] p-2">
        {tamptgl}
        <Clock />
       </div><br/>
        <div className="bg-blue-200 gap-2 border rounded-[8px] p-2" >
        <AttendForm userId={userId}/>     
        </div><br/>
        <div>
      <form action={signOut}>
        <Button type="submit" className="w-full text-sm">Sign Out</Button>
      </form>
        </div><br/>
        <a href="/">
            <Button className="w-full">Kembali</Button>
        </a>
      </div>  
    </main>
  );

}


