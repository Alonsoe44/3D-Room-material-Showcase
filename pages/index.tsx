import Head from 'next/head'
import RoomDisplayer from '../src/components/roomDisplayer/RoomDisplayer'

export default function Home (): any {
  return (
    <>
      <Head>
        <title>3d Room showcase</title>
        <meta name='description' content='You can see how every material look inside a kitchen, materials for the floor and more' />
      </Head>
      <RoomDisplayer />
    </>

  )
}
