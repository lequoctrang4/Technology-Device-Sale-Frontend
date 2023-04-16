import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "react-feather"
import style from './style.module.scss';

interface carouselProps {
    children: Array<React.ReactNode>,
    autoSlide?: boolean | false,
    transferTime?: number | 3000,
}
export default function Carousel({ children, autoSlide, transferTime }: carouselProps) {
    const [curr, setCurr] = useState(0);
    const len = children.length;

    const prev = () => setCurr((curr) => curr > 0 ? curr - 1 : len - 1);
    // setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1))

    const next = () => setCurr(curr => curr === len - 1 ? 0 : curr + 1);
    // setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1))

    useEffect(() => {
        if (!autoSlide) return;
        const slideInterval = setInterval(next, transferTime)
        return () => clearInterval(slideInterval)
    }, [])
    return (
        <div className={style.carousel}>
            <button
                onClick={prev}
                className={style.button + ' left-4'}
            >
                <ChevronLeft size={40} />
            </button>
            <div
                className="flex transition-transform ease-out duration-500"
                style={{ transform: `translateX(-${curr * 100}%)` }}
            >
                {children}
            </div>
            <button
                onClick={next}
                className={style.button + ' right-4'}
            >
                <ChevronRight size={40} />
            </button>
        </div>
    )
}

/*<div
                className="flex transition-transform ease-out duration-500"
                style={{ transform: `translateX(-${curr * 100}%)` }}
            >
                {slides}
            </div>
            <div className="absolute inset-0 flex items-center justify-between p-4">
                <button
                    onClick={prev}
                    className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
                >
                    <ChevronLeft size={40} />
                </button>
                <button
                    onClick={next}
                    className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
                >
                    <ChevronRight size={40} />
                </button>
            </div>

            <div className="absolute bottom-4 right-0 left-0">
                <div className="flex items-center justify-center gap-2">
                    {slides.map((_, i) => (
                        <div
                            className={`
              transition-all w-3 h-3 bg-white rounded-full
              ${curr === i ? "p-2" : "bg-opacity-50"}
            `}
                        />
                    ))}
                </div>
            </div> */