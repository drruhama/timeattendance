'use client'
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from "@/components/ui/command"
import UserItem from "./Useritem"

export default function Sidebar() {
    return (
        <>
    <div className="w-[250px] border-r min-h-screen"><div>
            <UserItem />
        </div><br/>
    <Command>
  <CommandInput placeholder="Type a command or search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Employee Management">
      <CommandItem>Time Attendance</CommandItem>
      <CommandItem>Recruitment</CommandItem>
      <CommandItem>Payroll</CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Settings">
      <CommandItem>Export Data</CommandItem>
      <CommandItem>Import Data</CommandItem>
      <CommandItem>Settings</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>
    </div>
    </>
    )
}