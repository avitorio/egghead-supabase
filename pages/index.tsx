import Link from 'next/link'
import { supabase } from '../utils/supabase'

type HomeProps = {
  lessons: [
    {
      id: string
      title: string
    }
  ]
}

export default function Home({ lessons }: HomeProps) {
  console.log(lessons)
  return (
    <div className="mx-auto my-16 w-full max-w-3xl px-2">
      {lessons.map((lesson) => (
        <Link href={`/${lesson.id}`} key={lesson.id}>
          <a className="mb-4 flex h-40 rounded p-8 text-xl shadow">
            {lesson.title}
          </a>
        </Link>
      ))}
    </div>
  )
}

export const getStaticProps = async () => {
  const { data: lessons } = await supabase.from('lesson').select('*')

  return {
    props: {
      lessons,
    },
  }
}
