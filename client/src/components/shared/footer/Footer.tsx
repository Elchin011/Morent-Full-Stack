import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <footer className="bg-white mt-auto py-12 md:py-20 px-3 md:px-0">
            <div className="container mx-auto px-4">
                {/* Top grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-8 border-b border-[#c3d4e966]">
                    {/* Logo + Description */}
                    <div className="flex flex-col gap-4">
                        <h2 className="text-2xl md:text-3xl font-bold text-primary">MORENT</h2>
                        <p className="text-secondary-300 text-sm md:text-base">
                            Our vision is to provide convenience <br /> and help increase your sales business.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 md:gap-8">
                        {/* About */}
                        <div>
                            <h4 className="font-semibold text-lg md:text-xl mb-4">About</h4>
                            <ul className="flex flex-col gap-2 md:gap-3 text-secondary-300 text-sm md:text-base">
                                <li><Link to="/">How it works</Link></li>
                                <li><Link to="/">Featured</Link></li>
                                <li><Link to="/">Partnership</Link></li>
                                <li><Link to="/">Business Relation</Link></li>
                            </ul>
                        </div>
                        {/* Community */}
                        <div>
                            <h4 className="font-semibold text-lg md:text-xl mb-4">Community</h4>
                            <ul className="flex flex-col gap-2 md:gap-3 text-secondary-300 text-sm md:text-base">
                                <li><Link to="/">Events</Link></li>
                                <li><Link to="/">Blog</Link></li>
                                <li><Link to="/">Podcast</Link></li>
                                <li><Link to="/">Invite a friend</Link></li>
                            </ul>
                        </div>
                        {/* Socials */}
                        <div>
                            <h4 className="font-semibold text-lg md:text-xl mb-4">Socials</h4>
                            <ul className="flex flex-col gap-2 md:gap-3 text-secondary-300 text-sm md:text-base">
                                <li><Link to="/">Discord</Link></li>
                                <li><Link to="/">Instagram</Link></li>
                                <li><Link to="/">Twitter</Link></li>
                                <li><Link to="/">Facebook</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="flex flex-col md:flex-row justify-between items-center pt-6 gap-y-3 text-sm text-secondary font-semibold">
                    <p>©2022 MORENT. All rights reserved</p>
                    <div className="flex flex-wrap gap-4 md:gap-6">
                        <Link to="/">Privacy & Policy</Link>
                        <Link to="/">Terms & Condition</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer