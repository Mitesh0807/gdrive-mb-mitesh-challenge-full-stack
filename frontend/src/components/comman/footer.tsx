
const currentYear = new Date().getFullYear();
const Footer = () => {
    return (
        <div className='text-center font-extralight'>
            <p className='text-sm'>Copyright © <span className='font-bold'>{currentYear}</span> MonkeyBox. All rights reserved.</p>
            <p className='text-sm'>All trademarks and registered trademarks are the property of their respective owners.</p>
            <a href="https://github.com/mitesh0807" target="_blank"  >Powered by<span className='font-bold'> Mitesh Savaliya</span> miteshsavaliya7@gmail.com</a>
        </div>
    )
}

export default Footer