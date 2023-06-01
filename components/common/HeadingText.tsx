const HeadingText = (props: any) => {
  return (
    <div className="flex flex-col gap-4">
        <span className={`flex items-center gap-4 text-xs text-gray-500 ${props.reverse ? 'flex-row-reverse' : 'flex-row'}
          after:block after:w-32 after:h-[1px] after:bg-cyan-400`}>
            {props.super}
          </span>
          <h2 className='
            text-right font-black text-gray-800 text-2xl
            sm:text-5xl'>{props.title}</h2>
    </div>
  )
}

export default HeadingText