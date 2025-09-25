export default function Card({ children, minWidth, maxHeight, hover, pointer, withoutMargin }: { children: React.ReactNode, minWidth?: string, maxHeight?: string, hover?: string, pointer?: string, withoutMargin?: boolean }) {
  return (
    <div className={`bg-[#FFFFFF] p-[4px] rounded-[8px] ${withoutMargin ? '' : 'mt-[1rem]'} border border-[#E4E4E7] min-h-[152px] ${minWidth ? `${minWidth}` : 'min-w-[152px]'} ${maxHeight ? `${maxHeight}` : 'max-h-[none]'} ${hover ? hover : ''} ${pointer ? pointer : ''}`}>
      <div className="p-[1rem]">
        {children}
      </div>
    </div>
  )
}