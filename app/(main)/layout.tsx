import { MobileHeader } from "@/components/mobileheader"
import { Sidebar } from "@/components/sidebar"

type Props = {
    children: React.ReactNode
}

const MainLayout = ({ children, }: Props) => {
    return(
        <>
        <MobileHeader />
        <Sidebar className="hidden lg:flex"/>
        <main className="lg:pl-[265px] h-full pt-[50px] lg:pt-0">
            <div className="max-w-[1065px] mx-auto pt-6 h-full">
                {children}
            </div>
        </main>
        </>
    )
}

export default MainLayout