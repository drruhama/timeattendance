'use client'
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { AttendSchema } from "../types"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
 // FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { absentklr, absentmsk } from "../actions/auth_actions"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { ScrollArea } from "@/components/ui/scroll-area";
//import { userTable } from "../lib/db/schema";
//import { FileVideo2Icon } from "lucide-react";


export function AttendForm ({userId}:{userId:string}) { 
  const router = useRouter()
  // 1. Define your form.
const form = useForm<z.infer<typeof AttendSchema>>({
  resolver: zodResolver(AttendSchema),
  defaultValues: {
    employeID: "",
    jenisKehadiran: "Normal",
    startTime: "",
    endTime: "",
    lokasi: ""
  },
});

const pasangNilaidef = () => {
  form.setValue("employeID", "" );
  form.setValue("lokasi", "");
  form.setValue("tanggal", "");
  form.setValue("startTime", "");
  form.setValue("endTime", "")
 };

// 2. Define a submit handler.
async function onSubmit(values: z.infer<typeof AttendSchema>) {
  // Do something with the form values.
  // ✅ This will be type-safe and validated.
  //console.log(values)
  if (!form.getValues("endTime")) {
  const res = await absentmsk(values)
  if(res.error) {
      toast({
          variant: 'destructive',
          description: res.error
      })
  } else if (res.success) {
      toast({
          variant: "default",
          description: "Clock In Sukses"
      });
     // form.setValue("endTime", clocked)

      //router.push("/")
      // atau : redirect("/")
  }
} else {
 // console.log(form.getValues("endTime"))
  const res = await absentklr(values)
  if(res.error) {
      toast({
          variant: 'destructive',
          description: res.error
      })
  } else if (res.success) {
      toast({
          variant: "default",
          description: "Clock Out Sukses"
      });
      pasangNilaidef(); 
      //router.push("/")
      // atau : redirect("/")
  }
}
}

  const [latitude, setLatitude] = useState()
  const [longitude, setLongitude] = useState()
  const [userAddress, setUserAddress] = useState('')
  
 // const lokasiku = `https://maps.google.com/maps?q=${latitude},${longitude}&amp;z=15&amp;output=embed`
  const lokasiku2= `https://maps.geoapify.com/v1/staticmap?style=osm-bright-grey&width=250&height=250&center=lonlat:${longitude},${latitude}&zoom=14.8713&marker=lonlat:${longitude},${latitude};type:material;color:%231f63e6;size:x-large;icon:cloud;icontype:awesome;text:1;whitecircle:no&apiKey=11ab9969387c4312918d3ce957cb1111`
  const geo = navigator.geolocation
 // Get User Current Location
 geo.getCurrentPosition(userCoords)
 
 function userCoords(position: any) {
  let useLatitude = position.coords.latitude
  let useLongitude = position.coords.longitude 
  console.log("latitude:",useLatitude);
  console.log("longitude:",useLongitude);
  setLatitude(useLatitude)
  setLongitude(useLongitude)
 }

 const [clockin, setClockin] = useState("")
 const [clockout, setClockout] = useState("")

 
 const pasangNilai = () => {
  form.setValue("employeID", userId );
  form.setValue("lokasi", userAddress);
  form.setValue("tanggal", today);
  form.setValue("startTime", clocked);
  setClockin(clocked)
 }

 
 const pasangNilai2 = () => {
  form.setValue("endTime", clocked)
  setClockout(clocked)
 }



  const getUserAddress = async () => {
    //--ok-- let url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}%2C${longitude}&key=328604e1affa4ad58cd9e2ec281f6f57`
    //let url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
    let url = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&type=street&lang=en&limit=4&format=json&apiKey=3f5606f69afd4ece82e44c88e808b06e`
    //let url = `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=6694a80e5fdc3757051953bgpd0053e`
    //let url = `https://api.distancematrix.ai/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=x2mJwKSCtnnXtwejBVBYfNEo6HSYkicSSUfsMZSCa9zXe9DGljGuzp9eJp31Qyn3`
    
    const loc = await fetch(url)
    const data = await loc.json()
    console.log("User Address :", data); 
    setUserAddress(data.results[0].formatted)
  }
  
  
  const handleGetUserAddress = () =>{
     getUserAddress()
     
  }
 

  //munculin waktu
  const tgl = new Date();
  const jam = tgl.getHours().toString().padStart(2,'0');
  const mnt = tgl.getMinutes().toString().padStart(2,'0');
 //const dtk = tgl.getSeconds().toString().padStart(2,'0');
  const clocked = `${jam}:${mnt}`
 //akhir munculin waktu
 //munculin tanggal
 const hari = ["minggu","senin", "selasa", "rabu", "kamis", "jumat", "sabtu"];
 const bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
 const gethari = tgl.getDay();
 const tang = tgl.getDate().toString().padStart(2,'0');
 const tambln = (tgl.getMonth())+1
 const bln = tambln.toString().padStart(2,'0');
 const thn = tgl.getFullYear().toString().padStart(4,'0');
 const today = `${bln}/${tang}/${thn}`;
 const tamptgl = [hari[gethari],', ',tang,' ', bulan[tgl.getMonth()],' ', thn]
 //const userId = user?.id || ""
 //akhir munculin tanggal
 
    return (
   
      <>
        
         {/*<h1>Current Location</h1>
       <h2>latitude- {latitude}</h2>
        <h2>longitude- {longitude}</h2>
           
        */}
        
        <div>
          <iframe width ="250" height="250" src= { lokasiku2 }></iframe>
       </div>
       <div>
       <Button className=" hover:bg-green-600 bg-slate-500 w-full" onClick={handleGetUserAddress}>Location</Button></div><br/><div> 
       <Button className="w-full" onClick={pasangNilai}>Clock In</Button></div><br/><div>
       <Button className="w-full" onClick={pasangNilai2}>Clock Out</Button>
       </div><div>
       <Form {...form}>
       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 bg-blue-300">
       <FormField
      control={form.control}
      name="employeID"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input type="hidden" placeholder="Employe ID" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="jenisKehadiran"
      render={({ field }) => (
        <FormItem>
          
          <Select name="kehadiran" onValueChange={field.onChange}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Normal"/>
            </SelectTrigger>
          </FormControl>
          <SelectContent>
          <ScrollArea className="h-[130px] w-[250px] rounded-md border p-4">
            <SelectItem value="Dinas luar">Dinas Luar</SelectItem>
            <SelectItem value="Normal">Normal</SelectItem>
            <SelectItem value="Visit">Visit</SelectItem>
            <SelectItem value="Izin">Izin</SelectItem>
            <SelectItem value="Cuti">Cuti</SelectItem>
            <SelectItem value="Sakit">Sakit</SelectItem>
          </ScrollArea>  
          </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>        
      )}
    /> 
    <FormField
      control={form.control}
      name="lokasi"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input type="hidden" placeholder="" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="tanggal"
      render={({ field }) => (
        <FormItem>
          
          <FormControl>
            <Input type="hidden" placeholder="" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="startTime"
      render={({ field }) => (
        <FormItem>
         
          <FormControl>
            <Input type="hidden" placeholder="" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="endTime"
      render={({ field }) => (
        <FormItem>
         
          <FormControl>
            <Input type="hidden" placeholder="" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <h2 className="text-center text-sm">Location : {userAddress}</h2>
    <p className="text-sm">Clock In : {clockin}</p>
    <p className="text-sm">Clock Out : {clockout}</p>
    <Button type="submit" className="w-full">Submit</Button>
     </form>
     </Form>  
     </div>
      </>
      
          

    );
}

