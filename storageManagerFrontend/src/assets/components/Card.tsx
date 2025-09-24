export default function Card({ children, minWidth, maxHeight }: { children: React.ReactNode, minWidth?: string, maxHeight?: string }) {
  return (
    <div className={`bg-[#FFFFFF] p-[4px] rounded-[8px] mt-[1rem] border border-[#E4E4E7] min-h-[152px] ${minWidth ? `${minWidth}` : 'min-w-[152px]'} ${maxHeight ? `${maxHeight}` : 'max-h-[none]'}`}>
      <div className="p-[1rem]">
        {children}
      </div>
    </div>
  )
}