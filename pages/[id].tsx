import { supabase } from '../utils/supabase'

type LessonDetailsProps = {
  lesson: { title: string; description: string }
}

const LessonDetails = ({
  lesson: { title, description },
}: LessonDetailsProps) => {
  console.log(title)
  return (
    <div className="mx-auto w-full max-w-3xl py-16 px-8">
      <h1 className="mb-6 text-3xl">{title}</h1>
      <p>{description}</p>
    </div>
  )
}
export const getStaticPaths = async () => {
  const { data: lessons } = await supabase.from('lesson').select('id')

  if (!lessons) return { paths: [], fallback: true }

  const paths = lessons.map(({ id }) => ({
    params: {
      id: id.toString(),
    },
  }))
  console.log(paths)
  return {
    paths,
    fallback: false,
  }
}

type getStaticPropsType = {
  params: {
    id: string
  }
}

export const getStaticProps = async ({
  params: { id },
}: getStaticPropsType) => {
  const { data: lesson } = await supabase
    .from('lesson')
    .select('*')
    .eq('id', id)
    .single()

  console.log(lesson)

  return {
    props: {
      lesson,
    },
  }
}

export default LessonDetails
