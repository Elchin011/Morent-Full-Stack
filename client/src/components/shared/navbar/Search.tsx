import SearchIcon from "@/assets/icons/search.svg"
import FilterIcon from "@/assets/icons/filter.svg"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { paths } from "@/constants/paths";
import { useState, useRef } from "react";
import { useEffect } from "react";


let timeoutId: NodeJS.Timeout;

export const Search = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const isListingPage = location.pathname.includes("list")
    const filterRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
                setIsFilterOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    function handleSearch(searchText: string) {
        clearTimeout(timeoutId);
        if (!searchText) {
            searchParams.delete("search")
            setSearchParams(searchParams)
            return
        }
        timeoutId = setTimeout(() => {
            searchParams.set("search", searchText)
            setSearchParams(searchParams)
            if (!isListingPage) navigate(paths.LIST + `?${searchParams.toString()}`)
        }, 300)
    }

    function handleFilter(key: string, value: string) {
        if (value) {
            searchParams.set(key, value)
        } else {
            searchParams.delete(key)
        }
        setSearchParams(searchParams)
        if (!isListingPage) navigate(paths.LIST + `?${searchParams.toString()}`)
    }

    return (
        <div className="relative hidden md:block lg:w-[320px] xl:w-[492px]">
            <img src={SearchIcon} alt="search" className="absolute left-5 top-2.5" />
            <input
                onChange={(e) => handleSearch(e.target.value.trim())}
                placeholder="Search something here"
                className="w-full border border-[#c3d4e966] rounded-[70px] py-[11px] pl-12 lg:pl-16 pr-11 placeholder:text-secondary text-sm font-medium leading-[21px] tracking-tighter-[-0.28px]"
            />
            <button onClick={() => setIsFilterOpen(!isFilterOpen)}>
                <img src={FilterIcon} alt="filter" className="absolute right-5 top-2.5" />
            </button>
            {isFilterOpen && (
                <div
                    ref={filterRef}
                    className="absolute top-12 right-0 bg-white border border-[#c3d4e966] rounded-[10px] p-5 w-[280px] z-50 shadow-lg"
                >
                    <h3 className="font-semibold text-secondary mb-4">Filter</h3>
                    <h3 className="font-semibold text-secondary mb-4">Filter</h3>

                    {/* Qiymət aralığı */}
                    <div className="mb-4">
                        <label className="text-sm font-medium text-secondary-500 mb-2 block">Max Price</label>
                        <input
                            type="range"
                            min={0}
                            max={1000}
                            defaultValue={searchParams.get("maxPrice") || "1000"}
                            onChange={(e) => handleFilter("maxPrice", e.target.value)}
                            className="w-full"
                        />
                        <p className="text-xs text-secondary-300 mt-1">${searchParams.get("maxPrice") || "1000"}</p>
                    </div>

                    {/* Seat sayı */}
                    <div className="mb-4">
                        <label className="text-sm font-medium text-secondary-500 mb-2 block">Capacity</label>
                        <select
                            onChange={(e) => handleFilter("capacity", e.target.value)}
                            value={searchParams.get("capacity") || ""}
                            className="w-full border border-[#c3d4e966] rounded-md p-2 text-sm"
                        >
                            <option value="">All</option>
                            <option value="2">2 People</option>
                            <option value="4">4 People</option>
                            <option value="6">6 People</option>
                            <option value="8">8 People</option>
                        </select>
                    </div>

                    {/* Transmission */}
                    <div className="mb-4">
                        <label className="text-sm font-medium text-secondary-500 mb-2 block">Transmission</label>
                        <select
                            onChange={(e) => handleFilter("gearBox", e.target.value)}
                            value={searchParams.get("gearBox") || ""}
                            className="w-full border border-[#c3d4e966] rounded-md p-2 text-sm"
                        >
                            <option value="">All</option>
                            <option value="Manual">Manual</option>
                            <option value="Automatic">Automatic</option>
                        </select>
                    </div>

                    {/* Fuel tipi */}
                    <div className="mb-4">
                        <label className="text-sm font-medium text-secondary-500 mb-2 block">Fuel Type</label>
                        <select
                            onChange={(e) => handleFilter("fuelType", e.target.value)}
                            value={searchParams.get("fuelType") || ""}
                            className="w-full border border-[#c3d4e966] rounded-md p-2 text-sm"
                        >
                            <option value="">All</option>
                            <option value="petrol">Petrol</option>
                            <option value="diesel">Diesel</option>
                            <option value="electric">Electric</option>
                            <option value="hybrid">Hybrid</option>
                        </select>
                    </div>

                    <button
                        onClick={() => {
                            ["maxPrice", "capacity", "gearBox", "fuelType"].forEach(k => searchParams.delete(k))
                            setSearchParams(searchParams)
                        }}
                        className="w-full text-sm text-primary underline mt-2"
                    >
                        Clear Filters
                    </button>
                </div>
            )}
        </div>
    )
}