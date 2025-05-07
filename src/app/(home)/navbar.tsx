import Link from "next/link";
import Image from "next/image";
import { SearchInput } from "./search-input";
import { UserButton, OrganizationSwitcher } from "@clerk/nextjs";


export const Navbar = () => {


    return (
        <nav className="flex items-center justify-between ">
            <div className="flex gap-3 items-center shrink-0 pr-6 ">
                <Link href="/" >
                <Image 
                    src="/CO.png" 
                    alt="Logo" 
                    width={90} 
                    height={90} 
                    className="rounded-full bg-white/10 p-2 backdrop-blur-sm border border-white/20 shadow-md hover:shadow-cyan-500/30 transition-shadow duration-300"
                />



                </Link>
                {/* <h3 className="text-xl">Document</h3> */}
            </div>
            <SearchInput/>
            <div className="flex gap-3 items-center pl-6 text-white">
                <OrganizationSwitcher
                appearance={{
                    elements: {
                      organizationSwitcherTrigger: 'text-white font-semibold',
                    },
                  }}
                afterCreateOrganizationUrl="/"
                afterLeaveOrganizationUrl="/"
                afterSelectOrganizationUrl="/"
                afterSelectPersonalUrl="/"
                />
                <UserButton/>
            </div>
            
        </nav>
    )
}