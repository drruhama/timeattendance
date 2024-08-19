"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { SignUpSchema } from "../types"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { signUp } from "../actions/auth_actions"
import { toast } from "@/components/ui/use-toast"
import { redirect, useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


//import { redirect } from "next/navigation"

export function SignUpForm() {
  const router = useRouter()
    // 1. Define your form.
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
      fullname: ""
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignUpSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    //console.log(values)
    const res = await signUp(values)
    if(res.error) {
        toast({
            variant: 'destructive',
            description: res.error
        })
    } else if (res.success) {
        toast({
            variant: "default",
            description: "Account created successfully"
        })

        //router.push("/")
        // atau : redirect("/")
    }
  }
    return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 bg-blue-300">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input placeholder="retype password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="homebase"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Homebase</FormLabel>
                  <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih area kerja"/>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                  <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
                    <SelectItem value="Cabang (AIRA)">Cabang (AIRA)</SelectItem>
                    <SelectItem value="Cabang (API)">Cabang (API)</SelectItem>
                    <SelectItem value="Cabang (IAPI)">Cabang (IAPSI)</SelectItem>
                    <SelectItem value="Cabang (Sangkuriang)">Cabang (Sangkuriang)</SelectItem>
                    <SelectItem value="Head Office (AIRA)">Cabang (API)</SelectItem>
                    <SelectItem value="Head Office (AMN)">Head Office (AMN)</SelectItem>
                    <SelectItem value="Head Office (AMP)">Head Office (AMP)</SelectItem>
                    <SelectItem value="Head Office (ANS)">Head Office (ANS)</SelectItem>
                    <SelectItem value="Head Office (API)">Head Office (API)</SelectItem>
                    <SelectItem value="Head Office (BONT)">Head Office (BONT)</SelectItem>
                    <SelectItem value="Head Office (GCE)">Head Office (GCE)</SelectItem>
                    <SelectItem value="Head Office (GTA)">Head Office (GTA)</SelectItem>
                    <SelectItem value="Head Office (IAPS)">Head Office (IAPS)</SelectItem>
                    <SelectItem value="Head Office (IAPSI)">Head Office (IAPSI)</SelectItem>
                    <SelectItem value="Head Office (ISM)">Head Office (ISM)</SelectItem>
                    <SelectItem value="Head Office (MAV)">Head Office (MAV)</SelectItem>
                    <SelectItem value="HO Sangkuriang">HO Sangkuriang</SelectItem>
                    <SelectItem value="Head Office (SPI)">Head Office (SPI)</SelectItem>
                    <SelectItem value="Head Office (GRT)">Head Office (GRT)</SelectItem>
                    <SelectItem value="Head Office (WTP)">Head Office (WTP)</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                    </ScrollArea>
                  </SelectContent>   
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
           <FormField
              control={form.control}
              name="office"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Office</FormLabel>
                  <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih area kantor"/>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                  <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
                    <SelectItem value="Accounting">Accounting</SelectItem>
                    <SelectItem value="Admin RM">Admin RM</SelectItem>
                    <SelectItem value="Analist">Analist</SelectItem>
                    <SelectItem value="Building & Mining">Building & Mining</SelectItem>
                    <SelectItem value="Cabang Aceh-Medan">Cabang Aceh-Medan</SelectItem>
                    <SelectItem value="Cabang Bali">Cabang Bali</SelectItem>
                    <SelectItem value="Cabang Balikpapan">Cabang Balikpapan</SelectItem>
                    <SelectItem value="Cabang Bandar Lampung">Cabang Bandar Lampung</SelectItem>
                    <SelectItem value="Cabang Bandung">Cabang Bandung</SelectItem>
                    <SelectItem value="Cabang Bangka Belitung">Cabang Bangka Belitung</SelectItem>
                    <SelectItem value="Cabang Banjarmasin">Cabang Banjarmasin</SelectItem>
                    <SelectItem value="Cabang Banyuwangi">Cabang Banyuwangi</SelectItem>
                    <SelectItem value="Cabang Bekasi">Cabang Bekasi</SelectItem>
                    <SelectItem value="Cabang Bengkulu">Cabang Bengkulu</SelectItem>
                    <SelectItem value="Cabang Bogor">Cabang Bogor</SelectItem>
                    <SelectItem value="Cabang Cikampek">Cabang Cikampek</SelectItem>
                    <SelectItem value="Cabang Cikande">Cabang Cikande</SelectItem>
                    <SelectItem value="Cabang Cilegon">Cabang Cilegon</SelectItem>
                    <SelectItem value="Cabang Cirebon">Cabang Cirebon</SelectItem>
                    <SelectItem value="Cabang Glodok">Cabang Glodok</SelectItem>
                    <SelectItem value="Cabang Gresik">Cabang Gresik</SelectItem>
                    <SelectItem value="Cabang IAPS Sidamukti">Cabang IAPS Sidamukti</SelectItem>
                    <SelectItem value="Cabang Jakarta">Cabang Jakarta</SelectItem>
                    <SelectItem value="Cabang Jambi">Cabang Jambi</SelectItem>
                    <SelectItem value="Cabang Jawa Timur">Cabang Jawa Timur</SelectItem>
                    <SelectItem value="Cabang Kalimantan">Cabang Kalimantan</SelectItem>
                    <SelectItem value="Cabang Kal AIRA">Cabang Kal AIRA</SelectItem>
                    <SelectItem value="Cabang Karawang">Cabang Karawang</SelectItem>
                    <SelectItem value="Cabang Kendari">Cabang Kendari</SelectItem>
                    <SelectItem value="Cabang Lamongan">Cabang Lamongan</SelectItem>
                    <SelectItem value="Cabang Lombok">Cabang Lombok</SelectItem>
                    <SelectItem value="Cabang Makassar">Cabang Makassar</SelectItem>
                    <SelectItem value="Cabang Manado">Cabang Manado</SelectItem>
                    <SelectItem value="Cabang Medan">Cabang Medan</SelectItem>
                    <SelectItem value="Cabang Mojokerto">Cabang Mojokerto</SelectItem>
                    <SelectItem value="Cabang Padang">Cabang Padang</SelectItem>
                    <SelectItem value="Cabang Palangkaraya">Cabang Palangkaraya</SelectItem>
                    <SelectItem value="Cabang Palembang">Cabang Palembang</SelectItem>
                    <SelectItem value="Cabang Palu">Cabang Palu</SelectItem>
                    <SelectItem value="Cabang PangkalanBun">Cabang PangkalanBun</SelectItem>
                    <SelectItem value="Cabang Pasuruan">Cabang Pasuruan</SelectItem>
                    <SelectItem value="Cabang Pekanbaru">Cabang Pekanbaru</SelectItem>
                    <SelectItem value="Cabang Pontianak">Cabang PontianakM</SelectItem>
                    <SelectItem value="Cabang Purwakarta">Cabang Purwakarta</SelectItem>
                    <SelectItem value="Cabang Samarinda">Cabang Samarinda</SelectItem>
                    <SelectItem value="Cabang Sampit">Cabang Sampit</SelectItem>
                    <SelectItem value="Cabang Semarang">Cabang Semarang</SelectItem>
                    <SelectItem value="Cabang Solo">Cabang Solo</SelectItem>
                    <SelectItem value="Cabang Sorong">Cabang Sorong</SelectItem>
                    <SelectItem value="Cabang Sukabumi">Cabang Sukabumi</SelectItem>
                    <SelectItem value="Cabang Surabaya">Cabang Surabaya</SelectItem>
                    <SelectItem value="Cabang Tangerang">Cabang Tangerang</SelectItem>
                    <SelectItem value="Cabang TanjungSelor">Cabang TanjungSelor</SelectItem>
                    <SelectItem value="CEO Secretary">CEO Secretary</SelectItem>
                    <SelectItem value="Control Valve">Control Valve</SelectItem>
                    <SelectItem value="E-Procurement">E-Procurement</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Finance Control">Finance Control</SelectItem>
                    <SelectItem value="Flexible Hoses">Flexible Hoses</SelectItem>
                    <SelectItem value="Flow Meter">Flow Meter</SelectItem>
                    <SelectItem value="General Affair">General Affair</SelectItem>
                    <SelectItem value="Head Office (AIRA)">Head Office (AIRA)</SelectItem>
                    <SelectItem value="Head Office (AMN)">Head Office (AMN)</SelectItem>
                    <SelectItem value="Head Office (ANS)">Head Office (ANS)</SelectItem>
                    <SelectItem value="Head Office (API)">Head Office (API)</SelectItem>
                    <SelectItem value="Head Office (BONT)">Head Office (BONT)</SelectItem>
                    <SelectItem value="Head Office (GCE)">Head Office (GCE)</SelectItem>
                    <SelectItem value="Head Office (GRT)">Head Office (GRT)</SelectItem>
                    <SelectItem value="Head Office (GTA)">Head Office (GTA)</SelectItem>
                    <SelectItem value="Head Office (IAPS)">Head Office (IAPS)</SelectItem>
                    <SelectItem value="Head Office (IAPSI)">Head Office (IAPSI)</SelectItem>
                    <SelectItem value="Head Office (ISM)">Head Office (ISM)</SelectItem>
                    <SelectItem value="Head Office (MAV)">ead Office (MAV)</SelectItem>
                    <SelectItem value="HO Sangkuriang">HO Sangkuriang</SelectItem>
                    <SelectItem value="Head Office (WTP)">Head Office (WTP)</SelectItem>
                    <SelectItem value="Head Office AIP(SBP)">Head Office AIP(SBP)</SelectItem>
                    <SelectItem value="Head Office (AMP)">Head Office (AMP)</SelectItem>
                    <SelectItem value="Head Office (SPI)">Head Office (SPI)</SelectItem>
                    <SelectItem value="Human Capital">Human Capital</SelectItem>
                    <SelectItem value="IAPSI Pelabuhan Ratu">IAPSI Pelabuhan Ratu</SelectItem>
                    <SelectItem value="IAPS Kendari">IAPS Kendari</SelectItem>
                    <SelectItem value="Import">Import</SelectItem>
                    <SelectItem value="Internal Audit">Internal Audit</SelectItem>
                    <SelectItem value="Inventory Control">Inventory Control</SelectItem>
                    <SelectItem value="IT">IT</SelectItem>
                    <SelectItem value="Legal">Legal</SelectItem>
                    <SelectItem value="Marcomm">Marcomm</SelectItem>
                    <SelectItem value="Oleochemical">Oleochemical</SelectItem>
                    <SelectItem value="Operasional">Operasional</SelectItem>
                    <SelectItem value="PPIC Ekspedisi">PPIC Ekspedisi</SelectItem>
                    <SelectItem value="PPIC Logistic">PPIC Logistic</SelectItem>
                    <SelectItem value="Purchasing">Purchasing</SelectItem>
                    <SelectItem value="QHSE">QHSE</SelectItem>
                    <SelectItem value="Sanitary">Sanitary</SelectItem>
                    <SelectItem value="Sawit">Sawit</SelectItem>
                    <SelectItem value="Warehouse">Warehouse</SelectItem>
                    <SelectItem value="WHS Makassar">WHS Makassa</SelectItem>
                    <SelectItem value="Water Pump">Water Pump</SelectItem>
                    <SelectItem value="Water Work">Water Wor</SelectItem>
                    <SelectItem value="Workshop">Workshop</SelectItem>
                    <SelectItem value="Other">OtherM</SelectItem>
                    </ScrollArea> 
                    
                  </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">Register</Button>
          </form>
        </Form>
      )
}