import { Outlet, useLocation } from "react-router-dom"
import { Navbar } from "./navbar"
import { Dialogs } from "./dialogs"
import { useAppDispatch } from "@/hooks/redux"
import { useEffect } from "react"
import { getCurrentUserAsync } from "@/store/features/userSlice"
import { HelpPopover } from "./help-popover"
import Footer from "./footer/Footer"

const RootLayout = () => {
    const dispatch = useAppDispatch()
    const location = useLocation()
    const isDashboardPage = location.pathname.includes("dashboard")

    useEffect(() => {
        dispatch(getCurrentUserAsync())
    }, [])

    return (
        <div className="flex flex-col min-h-screen">
            {/* Navbar üst tərəfdə */}
            <Navbar />

            {/* Scrollable content */}
            <div className="flex-1 flex overflow-hidden">
                <main className="flex-1 overflow-y-auto">
                    <Outlet />
                </main>
            </div>

            <Dialogs />
            {!isDashboardPage && <HelpPopover />}
            
            {/* Sticky Footer */}
            {!isDashboardPage && <Footer />}
        </div>
    )
}

export default RootLayout