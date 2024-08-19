

import { getAttendance } from "../actions/auth_actions";
import AttendanceTable from "../components/AttendanceTable";

export default async function ImportXls() {
  const attendances = await getAttendance()||[]
  return (
    <div className="px-4">
        <AttendanceTable attendances={attendances}/>
    </div>
  )
}

