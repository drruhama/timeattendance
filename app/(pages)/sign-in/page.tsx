import { SignInForm } from "@/app/components/SignInForm"
import { validateRequest } from "@/app/lib/auth"
import { redirect } from "next/navigation"
export default async function SignInPage() {
    const { user } = await validateRequest()
    if (user) {
        return redirect("/")
    }
    return (
        <div className="pt:mt-0 mx-auto flex flex-col items-center justify-center px-6 pt-8 dark:bg-blue-500">
            <a href="#" className="mb-8 flex items-center justify-center text-3xl font-semibold dark:text-green-300">
                <img src="/logarita.png" className="mr-4 h-11" />
            </a>
              <div className="w-full max-w-xl space-y-8 rounded-lg bg-blue-300 p-6 shadow dark:bg-red-400">
               <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
                  Sign In
               </h2>
                <SignInForm /> 
        </div>
        <p className="text-sm">belum memiliki username? Silahkan klik <a href="./sign-up" className="text-blue-700 underline">daftar</a></p>
      </div>
    )
}