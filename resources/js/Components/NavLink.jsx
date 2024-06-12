import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none text-pink-800 ' +
                (active
                    ? 'border-pink-600 text-pink-900 focus:border-pink-600 '
                    : 'border-transparent text-pink-800 hover:text-pink-950 hover:border-pink-300 focus:text-pink-600 focus:border-pink-600 ') +
                className
            }
        >
            {children}
        </Link>
    );
}

// className='text-pink-800 hover:text-pink-950 active:text-pink-950'