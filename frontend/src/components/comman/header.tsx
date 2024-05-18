import ThemeModeToggle from "@/components/comman/thememodetoggle"
import MetoMicHeaderLogo from "@/assets/metomic_logo.png";
import { useTheme } from "../theme-provider";
const Header = () => {
    const currentTheme = useTheme()
    return (
        <div className=".-m-64	w-full">
            <div className='flex justify-between items-center'>
                <img src={MetoMicHeaderLogo} className={`${currentTheme} `} alt="logo" width={200} height={200} />
                <div className='flex items-center'>
                    <h1 className='text-xl font-bold'>MonkeyBox</h1>
                </div>
                <div className='flex items-center'>
                    <ThemeModeToggle />
                </div>
            </div>
        </div>
    )
}




export default Header