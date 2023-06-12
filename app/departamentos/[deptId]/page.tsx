import HeadingText from "@components/common/HeadingText"
import labs from "@public/data/labs.json"

type LabData = {
  lab: string;
  desc: string;
  link: string;
  icon: string;
  rel: string;
  complete: {
    title: string;
    super: string;
    content: string[];
  }[];
};

type LabsData = {
  [key: string]: LabData;
};

const myLabs: LabsData = labs;

const page = ({ params, searchParams }: { params: any, searchParams: any }) => {
  const deptoId : any = myLabs[params.deptId];
  return (
    <section>
      <div className="section-default my-32 text-gray-700 flex flex-col gap-32">
        {
          Object.values(deptoId.complete).map((item: any, index) => {
            return (
              <div key={(index)} className="flex flex-col gap-8">
                <HeadingText title={item.title} super={item.super} />
                {item.content.map((subItem: any, subIndex: any) => {
                  return(
                    <p key={subIndex}>{subItem}</p>
                  )
                })}
              </div>
            )
          })
        }

      </div>
    </section>
  )
}

export default page