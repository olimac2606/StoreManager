export default function Card({children}: {children: React.ReactNode}) {
  return (
    <div className="bg-[#FFFFFF] p-[4px] rounded-[8px] mt-[1rem] border border-[#E4E4E7]">
      {children}
    </div>
  )
}