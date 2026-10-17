'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TopBar = () => {
    const pathName = usePathname();

    if (pathName.startsWith('/admin')) {
        return null;
    }
    return (
        <div className='bg-[#6A795D] p-1 text-white font-bold'>
            <p className='flex justify-center items-center gap-10'>
                <span>Registration is open Now.</span>
                <Link href={'/register'} className='border-b border-white '>Register Now</Link>
            </p>
        </div>
    );
};

export default TopBar;