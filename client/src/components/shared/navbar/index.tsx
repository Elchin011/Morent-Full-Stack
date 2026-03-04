import { Link } from "react-router-dom"
import { Actions } from "./Actions"
import { Search } from "./Search"
import { paths } from "@/constants/paths"

export const Navbar = () => {
    return (
        <div className="bg-white sticky top-0 z-20 shadow-sm">
            {/* Desktop */}
            <div className="hidden md:block py-6 md:py-8">
                <div className="container flex items-center justify-between">
                    <div className="flex items-center gap-x-4 md:gap-x-8 lg:gap-x-16">
                        <Link to={paths.HOME} className="text-[20px] md:text-[32px] font-bold text-primary leading-[36px] md:leading-[48px]">MORENT</Link>
                        <Search />
                    </div>
                    <Actions />
                </div>
            </div>

            {/* Mobile */}
            <div className="md:hidden">
                {/* Üst sıra: MORENT + Actions */}
                <div className="flex items-center justify-between px-4 py-3">
                    <Link to={paths.HOME} className="text-[20px] font-bold text-primary">MORENT</Link>
                    <Actions />
                </div>
                {/* Alt sıra: Search */}
                <div className="px-4 pb-3">
                    <Search />
                </div>
            </div>
        </div>
    )
}

export default Navbar