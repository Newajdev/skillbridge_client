

export const TopDesign = () => {
    return (
        <div className="relative h-64 w-full bg-linear-to-r from-[#173e72] via-[#1a4b8a] to-[#2563eb] overflow-hidden rounded-b-[3rem]">
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />
            </div>
        </div>
    )
}