import React from 'react'
import HeadingText from "@components/common/HeadingText"
import LeisIncentivo from "@components/leis/LeisIncentivo"

const page = () => {
    return (
        <>
            <section>
                <div className="section-default my-32 flex flex-col gap-8 text-gray-700">
                    <HeadingText title="Leis de Incentivo à Inovação" super="Clique e baixe" />
                    <LeisIncentivo />
                </div>
            </section>
        </>
    )
}

export default page