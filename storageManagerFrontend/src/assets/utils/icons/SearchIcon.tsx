export default function SearchIcon({color, size}: {color:string, size: string}) {
    return (
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </div>
    )
}