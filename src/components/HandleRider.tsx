import Link from 'next/link'

type Props = {
    chosenArtist: string | undefined | HTMLInputElement
}

const HandleRider = ({chosenArtist}: Props) => {

    let riderUrl:string = ""


    if(chosenArtist==="sabo"){
        riderUrl="https://drive.google.com/open?id=18cSh4-cYkwMOBrL8HPHJOTw_0QDPjIGq&usp=drive_fs"
    }
    else if(chosenArtist==="satori"){
        riderUrl="https://drive.google.com/open?id=16Zg2MI7c0qkIpaBou1W-g3qzQX3DoXOt&usp=drive_fs"
    }
    else if(chosenArtist==="oceanvs"){
        riderUrl="https://drive.google.com/open?id=17fsHYPnQ6g52dc0slXszPbJ8Ckn6Maa6&usp=drive_fs"
    }

  return (
    <div>{chosenArtist?<Link href={riderUrl} target="_blank" className=' text-sm text-yellow-400'>Click here to view the rider... </Link>: <div /> }</div>
    
  )
}

export default HandleRider