import ThemeModeToggle from "@/components/comman/thememodetoggle"

const Header = () => {
    return (
        <div >
            <div className='flex justify-between items-center'>
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